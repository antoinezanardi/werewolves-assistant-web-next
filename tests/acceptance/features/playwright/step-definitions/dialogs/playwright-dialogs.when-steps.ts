import { When } from "@cucumber/cucumber";
import { closeDialogWithFooterButton, closeDialogWithHeaderButton } from "@tests/acceptance/features/playwright/helpers/dialogs/playwright-dialogs.when-steps-helpers";
import type { CustomWorld } from "@tests/acceptance/shared/types/word.types";

When(/^the user clicks on the close button of the dialog's header$/u, async function(this: CustomWorld): Promise<void> {
  await closeDialogWithHeaderButton(this);
});

When(/^the user clicks on the close button of the dialog's footer$/u, async function(this: CustomWorld): Promise<void> {
  await closeDialogWithFooterButton(this);
});