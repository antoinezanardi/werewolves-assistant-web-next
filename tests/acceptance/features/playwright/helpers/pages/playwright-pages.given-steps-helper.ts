import { url } from "@nuxt/test-utils/e2e";

import type { CustomWorld } from "@tests/acceptance/shared/types/word.types";

async function goOnPage(world: CustomWorld, pageName: string): Promise<void> {
  const trimmedPageName = pageName.replace(/^\/|\/$/gu, "");
  const fullUrl = url(`/${trimmedPageName}`);
  if (world.page.url() === fullUrl) {
    await waitForPageLoadStates(world);

    return;
  }
  await world.page.goto(fullUrl);
  await waitForPageLoadStates(world);
}

async function waitForPageUrl(world: CustomWorld, pageUrl: string): Promise<void> {
  const expectedUrl = url(pageUrl);
  const expectedUrlRegexp = new RegExp(`${expectedUrl}(\\?.*)?`, "u");
  await world.page.waitForURL(expectedUrlRegexp);
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