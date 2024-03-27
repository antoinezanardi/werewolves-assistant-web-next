import { url } from "@nuxt/test-utils/e2e";

import type { CustomWorld } from "~/tests/acceptance/shared/types/word.types";

async function goOnPage(world: CustomWorld, pageName: string): Promise<void> {
  const trimmedPageName = pageName.replace(/^\/|\/$/gu, "");
  await world.page.goto(url(`/${trimmedPageName}`));
  await waitForPageLoadStates(world);
}

async function waitForPageUrl(world: CustomWorld, pageUrl: string): Promise<void> {
  await world.page.waitForURL(url(pageUrl));
  await waitForPageLoadStates(world);
}

async function waitForPageLoadStates(world: CustomWorld): Promise<void> {
  await Promise.all([
    world.page.waitForLoadState("load"),
    world.page.waitForLoadState("networkidle"),
  ]);
}

export {
  goOnPage,
  waitForPageUrl,
  waitForPageLoadStates,
};