import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { auth } from "auth";

export const GET = auth(
  async (
    request: NextRequest,
    { params }: { params: Promise<{ filename: string }> },
  ) => {
    if (!("auth" in request) || !request.auth) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 },
      );
    }

    const { filename } = await params;

    // Validate the filename to prevent path traversal
    if (
      !filename ||
      filename.includes("..") ||
      filename.includes("/") ||
      filename.includes("\\")
    ) {
      return NextResponse.json({ error: "Invalid filename" }, { status: 400 });
    }

    try {
      // Read the manifest file to determine the schema category
      const manifestPath = path.join(process.cwd(), "schemas", "manifest.json");
      const manifestContent = fs.readFileSync(manifestPath, "utf-8");
      const manifest = JSON.parse(manifestContent);

      // Find which category the schema belongs to
      let schemaCategory: string | null = null;

      if (manifest.common.includes(filename)) {
        schemaCategory = "common";
      } else if (manifest.cim.includes(filename)) {
        schemaCategory = "cim";
      }

      if (!schemaCategory) {
        return NextResponse.json(
          { error: `Schema file '${filename}' not found in manifest` },
          { status: 404 },
        );
      }

      // Construct the file path
      const schemaPath = path.join(
        process.cwd(),
        "schemas",
        schemaCategory,
        filename,
      );

      // Additional validation: ensure the resolved path is within the schemas directory
      const schemasDir = path.join(process.cwd(), "schemas");
      if (!schemaPath.startsWith(schemasDir)) {
        return NextResponse.json({ error: "Access denied" }, { status: 403 });
      }

      // Check if the file exists
      if (!fs.existsSync(schemaPath)) {
        return NextResponse.json(
          { error: `Schema file '${filename}' not found on disk` },
          { status: 404 },
        );
      }

      // Read and return the schema file
      const schemaContent = fs.readFileSync(schemaPath, "utf-8");

      return new Response(schemaContent, {
        status: 200,
        headers: {
          "Content-Type": "application/xml",
        },
      });
    } catch (error) {
      console.error(`Error fetching schema '${filename}':`, error);
      return NextResponse.json(
        {
          error: `Failed to fetch schema: ${error instanceof Error ? error.message : String(error)}`,
        },
        { status: 500 },
      );
    }
  },
);
