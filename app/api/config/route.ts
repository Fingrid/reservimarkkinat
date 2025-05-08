import { enabledFeatures } from "@/_config/app.config";
import { NextResponse } from "next/server";

export async function GET() {
  // Get feature flags from env variables
  const features = enabledFeatures();

  // Combine with other configuration
  const config = {
    api_base_url: process.env.API_BASE_URL || "",
    app_name: process.env.APP_NAME || "Fingrid Developer Portal",
    // Add other config values as needed
  };

  return NextResponse.json({
    source: "environment",
    feature_flags: Array.from(features).join(","),
    config,
  });
}
