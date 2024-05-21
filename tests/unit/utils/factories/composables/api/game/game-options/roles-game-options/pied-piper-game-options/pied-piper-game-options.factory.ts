import { faker } from "@faker-js/faker";
import { PiedPiperGameOptions } from "~/composables/api/game/types/game-options/roles-game-options/pied-piper-game-options/pied-piper-game-options.class";

function createFakePiedPiperGameOptions(piedPiperGameOptions: Partial<PiedPiperGameOptions> = {}): PiedPiperGameOptions {
  return PiedPiperGameOptions.create({
    charmedPeopleCountPerNight: piedPiperGameOptions.charmedPeopleCountPerNight ?? faker.number.int({ min: 1, max: 5 }),
    isPowerlessOnWerewolvesSide: piedPiperGameOptions.isPowerlessOnWerewolvesSide ?? faker.datatype.boolean(),
  });
}

export { createFakePiedPiperGameOptions };