import type { CreateGamePlayerDto } from "~/composables/api/game/dto/create-game/create-game-player/create-game-player.dto";

type GameLobbyRolePickerExposed = {
  openToPickRoleForPlayer: (player: CreateGamePlayerDto) => void;
};

export type { GameLobbyRolePickerExposed };