import type { Role } from "~/composables/api/role/types/role.class";

type GameLobbyRolePickerGridElementProps = {
  role: Role;
  isPicked?: boolean;
};

type GameLobbyRolePickerGridElementEmits = {
  pickRole: [Role];
};

export type {
  GameLobbyRolePickerGridElementProps,
  GameLobbyRolePickerGridElementEmits,
};