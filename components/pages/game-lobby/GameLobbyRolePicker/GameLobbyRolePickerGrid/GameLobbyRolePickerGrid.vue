<template>
  <div
    id="game-lobby-role-picker-grid"
    class="gap-4 grid grid-cols-5"
  >
    <GameLobbyRolePickerGridElement
      class="available-role"
      @pick-role="pickRole"
    />

    <GameLobbyRolePickerGridElement
      v-for="role in roles"
      :key="role.name"
      class="available-role"
      :is-picked="pickedRole?.name === role.name"
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

function pickRole(role: Role): void {
  emit("pickRole", role);
}
</script>