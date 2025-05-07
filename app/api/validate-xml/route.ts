import { apiEndpoints } from "@/_config/app.config";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  if (!apiEndpoints.validator.endpoint) {
    return new Response("Validator endpoint is not configured", {
      status: 404,
      headers: { "Content-Type": "application/json" },
    });
  }

  const response = await fetch(apiEndpoints.validator.endpoint, {
    method: apiEndpoints.validator.method,
    headers: {
      "Content-Type": "application/xml",
      Accept: "application/json",
    },
    body: request.body,
  });

  const data = await response.json();

  return new Response(JSON.stringify(data), {
    headers: { "Content-Type": "application/json" },
  });
}
