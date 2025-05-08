import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { auth } from "auth";

export const GET = auth(async (request: NextRequest) => {
  if (!("auth" in request) || !request.auth) {
    return NextResponse.json(
      { error: "Authentication required" },
      { status: 401 },
    );
  }

  try {
    // Read the manifest file
    const manifestPath = path.join(process.cwd(), "schemas", "manifest.json");
    const manifestContent = fs.readFileSync(manifestPath, "utf-8");
    const manifest = JSON.parse(manifestContent);

    return NextResponse.json(manifest, { status: 200 });
  } catch (error) {
    console.error("Error reading schema manifest:", error);
    return NextResponse.json(
      { error: "Failed to read schema manifest" },
      { status: 500 },
    );
  }
});
