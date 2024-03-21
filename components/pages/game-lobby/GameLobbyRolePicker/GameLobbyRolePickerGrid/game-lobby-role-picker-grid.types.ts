import type { Role } from "~/composables/api/role/types/role.class";

type GameLobbyRolePickerGridEmits = {
  pickRole: [Role];
};

export type { GameLobbyRolePickerGridEmits };