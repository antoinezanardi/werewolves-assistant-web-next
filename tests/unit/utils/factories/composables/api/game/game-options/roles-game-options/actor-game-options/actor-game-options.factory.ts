import { faker } from "@faker-js/faker";
import { ActorGameOptions } from "~/composables/api/game/types/game-options/roles-game-options/actor-game-options/actor-game-options.class";

function createFakeActorGameOptionsFactory(actorGameOptionsFactory: Partial<ActorGameOptions> = {}): ActorGameOptions {
  return ActorGameOptions.create({
    additionalCardsCount: actorGameOptionsFactory.additionalCardsCount ?? faker.number.int({ min: 1, max: 5 }),
    isPowerlessOnWerewolvesSide: actorGameOptionsFactory.isPowerlessOnWerewolvesSide ?? faker.datatype.boolean(),
  });
}

export { createFakeActorGameOptionsFactory };