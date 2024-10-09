import { Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";

import { getPlayerGroupByNameInGameTeamSide } from "@tests/acceptance/features/game/helpers/player/player-group/player-group.then-steps-helpers";
import type { CustomWorld } from "@tests/acceptance/shared/types/word.types";

Then(/^the player with name "(?<name>.+)" should be in group with name "(?<groupName>.+)" in the game$/u, async function(this: CustomWorld, name: string, groupName: string): Promise<void> {
  const groupImgName = `This player belongs to the group called "${groupName}"`;
  const groupImg = await getPlayerGroupByNameInGameTeamSide(this, name, groupImgName);

  await expect(groupImg).toBeVisible();
});