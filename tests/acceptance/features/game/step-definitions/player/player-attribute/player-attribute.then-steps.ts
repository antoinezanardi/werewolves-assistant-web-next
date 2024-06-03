import { Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { getPlayerAttributeByRoleNameInGameTeamSide } from "~/tests/acceptance/features/game/helpers/player/player-attribute/player-attribute.then-steps-helpers";
import type { CustomWorld } from "~/tests/acceptance/shared/types/word.types";

Then(/^the player with name "(?<name>.+)" should have the attribute seen by seer in the game$/u, async function(this: CustomWorld, name: string): Promise<void> {
  const seenBySeerAttribute = await getPlayerAttributeByRoleNameInGameTeamSide(this, name, "The Seer saw this player and thus knows his role.");

  await expect(seenBySeerAttribute).toBeVisible();
});

Then(/^the player with name "(?<name>.+)" should have the attribute eaten by werewolves in the game$/u, async function(this: CustomWorld, name: string): Promise<void> {
  const eatenByWerewolvesAttribute = await getPlayerAttributeByRoleNameInGameTeamSide(this, name, "The Werewolves ate this player, he'll die the next morning.");

  await expect(eatenByWerewolvesAttribute).toBeVisible();
});