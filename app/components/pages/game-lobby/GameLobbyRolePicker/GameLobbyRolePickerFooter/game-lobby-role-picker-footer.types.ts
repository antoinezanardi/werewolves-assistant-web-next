import type { CreateGamePlayerDto } from "~/composables/api/game/dto/create-game/create-game-player/create-game-player.dto";
import type { Role } from "~/composables/api/role/types/role.class";

type GameLobbyRolePickerFooterProps = {
  player?: CreateGamePlayerDto;
  pickedRole?: Role;
};

type GameLobbyRolePickerFooterEmits = {
  playerUpdate: [CreateGamePlayerDto];
};

export type {
  GameLobbyRolePickerFooterProps,
  GameLobbyRolePickerFooterEmits,
};