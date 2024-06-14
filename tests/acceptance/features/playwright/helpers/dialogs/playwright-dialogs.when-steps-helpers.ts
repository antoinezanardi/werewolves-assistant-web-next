import type { CustomWorld } from "@tests/acceptance/shared/types/word.types";

async function closeDialogWithHeaderButton(world: CustomWorld): Promise<void> {
  const button = world.page.getByLabel("Close", { exact: true }).first();
  await button.waitFor({ state: "visible" });
  await button.click();
}

async function closeDialogWithFooterButton(world: CustomWorld): Promise<void> {
  const button = world.page.locator("#close-button-only-dialog-footer-close-button");
  await button.waitFor({ state: "visible" });
  await button.click();
}

export {
  closeDialogWithHeaderButton,
  closeDialogWithFooterButton,
};