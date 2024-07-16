import { faker } from "@faker-js/faker";
import { VotesGameOptions } from "~/composables/api/game/types/game-options/votes-game-options/votes-game-options.class";

function createFakeVotesGameOptions(votesGameOptions: Partial<VotesGameOptions> = {}): VotesGameOptions {
  return VotesGameOptions.create({
    canBeSkipped: votesGameOptions.canBeSkipped ?? faker.datatype.boolean(),
    duration: votesGameOptions.duration ?? faker.number.int({ min: 10, max: 600 }),
  });
}

export { createFakeVotesGameOptions };