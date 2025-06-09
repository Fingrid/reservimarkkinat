import { getUntypedClient, createTRPCClient, httpLink } from "@trpc/client";

const env = process.env;
const VALIDATOR_ENDPOINT = env.VALIDATOR_ENDPOINT || "http://localhost:8787/trpc";

const anyTypeClient = createTRPCClient({
  links: [
    httpLink({
      url: VALIDATOR_ENDPOINT
    })
  ]
})

export const validatorClient = getUntypedClient(anyTypeClient);
