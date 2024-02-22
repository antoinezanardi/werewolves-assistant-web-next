import { World } from "@cucumber/cucumber";
import type { IWorldOptions } from "@cucumber/cucumber";
import type { BrowserContext, Page } from "playwright-core";

class CustomWorld extends World {
  public page: Page;

  public context: BrowserContext;

  public newPagePromise: Promise<Page>;

  public constructor(options: IWorldOptions<unknown>) {
    super(options);
  }
}

export { CustomWorld };