"use client";

export type XMLBufferItem = { urn?: string; buffer: Uint8Array; fileUrl: string };

export const extractUrn = (xml: string): string | undefined => {
  const match = xml.match(
    /<xs:schema[^>]+targetNamespace="([^"]+)"/,
  );
  return match ? match[1] : undefined;
};

export const fetchSchema = async (
  schema: string,
  baseUrl: string,
): Promise<XMLBufferItem> => {
  const origin =
    typeof window !== "undefined" && window.location.origin
      ? window.location.origin
      : "http://localhost:3000"; // Default for server-side or build time
  const url = new URL(schema, origin + baseUrl).toString();
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(
        `Failed to fetch schema ${schema} from ${url}: ${response.statusText}`,
      );
    }
    const responseText = await response.text();
    const buffer = new Uint8Array(new TextEncoder().encode(responseText));
    const urn = extractUrn(responseText);

    return {
      urn: urn,
      buffer: buffer,
      fileUrl: url,
    };
  } catch (error) {
    console.error(`Error fetching schema ${schema} from ${url}:`, error);
    throw error; // Re-throw to allow the caller (initialize) to handle it
  }
};
