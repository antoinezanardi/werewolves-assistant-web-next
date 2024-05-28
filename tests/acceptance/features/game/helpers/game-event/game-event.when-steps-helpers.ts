import type { CustomWorld } from "~/tests/acceptance/shared/types/word.types";

async function skipGameEvent(world: CustomWorld): Promise<void> {
  const skipEventButton = world.page.getByRole("button", { name: "Skip" });
  try {
    await skipEventButton.click({ timeout: 50 });
  } catch {
    console.info("Skip button not found");
  }
}

export { skipGameEvent };