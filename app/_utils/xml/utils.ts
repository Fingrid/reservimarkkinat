import {
  XmlDocument,
  XmlElement,
} from "libxml2-wasm";

export const extractXMLNamespace = (xmlContent: string): string | null => {
  let doc: XmlDocument | null = null;
  try {
    doc = XmlDocument.fromString(xmlContent);
    const root: XmlElement | null = doc.root;
    if (root) {
      // Access the default namespace declaration
      const ns = root.nsDeclarations[""];
      return ns ?? null;
    }
    return null;
  } catch {
    // console.warn("Could not parse XML to extract namespace:", e);
    return null;
  } finally {
    doc?.dispose();
  }
};

export const extractUrnFromXsd = (xsdContent: string): string | null => {
  let doc: XmlDocument | null = null; // doc needs to be mutable for the finally block
  try {
    // Use XmlDocument.fromString
    doc = XmlDocument.fromString(xsdContent);
    const root: XmlElement | null = doc.root;
    if (root && (root.name === "schema" || root.name?.endsWith(":schema"))) {
      // Assuming targetNamespace is an attribute
      const targetNs = root.attr("targetNamespace")?.value;
      return targetNs ?? null;
    }
  } catch {
    // console.error("Failed to parse XSD for URN extraction:", e);
  } finally {
    doc?.dispose();
  }
  // Fallback regex (less reliable)
  const match = xsdContent.match(/targetNamespace="([^"]+)"/);
  return match ? match[1] : null;
};