import { World } from "@cucumber/cucumber";
import type { IWorldOptions } from "@cucumber/cucumber";
import type { Page } from "playwright-core";

class CustomWorld extends World {
  public page: Page;

  public constructor(options: IWorldOptions<unknown>) {
    super(options);
  }
}

export { CustomWorld };