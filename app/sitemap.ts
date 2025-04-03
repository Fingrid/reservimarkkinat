import { MetadataRoute } from 'next';
import fs from 'fs';
import path from 'path';
import { MetaRecord } from 'nextra';
import ts from 'typescript';

export const dynamic = 'force-static';

const isPageType = ((value: unknown) => {
  if (typeof value === 'object' && value !== null) {
    return 'type' in value && value.type === 'page';
  }
  return false;
});

// Parse TypeScript files & extract metadata using AST
function parseMetaFile(filePath: string): Record<string, MetaRecord> {
  const fileContent = fs.readFileSync(filePath, 'utf8');
  
  const sourceFile = ts.createSourceFile(
    filePath,
    fileContent,
    ts.ScriptTarget.Latest,
    true
  );
  
  let result: Record<string, any> = {};

  function extractObjectLiteralProperties(node: ts.ObjectLiteralExpression): Record<string, any> {
    return Array.from(node.properties)
      .filter(ts.isPropertyAssignment)
      .reduce((obj: Record<string, any>, property) => {
        const propertyName = property.name.getText(sourceFile);
        // Remove quotes from property name if present
        const key = propertyName.replace(/['"]/g, '');
        
        // Handle different value types
        if (ts.isObjectLiteralExpression(property.initializer)) {
          obj[key] = extractObjectLiteralProperties(property.initializer);
        } else if (ts.isStringLiteral(property.initializer)) {
          obj[key] = property.initializer.text;
        } else if (ts.isNumericLiteral(property.initializer)) {
          obj[key] = Number(property.initializer.text);
        } else if (
          property.initializer.kind === ts.SyntaxKind.TrueKeyword || 
          property.initializer.kind === ts.SyntaxKind.FalseKeyword
        ) {
          obj[key] = property.initializer.kind === ts.SyntaxKind.TrueKeyword;
        } else {
          // For other types, use the text representation
          obj[key] = property.initializer.getText(sourceFile);
        }
        
        return obj;
      }, {});
  }
  
  // Traverse the AST to find the default export
  function visit(node: ts.Node) {
    // Look for export default statements
    if (
      ts.isExportAssignment(node) && 
      !node.isExportEquals && 
      ts.isObjectLiteralExpression(node.expression)
    ) {
      result = extractObjectLiteralProperties(node.expression);
      return;
    }
    
    ts.forEachChild(node, visit);
  }
  
  visit(sourceFile);
  return result;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://developers.fingrid.fi';

  // Helper function to recursively get all _meta.ts files
  function getMetaFiles(dir: string): string[] {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    return entries.flatMap(entry => {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        return getMetaFiles(fullPath);
      } else if (entry.isFile() && entry.name === '_meta.ts') {
        return fullPath;
      }
      return [];
    });
  }

  // Process meta files and generate URLs
  function processMetaFile(filePath: string): { url: string; lastModified: string }[] {
    try {
      const meta = parseMetaFile(filePath);
      const dir = path.dirname(filePath);

      return Object.entries(meta)
        .filter(([key, value]) => {
          if (typeof value === 'string') {
            return true;
          } else if (isPageType(value)) {
            if(value.display === 'hidden') {
              console.log(`sitemap.ts: Skipping hidden page: ${key}`);
              return false;
            }

            return true;
          }

          console.log(`sitemap.ts: Skipping unsupported type: ${key}`);
          return false;
        })
        .map(([key]) => {
          const slug = path.relative(path.join(process.cwd(), 'content'), path.join(dir, key)).replace(/\\/g, '/');
          return {
            url: `${baseUrl}/${slug}`,
            lastModified: new Date().toISOString(),
          };
        });
    } catch (error) {
      console.error(`sitemap.ts: Error processing meta file ${filePath}:`, error);
      return [];
    }
  }

  const contentDir = path.join(process.cwd(), 'content');
  const metaFiles = getMetaFiles(contentDir);

  let urls: { url: string; lastModified: string }[] = [];
  
  // Process each meta file
  for (const filePath of metaFiles) {
    urls = [...urls, ...processMetaFile(filePath)];
  }

  // Add the root URL
  urls.push({
    url: baseUrl,
    lastModified: new Date().toISOString(),
  });

  return urls;
}