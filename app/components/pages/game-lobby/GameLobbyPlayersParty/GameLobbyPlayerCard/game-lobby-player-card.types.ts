import type { CreateGamePlayerDto } from "~/composables/api/game/dto/create-game/create-game-player/create-game-player.dto";

type GameLobbyPlayerCardProps = {
  player: CreateGamePlayerDto;
};

type GameLobbyPlayerCardEmits = {
  pickRoleForPlayer: [CreateGamePlayerDto];
};

export type {
  GameLobbyPlayerCardProps,
  GameLobbyPlayerCardEmits,
};