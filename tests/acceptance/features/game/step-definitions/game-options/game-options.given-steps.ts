import { Given } from "@cucumber/cucumber";
import type { GamePhaseName } from "~/composables/api/game/types/game-phase/game-phase.types";
import { fillInputNumberInGameOptionsHub, switchRoleOptionInGameOptionsHub } from "~/tests/acceptance/features/game/helpers/game-options/game-options.given-steps-helpers";
import { openGameOptionsDialogInGameLobby } from "~/tests/acceptance/features/game/helpers/game-options/game-options.when-steps-helpers";
import { closeDialogWithHeaderButton } from "~/tests/acceptance/features/playwright/helpers/dialogs/playwright-dialogs.when-steps-helpers";
import { goOnPage } from "~/tests/acceptance/features/playwright/helpers/pages/playwright-pages.given-steps-helper";
import { clickOnRoleWithText } from "~/tests/acceptance/features/playwright/helpers/roles/playwright-roles.when-steps-helpers";
import type { CustomWorld } from "~/tests/acceptance/shared/types/word.types";

Given(/^the user makes the game skipping role call if no target in game options$/u, async function(this: CustomWorld): Promise<void> {
  await goOnPage(this, "/game-lobby");
  await openGameOptionsDialogInGameLobby(this);
  await switchRoleOptionInGameOptionsHub(this, "#game-lobby-options-hub-roles-tab-general-do-skip-call-if-no-target-input", true);
  await closeDialogWithHeaderButton(this);
});

Given(/^the user makes the game revealing roles on death in game options$/u, async function(this: CustomWorld): Promise<void> {
  await goOnPage(this, "/game-lobby");
  await openGameOptionsDialogInGameLobby(this);
  await switchRoleOptionInGameOptionsHub(this, "#game-lobby-options-hub-roles-tab-general-are-revealed-on-death-input", true);
  await closeDialogWithHeaderButton(this);
});

Given(/^the user disables the sheriff in game options$/u, async function(this: CustomWorld): Promise<void> {
  await goOnPage(this, "/game-lobby");
  await openGameOptionsDialogInGameLobby(this);
  await switchRoleOptionInGameOptionsHub(this, "#game-lobby-options-hub-roles-tab-sheriff-is-sheriff-enabled-input", false);
  await closeDialogWithHeaderButton(this);
});

Given(/^the user doesn't allow the sheriff to settle votes in game options$/u, async function(this: CustomWorld): Promise<void> {
  await goOnPage(this, "/game-lobby");
  await openGameOptionsDialogInGameLobby(this);
  await switchRoleOptionInGameOptionsHub(this, "#game-lobby-options-hub-roles-tab-sheriff-must-settle-votes-input", false);
  await closeDialogWithHeaderButton(this);
});

Given(/^the user gives the sheriff a regular vote in game options$/u, async function(this: CustomWorld): Promise<void> {
  await goOnPage(this, "/game-lobby");
  await clickOnRoleWithText(this, "button", "Game options");
  await switchRoleOptionInGameOptionsHub(this, "#game-lobby-options-hub-roles-tab-sheriff-has-doubled-vote-input", false);
  await closeDialogWithHeaderButton(this);
});

Given(/^the user sets sheriff election time on (?<phaseName>night|day) (?<turn>\d+) in game options$/u, async function(this: CustomWorld, phaseName: GamePhaseName, turn: string): Promise<void> {
  await goOnPage(this, "/game-lobby");
  await openGameOptionsDialogInGameLobby(this);
  if (phaseName === "day") {
    await switchRoleOptionInGameOptionsHub(this, "#game-lobby-options-hub-roles-tab-sheriff-election-phase-input", true);
  }
  await fillInputNumberInGameOptionsHub(this, "#game-lobby-options-hub-roles-tab-sheriff-election-turn-input", turn);
  await closeDialogWithHeaderButton(this);
});

Given(/^the user makes the seer quiet in game options$/u, async function(this: CustomWorld): Promise<void> {
  await goOnPage(this, "/game-lobby");
  await openGameOptionsDialogInGameLobby(this);
  await switchRoleOptionInGameOptionsHub(this, "#game-lobby-options-hub-roles-tab-seer-is-talkative-input", false);
  await closeDialogWithHeaderButton(this);
});

Given(/^the user doesn't allow the seer to see roles in game options$/u, async function(this: CustomWorld): Promise<void> {
  await goOnPage(this, "/game-lobby");
  await openGameOptionsDialogInGameLobby(this);
  await switchRoleOptionInGameOptionsHub(this, "#game-lobby-options-hub-roles-tab-seer-can-see-roles-input", false);
  await closeDialogWithHeaderButton(this);
});

Given(/^the user makes the big bad wolf remaining powerful even if one werewolf dies in game options$/u, async function(this: CustomWorld): Promise<void> {
  await goOnPage(this, "/game-lobby");
  await openGameOptionsDialogInGameLobby(this);
  await switchRoleOptionInGameOptionsHub(this, "#game-lobby-options-hub-roles-tab-big-bad-wolf-is-powerless-if-werewolf-dies-input", false);
  await closeDialogWithHeaderButton(this);
});

Given(/^the user allows the defender to protect twice in a row in game options$/u, async function(this: CustomWorld): Promise<void> {
  await goOnPage(this, "/game-lobby");
  await openGameOptionsDialogInGameLobby(this);
  await switchRoleOptionInGameOptionsHub(this, "#game-lobby-options-hub-roles-tab-defender-can-protect-twice-input", true);
  await closeDialogWithHeaderButton(this);
});

Given(/^the user sets the scandalmonger mark penalty to (?<markPenalty>\d+) in game options$/u, async function(this: CustomWorld, markPenalty: string): Promise<void> {
  await goOnPage(this, "/game-lobby");
  await openGameOptionsDialogInGameLobby(this);
  await fillInputNumberInGameOptionsHub(this, "#game-lobby-options-hub-roles-tab-scandalmonger-mark-penalty-input", markPenalty);
  await closeDialogWithHeaderButton(this);
});