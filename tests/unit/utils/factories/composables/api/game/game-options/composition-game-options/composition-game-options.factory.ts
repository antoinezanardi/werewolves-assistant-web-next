import { faker } from "@faker-js/faker";
import { CompositionGameOptions } from "~/composables/api/game/types/game-options/composition-game-options/composition-game-options.class";

function createFakeCompositionGameOptions(compositionGameOptions: Partial<CompositionGameOptions> = {}): CompositionGameOptions {
  return CompositionGameOptions.create({ isHidden: compositionGameOptions.isHidden ?? faker.datatype.boolean() });
}

export { createFakeCompositionGameOptions };