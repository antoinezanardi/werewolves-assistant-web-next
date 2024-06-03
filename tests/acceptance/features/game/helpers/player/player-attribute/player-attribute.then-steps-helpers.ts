import type { Locator } from "playwright-core";
import type { CustomWorld } from "~/tests/acceptance/shared/types/word.types";

async function getPlayerAttributeByRoleNameInGameTeamSide(world: CustomWorld, playerName: string, roleName: string): Promise<Locator> {
  const gameTeamSidePlayerLocator = world.page.getByTestId(`game-team-side-player-${playerName}`).first();
  await gameTeamSidePlayerLocator.waitFor({ state: "visible" });

  return gameTeamSidePlayerLocator.getByRole("img", { name: roleName, exact: true });
}

export { getPlayerAttributeByRoleNameInGameTeamSide };