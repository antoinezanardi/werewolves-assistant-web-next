import { faker } from "@faker-js/faker";
import { ThreeBrothersGameOptions } from "~/composables/api/game/types/game-options/roles-game-options/three-brothers-game-options/three-brothers-game-options.class";

function createFakeThreeBrothersGameOptions(threeBrothersGameOptions: Partial<ThreeBrothersGameOptions> = {}): ThreeBrothersGameOptions {
  return ThreeBrothersGameOptions.create({ wakingUpInterval: threeBrothersGameOptions.wakingUpInterval ?? faker.number.int({ min: 1, max: 5 }) });
}

export { createFakeThreeBrothersGameOptions };