import { When } from "@cucumber/cucumber";
import type { DataTable } from "@cucumber/cucumber";

import { editGroupNameInGroupOrganizer, setPlayersInFirstGroupInGroupOrganizer, setPlayersInSecondGroupInGroupOrganizer } from "@tests/acceptance/features/game-lobby/helpers/game-lobby-group-organizer/game-lobby-group-organizer.when-steps-helpers";
import type { CustomWorld } from "@tests/acceptance/shared/types/word.types";

When(/^the user sets the following players in the second group in group organizer$/u, async function(
  this: CustomWorld,
  players: DataTable,
): Promise<void> {
  const playersData = players.rows();
  const playerNames = playersData.map(row => row[0]);
  await setPlayersInSecondGroupInGroupOrganizer(this, playerNames);
});

When(/^the user sets the following players in the first group in group organizer$/u, async function(
  this: CustomWorld,
  players: DataTable,
): Promise<void> {
  const playersData = players.rows();
  const playerNames = playersData.map(row => row[0]);
  await setPlayersInFirstGroupInGroupOrganizer(this, playerNames);
});

When(/^the user edits the group name from "(?<oldName>.+?)" to "(?<newName>.+?)" in group organizer$/u, async function(
  this: CustomWorld,
  oldName: string,
  newName: string,
): Promise<void> {
  await editGroupNameInGroupOrganizer(this, oldName, newName);
});