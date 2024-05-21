import { faker } from "@faker-js/faker";
import { ElderGameOptions } from "~/composables/api/game/types/game-options/roles-game-options/elder-game-options/elder-game-options.class";

function createFakeElderGameOptions(elderGameOptions: Partial<ElderGameOptions> = {}): ElderGameOptions {
  return ElderGameOptions.create({
    doesTakeHisRevenge: elderGameOptions.doesTakeHisRevenge ?? faker.datatype.boolean(),
    livesCountAgainstWerewolves: elderGameOptions.livesCountAgainstWerewolves ?? faker.number.int({ min: 1, max: 5 }),
  });
}

export { createFakeElderGameOptions };