import { 
  getUntypedClient, 
  createTRPCClient, 
  loggerLink,
  httpBatchLink, 
} from "@trpc/client";
import superjson from 'superjson';


const env = process.env;
const VALIDATOR_ENDPOINT = env.VALIDATOR_ENDPOINT || "http://localhost:8787/trpc";

const anyTypeClient = createTRPCClient({
  links: [
    loggerLink(
      {
        enabled: () => true,
      }
    ),
    httpBatchLink({
        url: VALIDATOR_ENDPOINT,
        transformer: superjson
    })
  ]
})

export const validatorClient = getUntypedClient(anyTypeClient);
