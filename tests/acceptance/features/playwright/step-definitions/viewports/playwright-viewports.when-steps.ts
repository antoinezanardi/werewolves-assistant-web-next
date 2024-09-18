import { When } from "@cucumber/cucumber";
import type { CustomWorld } from "@tests/acceptance/shared/types/word.types";
import { devices } from "playwright-core";

When(/^the user renders the app on the (?<device>iPhone X|iPad Mini)$/u, async function(this: CustomWorld, device: string): Promise<void> {
  await this.page.setViewportSize(devices[device].viewport);
});