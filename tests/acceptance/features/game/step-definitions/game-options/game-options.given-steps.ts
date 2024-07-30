import { Given } from "@cucumber/cucumber";
import type { GamePhaseName } from "~/composables/api/game/types/game-phase/game-phase.types";
import { fillInputNumberInGameOptionsHub, switchRoleOptionInGameOptionsHub } from "@tests/acceptance/features/game/helpers/game-options/game-options.given-steps-helpers";
import { openGameOptionsDialogInGameLobby, openVotesTabInGameOptionsDialog } from "@tests/acceptance/features/game/helpers/game-options/game-options.when-steps-helpers";
import { closeDialogWithHeaderButton } from "@tests/acceptance/features/playwright/helpers/dialogs/playwright-dialogs.when-steps-helpers";
import { goOnPage } from "@tests/acceptance/features/playwright/helpers/pages/playwright-pages.given-steps-helper";
import { clickOnRoleWithText } from "@tests/acceptance/features/playwright/helpers/roles/playwright-roles.when-steps-helpers";
import type { CustomWorld } from "@tests/acceptance/shared/types/word.types";

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

Given(/^the user allows werewolves to eat each other in game options$/u, async function(this: CustomWorld): Promise<void> {
  await goOnPage(this, "/game-lobby");
  await openGameOptionsDialogInGameLobby(this);
  await switchRoleOptionInGameOptionsHub(this, "#game-lobby-options-hub-roles-tab-werewolf-can-eat-each-other-input", true);
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

Given(/^the user sets the white werewolf waking up interval to (?<wakingUpInterval>\d+) in game options$/u, async function(this: CustomWorld, wakingUpInterval: string): Promise<void> {
  await goOnPage(this, "/game-lobby");
  await openGameOptionsDialogInGameLobby(this);
  await fillInputNumberInGameOptionsHub(this, "#game-lobby-options-hub-roles-tab-white-werewolf-waking-up-interval-input", wakingUpInterval);
  await closeDialogWithHeaderButton(this);
});

Given(/^the user sets the pied piper charmed people count per night to (?<charmedCount>\d+) in game options$/u, async function(this: CustomWorld, charmedCount: string): Promise<void> {
  await goOnPage(this, "/game-lobby");
  await openGameOptionsDialogInGameLobby(this);
  await fillInputNumberInGameOptionsHub(this, "#game-lobby-options-hub-roles-tab-pied-piper-charmed-people-count-per-night-input", charmedCount);
  await closeDialogWithHeaderButton(this);
});

Given(/^the user sets the infected pied piper powerful in game options$/u, async function(this: CustomWorld): Promise<void> {
  await goOnPage(this, "/game-lobby");
  await openGameOptionsDialogInGameLobby(this);
  await switchRoleOptionInGameOptionsHub(this, "#game-lobby-options-hub-roles-tab-pied-piper-is-powerless-on-werewolves-side-input", false);
  await closeDialogWithHeaderButton(this);
});

Given(/^the user sets the pied piper charmed people revealed in game options$/u, async function(this: CustomWorld): Promise<void> {
  await goOnPage(this, "/game-lobby");
  await openGameOptionsDialogInGameLobby(this);
  await switchRoleOptionInGameOptionsHub(this, "#game-lobby-options-hub-roles-tab-pied-piper-are-charmed-people-revealed-input", true);
  await closeDialogWithHeaderButton(this);
});

Given(/^the user sets wolf-hound chosen side revealed to everyone in game options$/u, async function(this: CustomWorld): Promise<void> {
  await goOnPage(this, "/game-lobby");
  await openGameOptionsDialogInGameLobby(this);
  await switchRoleOptionInGameOptionsHub(this, "#game-lobby-options-hub-roles-tab-wolf-hound-is-chosen-side-revealed-input", true);
  await closeDialogWithHeaderButton(this);
});

Given(/^the user sets wolf-hound side randomly chosen by assistant in game options$/u, async function(this: CustomWorld): Promise<void> {
  await goOnPage(this, "/game-lobby");
  await openGameOptionsDialogInGameLobby(this);
  await switchRoleOptionInGameOptionsHub(this, "#game-lobby-options-hub-roles-tab-wolf-hound-is-side-randomly-chosen-input", true);
  await closeDialogWithHeaderButton(this);
});

Given(/^the user forces the lovers from cupid reveal their roles to each other in game options$/u, async function(this: CustomWorld): Promise<void> {
  await goOnPage(this, "/game-lobby");
  await openGameOptionsDialogInGameLobby(this);
  await switchRoleOptionInGameOptionsHub(this, "#game-lobby-options-hub-roles-tab-cupid-do-lovers-reveal-role-to-each-other-input", true);
  await closeDialogWithHeaderButton(this);
});

Given(/^the user sets cupid must win with lovers in game options$/u, async function(this: CustomWorld): Promise<void> {
  await goOnPage(this, "/game-lobby");
  await openGameOptionsDialogInGameLobby(this);
  await switchRoleOptionInGameOptionsHub(this, "#game-lobby-options-hub-roles-tab-cupid-must-win-with-lovers-input", true);
  await closeDialogWithHeaderButton(this);
});

Given(/^the user allows the defender to protect the little girl from the werewolves in game options$/u, async function(this: CustomWorld): Promise<void> {
  await goOnPage(this, "/game-lobby");
  await openGameOptionsDialogInGameLobby(this);
  await switchRoleOptionInGameOptionsHub(this, "#game-lobby-options-hub-roles-tab-little-girl-is-protected-by-defender-input", true);
  await closeDialogWithHeaderButton(this);
});

Given(/^the user prevents the revealed idiot death on elder's death in game options$/u, async function(this: CustomWorld): Promise<void> {
  await goOnPage(this, "/game-lobby");
  await openGameOptionsDialogInGameLobby(this);
  await switchRoleOptionInGameOptionsHub(this, "#game-lobby-options-hub-roles-tab-idiot-does-die-on-elder-death-input", false);
  await closeDialogWithHeaderButton(this);
});

Given(/^the user sets the two sisters waking up interval to (?<wakingUpInterval>\d+) in game options$/u, async function(this: CustomWorld, wakingUpInterval: string): Promise<void> {
  await goOnPage(this, "/game-lobby");
  await openGameOptionsDialogInGameLobby(this);
  await fillInputNumberInGameOptionsHub(this, "#game-lobby-options-hub-roles-tab-two-sisters-waking-up-interval-input", wakingUpInterval);
  await closeDialogWithHeaderButton(this);
});

Given(/^the user sets the three brothers waking up interval to (?<wakingUpInterval>\d+) in game options$/u, async function(this: CustomWorld, wakingUpInterval: string): Promise<void> {
  await goOnPage(this, "/game-lobby");
  await openGameOptionsDialogInGameLobby(this);
  await fillInputNumberInGameOptionsHub(this, "#game-lobby-options-hub-roles-tab-three-brothers-waking-up-interval-input", wakingUpInterval);
  await closeDialogWithHeaderButton(this);
});

Given(/^the user sets the votes duration to (?<votesDuration>\d+) seconds in game options$/u, async function(this: CustomWorld, votesDuration: string): Promise<void> {
  await goOnPage(this, "/game-lobby");
  await openGameOptionsDialogInGameLobby(this);
  await openVotesTabInGameOptionsDialog(this);
  await fillInputNumberInGameOptionsHub(this, "#game-lobby-options-hub-roles-tab-votes-duration-input", votesDuration);
  await closeDialogWithHeaderButton(this);
});

Given(/^the user sets the elder's lives count to (?<livesCount>\d+) in game options$/u, async function(this: CustomWorld, livesCount: string): Promise<void> {
  await goOnPage(this, "/game-lobby");
  await openGameOptionsDialogInGameLobby(this);
  await fillInputNumberInGameOptionsHub(this, "#game-lobby-options-hub-roles-tab-elder-lives-count-against-werewolves-input", livesCount);
  await closeDialogWithHeaderButton(this);
});

Given(/^the user doesn't allow the elder to take his revenge in game options$/u, async function(this: CustomWorld): Promise<void> {
  await goOnPage(this, "/game-lobby");
  await openGameOptionsDialogInGameLobby(this);
  await switchRoleOptionInGameOptionsHub(this, "#game-lobby-options-hub-roles-tab-elder-does-take-his-revenge-input", false);
  await closeDialogWithHeaderButton(this);
});

Given(/^the user prevents bear to growl if he's infected in game options$/u, async function(this: CustomWorld): Promise<void> {
  await goOnPage(this, "/game-lobby");
  await openGameOptionsDialogInGameLobby(this);
  await switchRoleOptionInGameOptionsHub(this, "#game-lobby-options-hub-roles-tab-bear-tamer-does-growl-on-werewolves-side-input", false);
  await closeDialogWithHeaderButton(this);
});

Given(/^the user prevents fox to be powerless if it misses a werewolf in game options$/u, async function(this: CustomWorld): Promise<void> {
  await goOnPage(this, "/game-lobby");
  await openGameOptionsDialogInGameLobby(this);
  await switchRoleOptionInGameOptionsHub(this, "#game-lobby-options-hub-roles-tab-fox-is-powerless-if-misses-werewolf-input", false);
  await closeDialogWithHeaderButton(this);
});