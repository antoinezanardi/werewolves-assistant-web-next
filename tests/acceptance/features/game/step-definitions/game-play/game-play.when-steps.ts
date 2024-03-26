import type { DataTable } from "@cucumber/cucumber";
import { When } from "@cucumber/cucumber";

import { makePlayInPlayground, playersVoteInPlayground, targetPlayerInPlayground, targetPlayersInPlayground } from "~/tests/acceptance/features/game/helpers/game-play/game-play.when-steps-helpers";
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