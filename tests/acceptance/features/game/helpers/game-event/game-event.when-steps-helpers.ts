import type { CustomWorld } from "@tests/acceptance/shared/types/word.types";

async function skipGameEvent(world: CustomWorld, doesCheckIfHidden = false): Promise<void> {
  const skipEventButton = world.page.getByRole("button", { name: "Skip" });
  if (doesCheckIfHidden && await skipEventButton.isHidden()) {
    return;
  }
  try {
    await skipEventButton.waitFor({ state: "visible", timeout: 500 });
    await skipEventButton.click({ timeout: 500 });
  } catch {
    console.info("Skip button not found");
  }
}

export { skipGameEvent };