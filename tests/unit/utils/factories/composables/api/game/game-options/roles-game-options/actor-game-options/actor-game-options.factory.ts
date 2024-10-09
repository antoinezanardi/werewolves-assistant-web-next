import { faker } from "@faker-js/faker";

import { ActorGameOptions } from "~/composables/api/game/types/game-options/roles-game-options/actor-game-options/actor-game-options.class";

function createFakeActorGameOptionsFactory(actorGameOptionsFactory: Partial<ActorGameOptions> = {}): ActorGameOptions {
  return ActorGameOptions.create({
    isPowerlessOnWerewolvesSide: actorGameOptionsFactory.isPowerlessOnWerewolvesSide ?? faker.datatype.boolean(),
  });
}

export { createFakeActorGameOptionsFactory };