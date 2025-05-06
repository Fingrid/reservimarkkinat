import { NextRequest } from 'next/server';
 
export async function GET(request: NextRequest) {
  const response = await fetch('http://kepo-bff/validate-xml', {});
 
  // Transform or forward the response
  const data = await response.json();
  const transformed = { ...data, source: 'proxied-through-nextjs' };
 
  return new Response(JSON.stringify(transformed), {
    headers: { 'Content-Type': 'application/json' },
  });
}
