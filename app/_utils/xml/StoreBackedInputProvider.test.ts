import { describe, it, expect, vi, beforeEach, Mock } from "vitest";
import { StoreBackedInputProvider } from "./StoreBackedInputProvider";
import { SchemaStoreProvider, XMLBufferItem } from "@/_store/xmlSchemaStore"; // Import types
import { openBuffer, readBuffer, closeBuffer } from "libxml2-wasm"; // Import functions to mock

// Mock the libxml2-wasm functions used by the provider
vi.mock("libxml2-wasm", async (importOriginal) => {
  const actual: object = await importOriginal();
  return {
    ...actual, // Preserve other exports if any
    openBuffer: vi.fn(),
    readBuffer: vi.fn(),
    closeBuffer: vi.fn(),
  };
});

// Create a mock SchemaStoreProvider
const createMockStoreProvider = (
  schemas: Map<string, XMLBufferItem>,
): SchemaStoreProvider => ({
  getSchemaByUrn: vi.fn((urn) =>
    Array.from(schemas.values()).find((item) => item.urn === urn),
  ),
  getSchemaByFilename: vi.fn((filename) => schemas.get(filename)),
  hasSchema: vi.fn(({ key, type }) => {
    if (type === "filename") {
      return schemas.has(key);
    } else if (type === "urn") {
      return Array.from(schemas.values()).some((item) => item.urn === key);
    }
    return false;
  }),
});

describe("StoreBackedInputProvider", () => {
  let mockStoreProvider: SchemaStoreProvider;
  let inputProvider: StoreBackedInputProvider;
  let mockSchemas: Map<string, XMLBufferItem>;

  beforeEach(() => {
    // Reset mocks before each test
    vi.clearAllMocks();

    // Setup mock schemas
    mockSchemas = new Map<string, XMLBufferItem>([
      [
        "exists.xsd",
        {
          urn: "urn:exists",
          fileUrl: "/path/exists.xsd",
          buffer: Buffer.from("exists content"),
        },
      ],
      [
        "no_buffer.xsd",
        {
          urn: "urn:no_buffer",
          fileUrl: "/path/no_buffer.xsd",
          buffer: undefined as unknown as Buffer<ArrayBufferLike>,
        },
      ], // Simulate missing buffer
    ]);

    // Create mock store and the provider instance
    mockStoreProvider = createMockStoreProvider(mockSchemas);
    inputProvider = new StoreBackedInputProvider(mockStoreProvider);

    // Setup mock return values for libxml2-wasm functions
    (openBuffer as Mock).mockReturnValue(123); // Mock file descriptor
    (readBuffer as Mock).mockReturnValue(10); // Mock bytes read
    (closeBuffer as Mock).mockImplementation(() => {}); // Mock close operation
  });

  describe("match", () => {
    it("should return true if the store has the schema by filename", () => {
      const result = inputProvider.match("exists.xsd");
      expect(result).toBe(true);
      expect(mockStoreProvider.hasSchema).toHaveBeenCalledWith({
        key: "exists.xsd",
        type: "filename",
      });
    });

    it("should return false if the store does not have the schema by filename", () => {
      const result = inputProvider.match("does_not_exist.xsd");
      expect(result).toBe(false);
      expect(mockStoreProvider.hasSchema).toHaveBeenCalledWith({
        key: "does_not_exist.xsd",
        type: "filename",
      });
    });
  });

  describe("open", () => {
    it("should get the schema by filename and call openBuffer with the buffer", () => {
      const fd = inputProvider.open("exists.xsd");
      expect(mockStoreProvider.getSchemaByFilename).toHaveBeenCalledWith(
        "exists.xsd",
      );
      expect(openBuffer).toHaveBeenCalledWith(
        mockSchemas.get("exists.xsd")?.buffer,
      );
      expect(fd).toBe(123); // Check if the mocked fd is returned
    });

    it("should throw an error if the schema is not found by filename", () => {
      expect(() => inputProvider.open("does_not_exist.xsd")).toThrow(
        "Schema not found via store provider: does_not_exist.xsd",
      );
      expect(mockStoreProvider.getSchemaByFilename).toHaveBeenCalledWith(
        "does_not_exist.xsd",
      );
      expect(openBuffer).not.toHaveBeenCalled();
    });

    it("should throw an error if the schema buffer is missing", () => {
      expect(() => inputProvider.open("no_buffer.xsd")).toThrow(
        "Schema buffer is missing for: no_buffer.xsd",
      );
      expect(mockStoreProvider.getSchemaByFilename).toHaveBeenCalledWith(
        "no_buffer.xsd",
      );
      expect(openBuffer).not.toHaveBeenCalled();
    });
  });

  describe("read", () => {
    it("should call readBuffer with the file descriptor and buffer", () => {
      const fd = 123;
      const buffer = new Uint8Array(1024);
      const bytesRead = inputProvider.read(fd, buffer);

      expect(readBuffer).toHaveBeenCalledWith(fd, buffer);
      expect(bytesRead).toBe(10); // Check if the mocked bytes read is returned
    });
  });

  describe("close", () => {
    it("should call closeBuffer with the file descriptor and return true", () => {
      const fd = 123;
      const result = inputProvider.close(fd);

      expect(closeBuffer).toHaveBeenCalledWith(fd);
      expect(result).toBe(true);
    });
  });
});
