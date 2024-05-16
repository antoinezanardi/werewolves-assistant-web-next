import { faker } from "@faker-js/faker";
import { PrejudicedManipulatorGameOptions } from "~/composables/api/game/types/game-options/roles-game-options/prejudiced-manipulator-game-options/prejudiced-manipulator-game-options.class";

function createFakePrejudicedManipulatorGameOptions(prejudicedManipulatorGameOptions: Partial<PrejudicedManipulatorGameOptions> = {}): PrejudicedManipulatorGameOptions {
  return PrejudicedManipulatorGameOptions.create({ isPowerlessOnWerewolvesSide: prejudicedManipulatorGameOptions.isPowerlessOnWerewolvesSide ?? faker.datatype.boolean() });
}

export { createFakePrejudicedManipulatorGameOptions };