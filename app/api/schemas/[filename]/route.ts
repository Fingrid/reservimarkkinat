import { NextRequest, NextResponse } from "next/server";
import { auth } from "auth";
import { validatorClient } from "@/trpc.client";

export const GET = auth(
  async (
    request: NextRequest,
    { params }: { params: Promise<{ filename: string }> }
  ) => {
    if (!("auth" in request) || !request.auth) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    const { filename } = await params;

    try {
      const response = await validatorClient.query('getXMLSchema', { filename }) as { xsd: string };

      return new Response(response.xsd, {
        status: 200,
        headers: {
          "Content-Type": "application/xml"
        }
      });
    } catch (error) {
      console.error("Fetching schema list failed:", error);

      return NextResponse.json(
        { error: "Fetching schema list failed." },
        { status: 500 }
      );
    }
  }
);
