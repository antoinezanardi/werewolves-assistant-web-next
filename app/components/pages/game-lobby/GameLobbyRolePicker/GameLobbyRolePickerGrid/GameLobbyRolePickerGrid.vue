<template>
  <div
    id="game-lobby-role-picker-grid"
    class="gap-4 grid grid-cols-5"
  >
    <GameLobbyRolePickerGridElement
      class="available-role"
      :picked-role="pickedRole"
      @pick-role="pickRole"
    />

    <GameLobbyRolePickerGridElement
      v-for="role in sortedRoleBySideAndName"
      :key="role.name"
      class="available-role"
      :picked-role="pickedRole"
      :role="role"
      @pick-role="pickRole"
    />
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";

import type { GameLobbyRolePickerGridEmits, GameLobbyRolePickerGridProps } from "~/components/pages/game-lobby/GameLobbyRolePicker/GameLobbyRolePickerGrid/game-lobby-role-picker-grid.types";
import GameLobbyRolePickerGridElement from "~/components/pages/game-lobby/GameLobbyRolePicker/GameLobbyRolePickerGrid/GameLobbyRolePickerGridElement/GameLobbyRolePickerGridElement.vue";
import type { Role } from "~/composables/api/role/types/role.class";
import { useRolesStore } from "~/stores/role/useRolesStore";

defineProps<GameLobbyRolePickerGridProps>();

const emit = defineEmits<GameLobbyRolePickerGridEmits>();

const rolesStore = useRolesStore();

const { roles } = storeToRefs(rolesStore);

const { t } = useI18n();

const sortedRoleBySideAndName = computed<Role[]>(() => {
  if (!roles.value) {
    return [];
  }
  return roles.value.toSorted((roleA, roleB) => {
    if (roleA.side === roleB.side) {
      const roleAName = t(`shared.role.name.${roleA.name}`);
      const roleBName = t(`shared.role.name.${roleB.name}`);

      return roleAName.localeCompare(roleBName);
    }
    return roleA.side === "werewolves" ? -1 : 1;
  });
});

function pickRole(role: Role): void {
  emit("pickRole", role);
}
</script>