import type { CustomWorld } from "@tests/acceptance/shared/types/word.types";

async function clickOnToggleButtonInGameOptionsHub(world: CustomWorld, locator: string): Promise<void> {
  const button = world.page.locator(locator);
  await button.waitFor({ state: "visible" });
  await button.click();
}

async function fillInputNumberInGameOptionsHub(world: CustomWorld, locator: string, value: string): Promise<void> {
  const input = world.page.locator(locator).getByRole("spinbutton");
  await input.waitFor({ state: "visible" });
  await input.fill(value);
}

export {
  clickOnToggleButtonInGameOptionsHub,
  fillInputNumberInGameOptionsHub,
};