export async function GET() {
  // Parse the comma-separated feature flags into an array
  const featureFlags = (process.env.ENABLED_FEATURES || "")
    .split(",")
    .map(flag => flag.trim())
    .filter(Boolean);

  const transformed = { 
    source: 'validator-service',
    feature_flags: featureFlags, // Send as array instead of raw string
    validatorEndpoint: process.env.VALIDATOR_ENDPOINT
  };
 
  return new Response(JSON.stringify(transformed), {
    headers: { 'Content-Type': 'application/json' },
  });
}
