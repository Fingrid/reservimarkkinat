import { getUntypedClient, createTRPCClient, loggerLink, httpBatchLink } from "@trpc/client";

const env = process.env;
const VALIDATOR_ENDPOINT = env.VALIDATOR_ENDPOINT || "http://localhost:8787/trpc";
//const DEBUG_ENABLED = env.DEBUG_ENABLED === "true";

const anyTypeClient = createTRPCClient({
  links: [
    loggerLink(
      {
        enabled: () => true,
      }
    ),
    httpBatchLink({
      maxItems: 5,
      url: VALIDATOR_ENDPOINT
    })
  ]
})

export const validatorClient = getUntypedClient(anyTypeClient);
