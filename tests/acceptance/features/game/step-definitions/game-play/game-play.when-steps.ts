import type { DataTable } from "@cucumber/cucumber";
import { When } from "@cucumber/cucumber";
import type { GameAdditionalCardRecipientRoleName } from "~/composables/api/game/types/game-additional-card/game-additional-card.types";

import type { WitchPotion } from "~/composables/api/game/types/game-play/game-play.types";
import { chooseAdditionalCardInPlayground, chooseSideInPlayground, makePlayInPlayground, playersVoteInPlayground, targetPlayerInPlayground, targetPlayersInPlayground } from "@tests/acceptance/features/game/helpers/game-play/game-play.when-steps-helpers";
import { clickOnRoleWithText } from "@tests/acceptance/features/playwright/helpers/roles/playwright-roles.when-steps-helpers";
import type { CustomWorld } from "@tests/acceptance/shared/types/word.types";
import type { RoleSide } from "~/composables/api/role/types/role.types";

When(/^the survivors elect the sheriff with the votes$/u, { timeout: 10000 }, async function(this: CustomWorld, votes: DataTable): Promise<void> {
  const votesData = votes.rows() as [source: string, target: string][];
  await playersVoteInPlayground(this, votesData);
  await makePlayInPlayground(this);
});

When(/^the survivors vote with the votes$/u, { timeout: 10000 }, async function(this: CustomWorld, votes: DataTable): Promise<void> {
  const votesData = votes.rows() as [source: string, target: string][];
  await playersVoteInPlayground(this, votesData);
  await makePlayInPlayground(this);
});

When(/^the survivors bury the dead bodies$/u, async function(this: CustomWorld): Promise<void> {
  await makePlayInPlayground(this);
});

When(/^the user skips game play with keyboard$/u, async function(this: CustomWorld): Promise<void> {
  await this.page.keyboard.press("Shift+Enter");
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

When(/^the scandalmonger marks the player with name "(?<name>.+)"$/u, async function(this: CustomWorld, name: string): Promise<void> {
  await targetPlayerInPlayground(this, name);
  await makePlayInPlayground(this);
});

When(/^the accursed wolf father infects the player with name "(?<name>.+)"$/u, async function(this: CustomWorld, name: string): Promise<void> {
  await targetPlayerInPlayground(this, name);
  await makePlayInPlayground(this);
});

When(/^the wolf-hound chooses the (?<side>villagers|werewolves) side$/u, async function(this: CustomWorld, side: RoleSide): Promise<void> {
  await chooseSideInPlayground(this, side);
  await makePlayInPlayground(this);
});

When(/^the two sisters meet each other$/u, async function(this: CustomWorld): Promise<void> {
  await makePlayInPlayground(this);
});

When(/^the three brothers meet each other$/u, async function(this: CustomWorld): Promise<void> {
  await makePlayInPlayground(this);
});

When(/^the fox sniffs the player with name "(?<name>.+)"$/u, async function(this: CustomWorld, name: string): Promise<void> {
  await targetPlayerInPlayground(this, name);
  await makePlayInPlayground(this);
});

When(/^the (?<recipient>thief|actor) chooses card with role of "(?<roleName>.+)"$/u, async function(this: CustomWorld, recipient: GameAdditionalCardRecipientRoleName, roleName: string): Promise<void> {
  await chooseAdditionalCardInPlayground(this, recipient, roleName);
  await makePlayInPlayground(this);
});

When(/^the stuttering judge requests another vote$/u, async function(this: CustomWorld): Promise<void> {
  await clickOnRoleWithText(this, "button", "He doesn't request another vote");
  await makePlayInPlayground(this);
});

When(/^the wild child chooses the player with name "(?<name>.+)" as a model$/u, async function(this: CustomWorld, name: string): Promise<void> {
  await targetPlayerInPlayground(this, name);
  await makePlayInPlayground(this);
});

When(/^the scapegoat bans from voting the players$/u, async function(this: CustomWorld, players: DataTable): Promise<void> {
  const playersData = players.rows().map(([name]) => name);
  await targetPlayersInPlayground(this, playersData);
  await makePlayInPlayground(this);
});