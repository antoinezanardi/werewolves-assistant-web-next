import { GameOptions } from "~/composables/api/game/types/game-options/game-options.class";
import { createFakeCompositionGameOptions } from "~/tests/unit/utils/factories/composables/api/game/game-options/composition-game-options/composition-game-options.factory";
import { createFakeRolesGameOptions } from "~/tests/unit/utils/factories/composables/api/game/game-options/roles-game-options/roles-game-options.factory";
import { createFakeVotesGameOptions } from "~/tests/unit/utils/factories/composables/api/game/game-options/votes-game-options/votes-game-options.factory";

function createFakeGameOptions(gameOptions: Partial<GameOptions> = {}): GameOptions {
  return GameOptions.create({
    composition: createFakeCompositionGameOptions(gameOptions.composition),
    roles: createFakeRolesGameOptions(gameOptions.roles),
    votes: createFakeVotesGameOptions(gameOptions.votes),
  });
}

export { createFakeGameOptions };