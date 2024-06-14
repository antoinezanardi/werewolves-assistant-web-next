import type { CustomWorld } from "@tests/acceptance/shared/types/word.types";

async function closeToast(world: CustomWorld): Promise<void> {
  const toast = world.page.getByRole("alert");
  await toast.getByRole("button").click();
}

export { closeToast };