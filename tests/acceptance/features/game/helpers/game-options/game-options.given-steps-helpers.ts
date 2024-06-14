import type { CustomWorld } from "@tests/acceptance/shared/types/word.types";

async function switchRoleOptionInGameOptionsHub(world: CustomWorld, selector: string, isChecked: boolean): Promise<void> {
  const switchOption = world.page.locator(selector).getByRole("switch");
  if (isChecked) {
    await switchOption.check();

    return;
  }
  await switchOption.uncheck();
}

async function fillInputNumberInGameOptionsHub(world: CustomWorld, locator: string, value: string): Promise<void> {
  const input = world.page.locator(locator).getByRole("spinbutton");
  await input.waitFor({ state: "visible" });
  await input.fill(value);
}

export {
  switchRoleOptionInGameOptionsHub,
  fillInputNumberInGameOptionsHub,
};