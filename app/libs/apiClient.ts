import { createClient } from "@operon/request";
import { withLogger } from "@operon/request/middleware";

export const operonApiClient = createClient({
  baseURL: import.meta.env.VITE_OPERON_COMPOSE_BACKEND_URL,
});

if (import.meta.env.DEV) {
  operonApiClient.use(withLogger());
}
