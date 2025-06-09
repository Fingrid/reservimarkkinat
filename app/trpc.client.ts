import { getUntypedClient, createTRPCClient, httpBatchLink } from "@trpc/client";

const env = process.env;
const VALIDATOR_ENDPOINT = env.VALIDATOR_ENDPOINT || "http://localhost:8787/trpc";

const anyTypeClient = createTRPCClient({
  links: [
    httpBatchLink({
      url: VALIDATOR_ENDPOINT
    })
  ]
})

export const validatorClient = getUntypedClient(anyTypeClient);
