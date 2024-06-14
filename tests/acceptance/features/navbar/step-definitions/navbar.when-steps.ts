import { When } from "@cucumber/cucumber";

import type { LocatorRole } from "@tests/acceptance/shared/types/playwright.types";
import type { CustomWorld } from "@tests/acceptance/shared/types/word.types";

When(/^the user hovers the (?<role>button|link|menuitem) with name "(?<name>.+?)" in navigation bar$/u, async function(this: CustomWorld, role: LocatorRole, name: string): Promise<void> {
  const navigationBar = this.page.getByRole("navigation", { name: "Navigation bar", exact: true });
  const element = navigationBar.getByRole(role, { name });
  await element.waitFor({ state: "visible" });
  await element.hover({ force: true });
});

When(/^the user clicks on werewolves assistant logo in navigation bar$/u, async function(this: CustomWorld): Promise<void> {
  const navigationBar = this.page.getByRole("navigation", { name: "Navigation bar", exact: true });
  const element = navigationBar.getByRole("link", { name: "Werewolves Assistant", exact: true });
  await element.waitFor({ state: "visible" });
  await element.click();
});

When(/^the user clicks on parameters button in navigation bar$/u, async function(this: CustomWorld): Promise<void> {
  const navigationBar = this.page.getByRole("navigation", { name: "Navigation bar", exact: true });
  const button = navigationBar.getByRole("button", { name: "Parameters", exact: true });
  await button.waitFor({ state: "visible" });
  await button.click();
});

When(/^the user clicks on the cancel game button in parameters in navigation bar$/u, async function(this: CustomWorld): Promise<void> {
  const parametersMenu = this.page.getByRole("menu", { name: "Parameters menu", exact: true });
  const cancelButton = parametersMenu.getByText("Cancel game");
  await cancelButton.waitFor({ state: "visible" });
  await cancelButton.click();
});

When(/^the user clicks on the back to home button in parameters in navigation bar$/u, async function(this: CustomWorld): Promise<void> {
  const parametersMenu = this.page.getByRole("menu", { name: "Parameters menu", exact: true });
  const element = parametersMenu.getByText("Back to home");
  await element.waitFor({ state: "visible" });
  await element.click();
});