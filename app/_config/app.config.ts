import "server-only";

export const dynamic = "force-static"

export const apiEndpoints = {
  validator: {
    endpoint: process.env.VALIDATOR_ENDPOINT || "",
    method: "POST",
    description: "Validates XML files against a schema.",
  },
};

export const enabledFeatures = (): Set<string> => {
  const enabledFeatures = process.env.ENABLED_FEATURES || "";
  return new Set(
    enabledFeatures
      .split(",")
      .map((f) => f.trim())
      .filter(Boolean),
  );
};
