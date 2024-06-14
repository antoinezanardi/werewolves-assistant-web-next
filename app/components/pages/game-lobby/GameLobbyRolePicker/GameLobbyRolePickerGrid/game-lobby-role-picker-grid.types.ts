import type { Role } from "~/composables/api/role/types/role.class";

type GameLobbyRolePickerGridProps = {
  pickedRole?: Role;
};

type GameLobbyRolePickerGridEmits = {
  pickRole: [Role];
};

export type {
  GameLobbyRolePickerGridProps,
  GameLobbyRolePickerGridEmits,
};