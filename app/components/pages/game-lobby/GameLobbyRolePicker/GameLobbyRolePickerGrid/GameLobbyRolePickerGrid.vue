<template>
  <div
    id="game-lobby-role-picker-grid"
    class="gap-4 grid grid-cols-3 lg:grid-cols-5 md:grid-cols-4"
  >
    <TransitionGroup name="fade-list">
      <GameLobbyRolePickerGridElement
        key="random"
        v-tilt
        class="available-role fade-list-item"
        :picked-role="pickedRole"
        @pick-role="onPickRoleFromGameLobbyRolePickerGridElement"
      />

      <GameLobbyRolePickerGridElement
        v-for="role in rolesToDisplay"
        :key="role.name"
        v-tilt
        class="available-role fade-list-item"
        :picked-role="pickedRole"
        :role="role"
        @pick-role="onPickRoleFromGameLobbyRolePickerGridElement"
      />
    </TransitionGroup>
  </div>
</template>

<script setup lang="ts">
import Fuse from "fuse.js";
import { storeToRefs } from "pinia";

import type { GameLobbyRolePickerGridEmits, GameLobbyRolePickerGridProps } from "~/components/pages/game-lobby/GameLobbyRolePicker/GameLobbyRolePickerGrid/game-lobby-role-picker-grid.types";
import GameLobbyRolePickerGridElement from "~/components/pages/game-lobby/GameLobbyRolePicker/GameLobbyRolePickerGrid/GameLobbyRolePickerGridElement/GameLobbyRolePickerGridElement.vue";
import type { Role } from "~/composables/api/role/types/role.class";
import { useRoleName } from "~/composables/api/role/useRoleName";
import { useRolesStore } from "~/stores/role/useRolesStore";

const props = defineProps<GameLobbyRolePickerGridProps>();

const emit = defineEmits<GameLobbyRolePickerGridEmits>();

const rolesStore = useRolesStore();

const { roles } = storeToRefs(rolesStore);

const { getRoleNameLabel } = useRoleName();

const sortedRoleBySideAndName = computed<Role[]>(() => {
  if (!roles.value) {
    return [];
  }
  return roles.value.toSorted((roleA, roleB) => {
    if (roleA.side === roleB.side) {
      const roleAName = getRoleNameLabel(roleA.name);
      const roleBName = getRoleNameLabel(roleB.name);

      return roleAName.localeCompare(roleBName);
    }
    return roleA.side === "werewolves" ? -1 : 1;
  });
});

const rolesToDisplay = computed<Role[]>(() => {
  const trimmedSearchedRoleInput = props.searchedRoleInput?.trim();
  if (trimmedSearchedRoleInput === undefined || trimmedSearchedRoleInput === "") {
    return sortedRoleBySideAndName.value;
  }
  const labeledRoleMap: Map<string, Role> = new Map(sortedRoleBySideAndName.value.map(role => [getRoleNameLabel(role.name), role]));
  const fuse: Fuse<string> = new Fuse([...labeledRoleMap.keys()], {
    threshold: 0.3,
  });
  const fuseResults = fuse.search(trimmedSearchedRoleInput);

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  return fuseResults.map(({ item }) => labeledRoleMap.get(item)!);
});

function onPickRoleFromGameLobbyRolePickerGridElement(role: Role): void {
  emit("pickRole", role);
}
</script>