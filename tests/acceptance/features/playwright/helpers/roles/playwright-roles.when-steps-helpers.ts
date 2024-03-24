import type { LocatorRole } from "~/tests/acceptance/shared/types/playwright.types";
import type { CustomWorld } from "~/tests/acceptance/shared/types/word.types";

async function clickOnRoleWithText(world: CustomWorld, role: LocatorRole, text: string, isExact = false): Promise<void> {
  const button = world.page.getByRole(role, { name: text, exact: isExact });
  await button.waitFor({ state: "visible" });
  await button.click();
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