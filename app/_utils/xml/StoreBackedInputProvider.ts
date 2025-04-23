"use client";

import {
  XmlInputProvider,
  readBuffer,
  openBuffer,
  closeBuffer,
} from "libxml2-wasm";
import { SchemaStoreProvider } from "@/_store/xmlSchemaStore"; // Import type from store

export class StoreBackedInputProvider implements XmlInputProvider {
  private _storeProvider: SchemaStoreProvider;

  constructor(storeProvider: SchemaStoreProvider) {
    this._storeProvider = storeProvider;
  }

  match(filename: string): boolean {
    return this._storeProvider.hasSchema({ key: filename, type: "filename" });
  }

  open(filename: string): number {
    const schemaItem = this._storeProvider.getSchemaByFilename(filename);
    if (!schemaItem) {
      throw new Error(`Schema not found via store provider: ${filename}`);
    }
    if (!schemaItem.buffer) {
      throw new Error(`Schema buffer is missing for: ${filename}`);
    }

    return openBuffer(schemaItem.buffer);
  }

  read(fd: number, buffer: Uint8Array): number {
    return readBuffer(fd, buffer);
  }

  close(fd: number): boolean {
    closeBuffer(fd);
    return true;
  }
}
