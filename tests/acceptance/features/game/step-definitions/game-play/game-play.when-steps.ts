import type { DataTable } from "@cucumber/cucumber";
import { When } from "@cucumber/cucumber";

import type { WitchPotion } from "~/composables/api/game/types/game-play/game-play.types";
import { makePlayInPlayground, playersVoteInPlayground, targetPlayerInPlayground, targetPlayersInPlayground } from "~/tests/acceptance/features/game/helpers/game-play/game-play.when-steps-helpers";
import { clickOnRoleWithText } from "~/tests/acceptance/features/playwright/helpers/roles/playwright-roles.when-steps-helpers";
import type { CustomWorld } from "~/tests/acceptance/shared/types/word.types";

When(/^the survivors elect the sheriff with the votes$/u, async function(this: CustomWorld, votes: DataTable): Promise<void> {
  const votesData = votes.rows() as [source: string, target: string][];
  await playersVoteInPlayground(this, votesData);
  await makePlayInPlayground(this);
});

When(/^the survivors vote with the votes$/u, async function(this: CustomWorld, votes: DataTable): Promise<void> {
  const votesData = votes.rows() as [source: string, target: string][];
  await playersVoteInPlayground(this, votesData);
  await makePlayInPlayground(this);
});

When(/^the survivors bury the dead bodies$/u, async function(this: CustomWorld): Promise<void> {
  await makePlayInPlayground(this);
});

When(/^the player or group skips his turn$/u, async function(this: CustomWorld): Promise<void> {
  await makePlayInPlayground(this);
});

When(/^the werewolves eat the player with name "(?<name>.+)"$/u, async function(this: CustomWorld, name: string): Promise<void> {
  await targetPlayerInPlayground(this, name);
  await makePlayInPlayground(this);
});

When(/^the cupid charms the players$/u, async function(this: CustomWorld, players: DataTable): Promise<void> {
  const playersData = players.rows().map(([name]) => name);
  await targetPlayersInPlayground(this, playersData);
  await makePlayInPlayground(this);
});

When(/^the lovers meet each other$/u, async function(this: CustomWorld): Promise<void> {
  await makePlayInPlayground(this);
});

When(/^the hunter shoots the player with name "(?<name>.+)"$/u, async function(this: CustomWorld, name: string): Promise<void> {
  await targetPlayerInPlayground(this, name);
  await makePlayInPlayground(this);
});

When(/^the witch uses her potions on players$/u, async function(this: CustomWorld, potionsAndPlayers: DataTable): Promise<void> {
  const potionsAndPlayersData = potionsAndPlayers.rows() as [potion: WitchPotion, target: string][];
  for (const [potion, target] of potionsAndPlayersData) {
    if (potion === "life") {
      await clickOnRoleWithText(this, "tab", "Image of the life potion");
      await targetPlayerInPlayground(this, target);
    } else {
      await clickOnRoleWithText(this, "tab", "Image of the death potion");
      await targetPlayerInPlayground(this, target);
    }
  }
  await makePlayInPlayground(this);
});

When(/^the pied piper charms the players$/u, async function(this: CustomWorld, players: DataTable): Promise<void> {
  const playersData = players.rows().map(([name]) => name);
  await targetPlayersInPlayground(this, playersData);
  await makePlayInPlayground(this);
});

When(/^the charmed people meet each other$/u, async function(this: CustomWorld): Promise<void> {
  await makePlayInPlayground(this);
});

When(/^the white werewolf eats the player with name "(?<name>.+)"$/u, async function(this: CustomWorld, name: string): Promise<void> {
  await targetPlayerInPlayground(this, name);
  await makePlayInPlayground(this);
});

When(/^the seer looks at the player with name "(?<name>.+)"$/u, async function(this: CustomWorld, name: string): Promise<void> {
  await targetPlayerInPlayground(this, name);
  await makePlayInPlayground(this);
});

When(/^the big bad wolf eats the player with name "(?<name>.+)"$/u, async function(this: CustomWorld, name: string): Promise<void> {
  await targetPlayerInPlayground(this, name);
  await makePlayInPlayground(this);
});

When(/^the sheriff settles the vote with the player with name "(?<name>.+)"$/u, async function(this: CustomWorld, name: string): Promise<void> {
  await targetPlayerInPlayground(this, name);
  await makePlayInPlayground(this);
});

When(/^the sheriff delegates his role to the player with name "(?<name>.+)"$/u, async function(this: CustomWorld, name: string): Promise<void> {
  await targetPlayerInPlayground(this, name);
  await makePlayInPlayground(this);
});

When(/^the defender protects the player with name "(?<name>.+)"$/u, async function(this: CustomWorld, name: string): Promise<void> {
  await targetPlayerInPlayground(this, name);
  await makePlayInPlayground(this);
});