import 'server-only';

export const apiEndpoints = {
  validator: {
    endpoint: process.env.VALIDATOR_ENDPOINT,
    method: "POST",
    description: "Validates XML files against a schema.",
  },
};
