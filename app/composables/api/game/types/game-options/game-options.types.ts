import type { Schema } from "type-fest";
import type { DEFAULT_GAME_OPTIONS } from "~/composables/api/game/constants/game-options/game-options.constants";

type DeepStringifiedGameOptions = Schema<typeof DEFAULT_GAME_OPTIONS, string>;

export type { DeepStringifiedGameOptions };