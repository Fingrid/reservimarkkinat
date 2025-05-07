import { XmlDocument, XmlValidateError, XsdValidator } from "libxml2-wasm";
import { useXmlSchemaStore } from "../../_store/xmlSchemaStore";
import { extractXMLNamespace } from "./utils";
import { ValidationResult } from "@/types";

export async function validateXml(
  xmlContent: string,
): Promise<ValidationResult> {
  const state = useXmlSchemaStore.getState();

  // Namespace extraction is now imported
  const xmlNamespace = extractXMLNamespace(xmlContent);

  if (!state.isInitialized) {
    console.error(
      "XML Schema Store not initialized before validation attempt.",
    );
    return {
      isValid: false,
      details: [
        {
          line: 0,
          message: "XML validation environment not ready. Please try again.",
        },
      ],
    };
  }

  let doc: XmlDocument | null = null;
  let schemaDoc: XmlDocument | null = null;
  let xsdValidator: XsdValidator | null = null;

  try {
    doc = XmlDocument.fromString(xmlContent, {
      url: "",
      encoding: "utf-8",
    });

    const xmlItem = state.getSchemaByUrn(xmlNamespace);

    // Check urn and fileUrl explicitly as they are needed for the result
    if (!xmlItem?.buffer || !xmlItem.urn || !xmlItem.fileUrl) {
      return {
        isValid: false,
        details: [
          {
            line: 0,
            message: `No schema found or schema buffer missing for namespace ${xmlNamespace || "null"}`,
          },
        ],
        // Explicitly return undefined schema if item is incomplete
        schema: undefined,
      };
    }

    schemaDoc = XmlDocument.fromBuffer(xmlItem.buffer);
    xsdValidator = XsdValidator.fromDoc(schemaDoc);

    xsdValidator.validate(doc);

    // Now urn is guaranteed to be string here because of the check above
    return {
      isValid: true,
      schema: { url: xmlItem.fileUrl, urn: xmlItem.urn },
    };
  } catch (err) {
    // Find the schema item again to return its details, even on error
    // const xmlNamespace = extractXMLNamespace(xmlContent); // Already extracted above
    const xmlItem = state.getSchemaByUrn(xmlNamespace);
    const returnSchema =
      xmlItem?.fileUrl && xmlItem.urn
        ? { url: xmlItem.fileUrl, urn: xmlItem.urn }
        : undefined;

    if (err instanceof XmlValidateError) {
      return {
        isValid: false,
        details: err.details.map((d) => ({
          line: d.line ?? 0,
          message: d.message,
        })),
        schema: returnSchema, // Use potentially found schema info
      };
    } else {
      console.error("XML Validation Unexpected Error:", err);
      return {
        isValid: false,
        schema: returnSchema, // Use potentially found schema info
        details: [
          {
            line: 0,
            message: `Unexpected validation error: ${err instanceof Error ? err.message : String(err)}`,
          },
        ],
      };
    }
  } finally {
    xsdValidator?.dispose();
    schemaDoc?.dispose();
    doc?.dispose();
  }
}
