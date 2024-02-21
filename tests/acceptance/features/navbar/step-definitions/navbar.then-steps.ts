import { Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";

import type { LocatorRole } from "~/tests/acceptance/shared/types/playwright.types";
import type { CustomWorld } from "~/tests/acceptance/shared/types/word.types";

Then(/^the (?<role>button|img|heading|navigation|link|region|none) with name "(?<name>.+)" in navigation bar should be visible/u, async function(this: CustomWorld, role: LocatorRole, name: string): Promise<void> {
  const navigationBar = this.page.getByRole("navigation", { name: "Navigation bar" });

  await expect(navigationBar.getByRole(role, { name })).toBeVisible();
});

Then(/^the game section in parameters in navigation bar should be visible/u, async function(this: CustomWorld): Promise<void> {
  const parametersMenu = this.page.getByRole("menu", { name: "Parameters menu", exact: true });

  await expect(parametersMenu.getByText("Game", { exact: true })).toBeVisible();
});

Then(/^the game section in parameters in navigation bar should be hidden/u, async function(this: CustomWorld): Promise<void> {
  const parametersMenu = this.page.getByRole("menu", { name: "Parameters menu", exact: true });

  await expect(parametersMenu.getByText("Game", { exact: true })).toBeHidden();
});

Then(/^the cancel game button in parameters in navigation bar should be disabled/u, async function(this: CustomWorld): Promise<void> {
  const parametersMenu = this.page.getByRole("menu", { name: "Parameters menu", exact: true });

  await expect(parametersMenu.getByText("Cancel game")).toBeDisabled();
});