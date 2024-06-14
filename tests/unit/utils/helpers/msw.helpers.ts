import type { SetupServer } from "msw/node";
import { setupServer } from "msw/node";

import { MSW_HANDLERS } from "@tests/unit/utils/constants/msw.constants";

function setupMswServer(): SetupServer {
  return setupServer(...MSW_HANDLERS);
}

export { setupMswServer };