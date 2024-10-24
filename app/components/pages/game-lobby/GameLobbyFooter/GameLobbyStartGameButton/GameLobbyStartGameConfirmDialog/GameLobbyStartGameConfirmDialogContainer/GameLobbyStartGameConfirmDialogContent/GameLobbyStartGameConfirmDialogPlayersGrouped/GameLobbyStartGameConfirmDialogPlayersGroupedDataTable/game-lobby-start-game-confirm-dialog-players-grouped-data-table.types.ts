import type { CreateGamePlayerDto } from "~/composables/api/game/dto/create-game/create-game-player/create-game-player.dto";

type PlayerGroupsDataTableValue = {
  firstGroup?: CreateGamePlayerDto;
  secondGroup?: CreateGamePlayerDto;
};

export type {
  PlayerGroupsDataTableValue,
};