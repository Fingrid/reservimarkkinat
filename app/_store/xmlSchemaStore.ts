import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { enableMapSet } from "immer";
import { type SchemaList } from "@/types";

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
  isAuthError: boolean;
  initializeSchemas: () => Promise<void>;
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
  isAuthError: false,
};

// --- Store Creator ---
export const useXmlSchemaStore = create<XmlSchemaState>()(
  immer((set, get) => ({
    ...initialState,

    // --- Actions ---
    initializeSchemas: async () => {
      if (get().isInitialized || get().isLoading) {
        return;
      }

      set((state) => {
        state.isLoading = true;
        state.error = null;
        state.isAuthError = false;
        state.schemas.clear(); // Clear existing schemas before loading new ones
      });

      try {
        // Fetch manifest from API
        const manifestResponse = await fetch("/api/schemas");

        if (manifestResponse.status === 401) {
          set((state) => {
            state.error = "Authentication required to access schema files";
            state.isAuthError = true;
            state.isLoading = false;
            state.isInitialized = false;
          });
          return;
        }

        if (!manifestResponse.ok) {
          throw new Error(
            `Failed to fetch schema manifest: ${manifestResponse.statusText}`,
          );
        }

        const schemaList: SchemaList = await manifestResponse.json();
        console.log("Fetched schema list:", schemaList);

        // Create an array of promises, each resolving to [filename, XMLBufferItem] or null on error
        const schemaFetchPromises = schemaList.schemas.map(
          async ({ filename, urn }): Promise<[string, XMLBufferItem] | null> => {
            const apiUrl = `/api/schemas/${filename}`;

            try {
              const res = await fetch(apiUrl);

              if (res.status === 401) {
                throw new Error(
                  "Authentication required to access schema files",
                );
              }

              if (!res.ok) {
                throw new Error(
                  `Failed to fetch schema ${filename}: ${res.statusText}`,
                );
              }

              const content = await res.text();
              const buffer = Buffer.from(content);

              return [filename, { urn, fileUrl: apiUrl, buffer }];
            } catch (err) {
              console.error(`Error processing schema ${filename}:`, err);

              // If this is an auth error, we should propagate it
              if (
                err instanceof Error &&
                err.message.includes("Authentication required")
              ) {
                throw err;
              }
            }

            return null;
          },
        );

        try {
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
          // Check if this is an auth error
          if (
            error instanceof Error &&
            error.message.includes("Authentication required")
          ) {
            set((state) => {
              state.error = "Authentication required to access schema files";
              state.isAuthError = true;
              state.isLoading = false;
              state.isInitialized = false;
            });
            return;
          }
          throw error;
        }
      } catch (error) {
        console.error("Failed to initialize XML schemas:", error);
        set((state) => {
          state.error = error instanceof Error ? error.message : String(error);
          state.isLoading = false;
          state.isInitialized = false; // Ensure state reflects initialization failure

          // Check if this is an auth error
          if (
            error instanceof Error &&
            error.message.includes("Authentication required")
          ) {
            state.isAuthError = true;
          }
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
