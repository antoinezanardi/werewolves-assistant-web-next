import { When } from "@cucumber/cucumber";

import { closeToast } from "@tests/acceptance/features/playwright/helpers/toasts/toast.when-steps-helpers";
import type { CustomWorld } from "@tests/acceptance/shared/types/word.types";

When(/^the user closes the toast$/u, async function(this: CustomWorld): Promise<void> {
  await closeToast(this);
});