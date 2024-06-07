import { clickOnRoleWithText } from "~/tests/acceptance/features/playwright/helpers/roles/playwright-roles.when-steps-helpers";
import type { CustomWorld } from "~/tests/acceptance/shared/types/word.types";

async function openGameOptionsDialogInGameLobby(world: CustomWorld): Promise<void> {
  await clickOnRoleWithText(world, "button", "Game options");
}

export { openGameOptionsDialogInGameLobby };