import { faker } from "@faker-js/faker";
import { IdiotGameOptions } from "~/composables/api/game/types/game-options/roles-game-options/idiot-game-options/idiot-game-options.class";

function createFakeIdiotGameOptions(idiotGameOptions: Partial<IdiotGameOptions> = {}): IdiotGameOptions {
  return IdiotGameOptions.create({ doesDieOnElderDeath: idiotGameOptions.doesDieOnElderDeath ?? faker.datatype.boolean() });
}

export { createFakeIdiotGameOptions };