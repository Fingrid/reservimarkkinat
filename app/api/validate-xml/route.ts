import { NextRequest, NextResponse } from "next/server";
import { auth } from "auth";
import { validatorClient } from "@/trpc.client";

export const POST = auth(async (request: NextRequest) => {
  if (!("auth" in request) || !request.auth) {
    return NextResponse.json(
      { error: "Authentication required" },
      { status: 401 }
    );
  }
  try {
    const response = await validatorClient.query('validateXml', { content: await request.json() }) as { xsd: string };

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error("Fetching schema list failed:", error);

    return NextResponse.json(
      { error: "Validation failed." },
      { status: 500 }
    );
  }
});
