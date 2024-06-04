import { Given } from "@cucumber/cucumber";
import { switchRoleOptionInGameOptionsHub } from "~/tests/acceptance/features/game/helpers/game-options/game-options.given-steps-helpers";
import { closeDialogWithHeaderButton } from "~/tests/acceptance/features/playwright/helpers/dialogs/playwright-dialogs.when-steps-helpers";
import { goOnPage } from "~/tests/acceptance/features/playwright/helpers/pages/playwright-pages.given-steps-helper";
import type { CustomWorld } from "~/tests/acceptance/shared/types/word.types";

Given(/^the user disables the sheriff in game options$/u, async function(this: CustomWorld): Promise<void> {
  await goOnPage(this, "/game-lobby");
  await switchRoleOptionInGameOptionsHub(this, "#game-lobby-options-hub-roles-tab-sheriff-is-sheriff-enabled-input", false);
  await closeDialogWithHeaderButton(this);
});

Given(/^the user makes the seer quiet in game options$/u, async function(this: CustomWorld): Promise<void> {
  await goOnPage(this, "/game-lobby");
  await switchRoleOptionInGameOptionsHub(this, "#game-lobby-options-hub-roles-tab-seer-is-talkative-input", false);
  await closeDialogWithHeaderButton(this);
});

Given(/^the user doesn't allow the seer to see roles in game options$/u, async function(this: CustomWorld): Promise<void> {
  await goOnPage(this, "/game-lobby");
  await switchRoleOptionInGameOptionsHub(this, "#game-lobby-options-hub-roles-tab-seer-can-see-roles-input", false);
  await closeDialogWithHeaderButton(this);
});

Given(/^the user makes the big bad wolf remaining powerful even if one werewolf dies in game options$/u, async function(this: CustomWorld): Promise<void> {
  await goOnPage(this, "/game-lobby");
  await switchRoleOptionInGameOptionsHub(this, "#game-lobby-options-hub-roles-tab-big-bad-wolf-is-powerless-if-werewolf-dies-input", false);
  await closeDialogWithHeaderButton(this);
});