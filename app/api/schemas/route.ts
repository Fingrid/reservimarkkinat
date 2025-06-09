import { NextRequest, NextResponse } from "next/server";
import { auth } from "auth";
import { validatorClient } from "@/trpc.client";
import { type SchemaList } from "@/types";

export const GET = auth(async (request: NextRequest) => {
  if (!("auth" in request) || !request.auth) {
    return NextResponse.json(
      { error: "Authentication required" },
      { status: 401 }
    );
  }

  try {
    const response = (await validatorClient.query('listXMLSchemas') as SchemaList);

    console.log("Fetched schemas:", response);

    return NextResponse.json({ schemas: response.schemas }, { status: 200 });
  } catch (error) {
    console.error("Fetching schema list failed:", error);

     return NextResponse.json(
      { error: "Fetching schema list failed." },
      { status: 500 }
    );
  }
});
