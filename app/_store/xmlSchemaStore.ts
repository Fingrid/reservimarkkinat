import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { enableMapSet } from "immer";
import { extractUrnFromXsd } from "@/_utils/xml/utils";

enableMapSet(); // Enable the MapSet plugin for Immer

// --- State Interface ---
// Define the structure for schema configuration
export type SchemaConfig = {
  location: string;
  filenames: string[];
};

// Define the structure for a cached schema item
export type XMLBufferItem = {
  urn: string | null;
  fileUrl: string;
  buffer: Buffer;
};

// Interface expected by StoreBackedInputProvider
export interface SchemaStoreProvider {
  getSchemaByUrn: (urn: string | null) => XMLBufferItem | undefined;
  getSchemaByFilename: (filename: string) => XMLBufferItem | undefined;
  hasSchema: (props: { key: string; type: "urn" | "filename" }) => boolean;
}

export type XmlSchemaState = SchemaStoreProvider & {
  schemas: Map<string, XMLBufferItem>;
  isInitialized: boolean;
  isLoading: boolean;
  error: string | null;
  initializeSchemas: (configs: SchemaConfig[]) => Promise<void>;
};

// --- Initial State ---
const initialState: Omit<
  XmlSchemaState,
  "initializeSchemas" | "getSchemaByUrn" | "getSchemaByFilename" | "hasSchema"
> = {
  schemas: new Map(),
  isInitialized: false,
  isLoading: false,
  error: null,
};

// --- Store Creator ---
export const useXmlSchemaStore = create<XmlSchemaState>()(
  immer((set, get) => ({
    ...initialState,

    // --- Actions ---
    initializeSchemas: async (configs) => {
      if (get().isInitialized || get().isLoading) {
        return;
      }
      set((state) => {
        state.isLoading = true;
        state.error = null;
        state.schemas.clear(); // Clear existing schemas before loading new ones
      });

      try {
        // Create an array of promises, each resolving to [filename, XMLBufferItem] or null on error
        const schemaFetchPromises = configs.flatMap((config) =>
          config.filenames.map(
            async (filename): Promise<[string, XMLBufferItem] | null> => {
              const cleanLocation = config.location.endsWith("/")
                ? config.location
                : `${config.location}/`;
              const cleanFilename = filename.startsWith("/")
                ? filename.substring(1)
                : filename;
              const fileUrl = `${cleanLocation}${cleanFilename}`;

              try {
                const res = await fetch(fileUrl);
                if (!res.ok) {
                  throw new Error(
                    `Failed to fetch ${fileUrl}: ${res.statusText}`,
                  );
                }
                const buffer = Buffer.from(await res.arrayBuffer());
                const content = buffer.toString("utf-8");
                const urn = extractUrnFromXsd(content);
                return [filename, { urn, fileUrl, buffer }];
              } catch (err) {
                console.error(`Error processing schema ${fileUrl}:`, err);
                return null; // Resolve with null on error for this specific schema
              }
            },
          ),
        );
        const results = await Promise.all(schemaFetchPromises);

        // Filter out null results (errors) and create the map
        const loadedSchemas = new Map<string, XMLBufferItem>(
          results.filter(
            (result): result is [string, XMLBufferItem] => result !== null,
          ),
        );

        set((state) => {
          state.schemas = loadedSchemas;
          state.isInitialized = true;
          state.isLoading = false;
        });
      } catch (error) {
        console.error("Failed to initialize XML schemas:", error);
        set((state) => {
          state.error = error instanceof Error ? error.message : String(error);
          state.isLoading = false;
          state.isInitialized = false; // Ensure state reflects initialization failure
        });
      }
    },

    getSchemaByUrn: (urn) => {
      if (!urn) return undefined;
      return Array.from(get().schemas.values()).find(
        (item) => item.urn === urn,
      );
    },

    getSchemaByFilename: (filename) => get().schemas.get(filename),

    hasSchema: (props) => {
      switch (props.type) {
        case "urn": {
          return Array.from(get().schemas.values()).some(
            (item) => item.urn === props.key,
          );
        }
        case "filename": {
          return get().schemas.has(props.key);
        }
        default:
          console.warn(`hasSchema called with unknown type: ${props.type}`);
          return false;
      }
    },
  })),
);
