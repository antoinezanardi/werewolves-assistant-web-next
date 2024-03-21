<template>
  <button
    class="border-4 border-gray-600 flex game-lobby-role-picker-grid-element rounded-lg"
    :class="{ '!border-gray-100': false }"
    type="button"
    @click.prevent="pickRole"
  >
    <RoleImage
      class="game-lobby-role-picker-grid-element-role-image"
      definition="normal"
      :role-name="role.name"
      sizes="100px"
    />
  </button>
</template>

<script setup lang="ts">
import type { GameLobbyRolePickerGridElementEmits, GameLobbyRolePickerGridElementProps } from "~/components/pages/game-lobby/GameLobbyRolePicker/GameLobbyRolePickerGrid/GameLobbyRolePickerGridElement/game-lobby-role-picker-grid-element.types";
import RoleImage from "~/components/shared/role/RoleImage/RoleImage.vue";

const props = defineProps<GameLobbyRolePickerGridElementProps>();

const emit = defineEmits<GameLobbyRolePickerGridElementEmits>();

function pickRole(): void {
  emit("pickRole", props.role);
}
</script>