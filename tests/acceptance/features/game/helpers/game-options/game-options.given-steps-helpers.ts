import { clickOnRoleWithText } from "~/tests/acceptance/features/playwright/helpers/roles/playwright-roles.when-steps-helpers";
import type { CustomWorld } from "~/tests/acceptance/shared/types/word.types";

async function switchRoleOptionInGameOptionsHub(world: CustomWorld, selector: string, isChecked: boolean): Promise<void> {
  await clickOnRoleWithText(world, "button", "Game options");
  const switchOption = world.page.locator(selector).getByRole("switch");
  if (isChecked) {
    await switchOption.check();

    return;
  }
  await switchOption.uncheck();
}

export { switchRoleOptionInGameOptionsHub };