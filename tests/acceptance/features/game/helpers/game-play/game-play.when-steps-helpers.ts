import type { CustomWorld } from "@tests/acceptance/shared/types/word.types";
import type { RoleSide } from "~/composables/api/role/types/role.types";

async function playersVoteInPlayground(world: CustomWorld, votes: [source: string, target: string][]): Promise<void> {
  for (const [source, target] of votes) {
    const playerCard = world.page.getByTestId(`game-playground-player-card-${source}`);
    const voteInput = playerCard.locator("#player-vote-input");
    const optionList = world.page.getByRole("listbox");
    await voteInput.click();
    await optionList.getByLabel(target).click();
    await voteInput.blur();
    await optionList.waitFor({ state: "hidden" });
  }
  await world.page.mouse.click(-1, -1);
}

async function targetPlayerInPlayground(world: CustomWorld, name: string): Promise<void> {
  const targetCard = world.page.getByTestId(`game-playground-player-card-${name}`);
  const targetButton = targetCard.getByRole("button");
  await targetButton.waitFor({ state: "visible" });
  await targetButton.click();
}

async function targetPlayersInPlayground(world: CustomWorld, names: string[]): Promise<void> {
  for (const name of names) {
    await targetPlayerInPlayground(world, name);
  }
}

async function makePlayInPlayground(world: CustomWorld): Promise<void> {
  const makePlayButton = world.page.getByRole("button", { name: "Make play", exact: true });
  await makePlayButton.click();
}

async function chooseAdditionalCardInPlayground(world: CustomWorld, recipient: "thief" | "actor", roleName: string): Promise<void> {
  const capitalizedRecipient = recipient.charAt(0).toUpperCase() + recipient.slice(1);
  const name = `Choose card with role of ${roleName} for the ${capitalizedRecipient}`;
  const cardButton = world.page.getByRole("button", { name, exact: true }).first();
  await cardButton.click();
}

async function chooseSideInPlayground(world: CustomWorld, side: RoleSide): Promise<void> {
  const sideName = side === "villagers" ? "Villagers side" : "Werewolves side";
  const sideButton = world.page.getByRole("button", { name: sideName, exact: true }).first();
  await sideButton.click();
}

export {
  playersVoteInPlayground,
  targetPlayerInPlayground,
  targetPlayersInPlayground,
  makePlayInPlayground,
  chooseSideInPlayground,
  chooseAdditionalCardInPlayground,
};