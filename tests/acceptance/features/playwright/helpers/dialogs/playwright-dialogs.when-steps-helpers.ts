import { When } from "@cucumber/cucumber";
import type { CustomWorld } from "~/tests/acceptance/shared/types/word.types";

When(/^the user clicks on the close button of the dialog's header$/u, async function(this: CustomWorld): Promise<void> {
  const button = this.page.getByLabel("Close", { exact: true }).first();
  await button.waitFor({ state: "visible" });
  await button.click();
});

When(/^the user clicks on the close button of the dialog's footer$/u, async function(this: CustomWorld): Promise<void> {
  const button = this.page.locator("#close-button-only-dialog-footer-close-button");
  await button.waitFor({ state: "visible" });
  await button.click();
});