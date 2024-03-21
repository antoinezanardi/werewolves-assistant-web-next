import type { CreateGamePlayerDto } from "~/composables/api/game/dto/create-game/create-game-player/create-game-player.dto";

type GameLobbyPlayersPartyEmits = {
  pickRoleForPlayer: [CreateGamePlayerDto];
};

export type { GameLobbyPlayersPartyEmits };