import type { CustomWorld } from "~/tests/acceptance/shared/types/word.types";

async function playersVoteInPlayground(world: CustomWorld, votes: [source: string, target: string][]): Promise<void> {
  for (const [source, target] of votes) {
    const playerCard = world.page.getByTestId(`game-playground-player-card-${source}`);
    const voteInput = playerCard.locator("#player-vote-input");
    await voteInput.waitFor({ state: "visible" });
    await voteInput.click();
    await voteInput.fill(target);
  }
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
  const makePlayButton = world.page.getByRole("button", { name: "Make Play" });
  await makePlayButton.click();
}

export {
  playersVoteInPlayground,
  targetPlayerInPlayground,
  targetPlayersInPlayground,
  makePlayInPlayground,
};