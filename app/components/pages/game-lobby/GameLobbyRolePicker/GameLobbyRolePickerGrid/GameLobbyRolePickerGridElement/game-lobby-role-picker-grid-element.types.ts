import type { Role } from "~/composables/api/role/types/role.class";

type GameLobbyRolePickerGridElementProps = {
  role?: Role;
  pickedRole?: Role;
};

type GameLobbyRolePickerGridElementEmits = {
  pickRole: [Role];
};

export type {
  GameLobbyRolePickerGridElementProps,
  GameLobbyRolePickerGridElementEmits,
};