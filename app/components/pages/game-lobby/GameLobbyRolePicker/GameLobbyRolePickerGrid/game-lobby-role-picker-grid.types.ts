import type { Role } from "~/composables/api/role/types/role.class";

type GameLobbyRolePickerGridProps = {
  pickedRole?: Role;
  searchedRoleInput?: string;
};

type GameLobbyRolePickerGridEmits = {
  pickRole: [Role];
};

export type {
  GameLobbyRolePickerGridProps,
  GameLobbyRolePickerGridEmits,
};