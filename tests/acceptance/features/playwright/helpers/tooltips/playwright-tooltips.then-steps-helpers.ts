import { expect } from "@playwright/test";

import type { CustomWorld } from "@tests/acceptance/shared/types/word.types";

async function expectTooltipWithTextToBeVisible(world: CustomWorld, name: string, isExact = false): Promise<void> {
  return expect(world.page.getByRole("tooltip", { name, exact: isExact })).toBeVisible();
}

async function expectTooltipWithTextToBeHidden(world: CustomWorld, name: string, isExact = false): Promise<void> {
  return expect(world.page.getByRole("tooltip", { name, exact: isExact })).toBeHidden();
}

export {
  expectTooltipWithTextToBeVisible,
  expectTooltipWithTextToBeHidden,
};