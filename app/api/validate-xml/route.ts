import { apiEndpoints } from "@/_config/app.config";

export async function POST(request: Request) {
  if (!apiEndpoints.validator.endpoint) {
    return new Response("Validator endpoint is not configured", {
      status: 404,
      headers: { "Content-Type": "application/json" },
    });
  }

  const response = await fetch(new Request(apiEndpoints.validator.endpoint, {
    method: apiEndpoints.validator.method,
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
    },
    body: JSON.stringify(await request.json())
  } as RequestInit));

  if(!response.ok) {
    console.error("Error response from validator:", response.statusText);
    
    const body = await response.text();
    console.error("Error body from validator:", body);
    return new Response(body, {
      status: response.status,
      headers: { "Content-Type": "application/json" },
    });
  }

  const data = await response.json();

  return new Response(JSON.stringify(data), {
    headers: { "Content-Type": "application/json" },
  });
}
