import { Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";

import type { CustomWorld } from "@tests/acceptance/shared/types/word.types";

Then(/^the toast with text "(?<text>.+)" should be visible$/u, async function(this: CustomWorld, text: string): Promise<void> {
  const toastsContainer = this.page.locator(".p-toast").first();

  await expect(toastsContainer.getByRole("alert").getByText(text)).toBeVisible();
});