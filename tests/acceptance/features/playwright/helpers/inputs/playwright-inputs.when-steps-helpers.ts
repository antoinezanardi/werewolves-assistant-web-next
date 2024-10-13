import type { CustomWorld } from "@tests/acceptance/shared/types/word.types";

async function fillInputWithLabel(world: CustomWorld, label: string, text: string, isExact = false): Promise<void> {
  const input = world.page.getByLabel(label, { exact: isExact });
  await input.waitFor({ state: "visible" });
  await input.fill(text);
}

async function fillInputWithLocator(world: CustomWorld, locator: string, text: string): Promise<void> {
  const input = world.page.locator(locator);
  await input.waitFor({ state: "visible" });
  await input.fill(text);
}

export {
  fillInputWithLabel,
  fillInputWithLocator,
};