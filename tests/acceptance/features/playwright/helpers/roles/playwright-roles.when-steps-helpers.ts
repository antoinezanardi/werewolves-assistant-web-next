import { World } from "@cucumber/cucumber";
import type { LocatorRole } from "@tests/acceptance/shared/types/playwright.types";
import type { CustomWorld } from "@tests/acceptance/shared/types/word.types";
import type { Locator } from "playwright-core";

async function clickOnRoleWithText(worldOrLocator: CustomWorld | Locator, role: LocatorRole, text: string, isExact = false): Promise<void> {
  let locator: Locator | null = null;
  if (worldOrLocator instanceof World) {
    locator = worldOrLocator.page.getByRole(role, { name: text, exact: isExact });
  } else {
    locator = worldOrLocator.getByRole(role, { name: text, exact: isExact });
  }
  await locator.waitFor({ state: "visible" });
  await locator.click();
}

async function hoverOnRoleWithText(world: CustomWorld, role: LocatorRole, text: string, isExact = false): Promise<void> {
  const button = world.page.getByRole(role, { name: text, exact: isExact });
  await button.waitFor({ state: "visible" });
  await button.hover({ force: true });
}

export {
  clickOnRoleWithText,
  hoverOnRoleWithText,
};