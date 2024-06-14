import { Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";

import type { RoleName } from "~/composables/api/role/types/role.types";
import { expectTooltipWithTextToBeVisible } from "@tests/acceptance/features/playwright/helpers/tooltips/playwright-tooltips.then-steps-helpers";
import type { CustomWorld } from "@tests/acceptance/shared/types/word.types";

Then(/^the player should not have current role in the lobby role picker$/u, async function(this: CustomWorld): Promise<void> {
  const currentRoleContainer = this.page.getByTestId("game-lobby-role-picker-header-current-role");
  const currentRoleText = currentRoleContainer.getByText("None", { exact: true });
  const currentRoleImg = currentRoleContainer.getByRole("img", { name: "Back of the card", exact: true });

  await Promise.all([
    expect(currentRoleText).toBeVisible(),
    expect(currentRoleImg).toBeVisible(),
  ]);
});

Then(/^the player should have "(?<role>.+?)" as current role in the lobby role picker$/u, async function(this: CustomWorld, role: RoleName): Promise<void> {
  const currentRoleContainer = this.page.getByTestId("game-lobby-role-picker-header-current-role");
  const currentRoleText = currentRoleContainer.getByText(role, { exact: true });
  const currentRoleImg = currentRoleContainer.getByRole("img", { name: role, exact: true });

  await Promise.all([
    expect(currentRoleText).toBeVisible(),
    expect(currentRoleImg).toBeVisible(),
  ]);
});

Then(/^the role "(?<role>.+?)" should not have a total badge in the lobby role picker$/u, async function(this: CustomWorld, role: RoleName): Promise<void> {
  const roleButton = this.page.getByRole("button", { name: role, exact: true });
  const roleTotalBadge = roleButton.getByTestId(`game-lobby-role-picker-role-count-in-game-badge`);

  await expect(roleTotalBadge).toBeHidden();
});

Then(/^the role "(?<role>.+?)" should have a total badge with "(?<total>.+?)" in the lobby role picker$/u, async function(this: CustomWorld, role: RoleName, total: string): Promise<void> {
  const roleButton = this.page.getByRole("button", { name: role, exact: true });
  const roleTotalBadge = roleButton.getByTestId(`game-lobby-role-picker-role-count-in-game-badge`);
  const roleTotalBadgeText = roleTotalBadge.getByText(total);

  await expect(roleTotalBadgeText).toBeVisible();
});

Then(/^the role "(?<role>.+?)" total badge should have tooltip with text "(?<text>.+)" in the lobby role picker$/u, async function(this: CustomWorld, role: RoleName, tooltipText: string): Promise<void> {
  const roleButton = this.page.getByRole("button", { name: role, exact: true });
  const roleTotalBadge = roleButton.getByTestId(`game-lobby-role-picker-role-count-in-game-badge`);
  await roleTotalBadge.hover();

  await expectTooltipWithTextToBeVisible(this, tooltipText, true);
});

Then(/^the role "(?<role>.+?)" should have a warning minimum players not reached badge in the lobby role picker$/u, async function(this: CustomWorld, role: RoleName): Promise<void> {
  const roleButton = this.page.getByRole("button", { name: role, exact: true });
  const roleMinimumPlayersNotReachedBadge = roleButton.getByTestId(`game-lobby-role-picker-role-min-count-in-game-badge`);

  await expect(roleMinimumPlayersNotReachedBadge).toBeVisible();
});

Then(/^the role "(?<role>.+?)" should not have a warning minimum players not reached badge in the lobby role picker$/u, async function(this: CustomWorld, role: RoleName): Promise<void> {
  const roleButton = this.page.getByRole("button", { name: role, exact: true });
  const roleMinimumPlayersNotReachedBadge = roleButton.getByTestId(`game-lobby-role-picker-role-min-count-in-game-badge`);

  await expect(roleMinimumPlayersNotReachedBadge).toBeHidden();
});

Then(/^the role "(?<role>.+?)" warning minimum players not reached badge should have tooltip with text "(?<text>.+)" in the lobby role picker$/u, async function(this: CustomWorld, role: RoleName, tooltipText: string): Promise<void> {
  const roleButton = this.page.getByRole("button", { name: role, exact: true });
  const roleMinimumPlayersNotReachedBadge = roleButton.getByTestId(`game-lobby-role-picker-role-min-count-in-game-badge`);
  await roleMinimumPlayersNotReachedBadge.hover();

  await expectTooltipWithTextToBeVisible(this, tooltipText, true);
});

Then(/^the role's description image with name "(?<name>.+)" should be visible in the lobby role picker$/u, async function(this: CustomWorld, name: string): Promise<void> {
  const roleDescription = this.page.getByTestId("game-lobby-role-picker-description");
  const roleDescriptionImage = roleDescription.getByRole("img", { name, exact: true });

  await expect(roleDescriptionImage).toBeVisible();
});

Then(/^the role's description image with name "(?<name>.+)" should be in viewport in the lobby role picker$/u, async function(this: CustomWorld, name: string): Promise<void> {
  const roleDescription = this.page.getByTestId("game-lobby-role-picker-description");
  const roleDescriptionImage = roleDescription.getByRole("img", { name, exact: true });

  await expect(roleDescriptionImage).toBeInViewport();
});

Then(/^the role's description should have text "(?<text>.+)" in the lobby role picker$/u, async function(this: CustomWorld, text: string): Promise<void> {
  const roleDescription = this.page.getByTestId("game-lobby-role-picker-description");

  await expect(roleDescription.getByText(text, { exact: true })).toBeVisible();
});