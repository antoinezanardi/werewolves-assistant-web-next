import { Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import type { CustomWorld } from "@tests/acceptance/shared/types/word.types";

Then(/^the game's event should display the text "(?<text>.+)"$/u, async function(this: CustomWorld, text: string): Promise<void> {
  await expect(this.page.getByText(text, { exact: true })).toBeVisible();
});

Then(/^the game's event should display either "(?<textA>.+)" or "(?<textB>.+)"$/u, async function(this: CustomWorld, textA: string, textB: string): Promise<void> {
  const textALocator = this.page.getByText(textA, { exact: true });
  const textBLocator = this.page.getByText(textB, { exact: true });

  await expect(textALocator.or(textBLocator)).toBeVisible();
});

Then(/^the game's event player card should have the name "(?<name>.+)"$/u, async function(this: CustomWorld, name: string): Promise<void> {
  await expect(this.page.getByRole("heading", { name, exact: true })).toBeVisible();
});

Then(/^the game's event previous text button should be (?<isEnabled>enabled|disabled)$/u, async function(this: CustomWorld, isEnabledString: "disabled" | "enabled"): Promise<void> {
  const previousTextButton = this.page.getByRole("button", { name: "Back to the previous event text", exact: true });

  if (isEnabledString === "enabled") {
    await expect(previousTextButton).toBeEnabled();

    return;
  }
  await expect(previousTextButton).toBeDisabled();
});

Then(/^the game's previous event button should be (?<isEnabled>enabled|disabled)$/u, async function(this: CustomWorld, isEnabledString: "disabled" | "enabled"): Promise<void> {
  const previousEventButton = this.page.getByRole("button", { name: " Previous", exact: true });

  if (isEnabledString === "enabled") {
    await expect(previousEventButton).toBeEnabled();

    return;
  }
  await expect(previousEventButton).toBeDisabled();
});