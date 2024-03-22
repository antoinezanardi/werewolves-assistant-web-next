<template>
  <div
    id="game-lobby-role-picker-grid-element"
    class="flex flex-col items-center"
  >
    <button
      id="game-lobby-role-picker-grid-element-button"
      class="border-4 border-gray-600 hover:border-gray-400 rounded-lg"
      :class="{ '!border-gray-100': isPicked }"
      type="button"
      @click.prevent="pickRole"
    >
      <RoleImage
        id="game-lobby-role-picker-grid-element-role-image"
        definition="normal"
        :role-name="role.name"
        sizes="100px"
      />
    </button>

    <div
      id="game-lobby-role-picker-grid-element-role-name"
      class="cursor-pointer text-center"
      @click="pickRole"
    >
      {{ getRoleNameLabel(role.name) }}
    </div>
  </div>
</template>

<script setup lang="ts">
import type { GameLobbyRolePickerGridElementEmits, GameLobbyRolePickerGridElementProps } from "~/components/pages/game-lobby/GameLobbyRolePicker/GameLobbyRolePickerGrid/GameLobbyRolePickerGridElement/game-lobby-role-picker-grid-element.types";
import RoleImage from "~/components/shared/role/RoleImage/RoleImage.vue";
import { useRoleName } from "~/composables/api/role/useRoleName";

const props = defineProps<GameLobbyRolePickerGridElementProps>();

const emit = defineEmits<GameLobbyRolePickerGridElementEmits>();

const { getRoleNameLabel } = useRoleName();

function pickRole(): void {
  emit("pickRole", props.role);
}
</script>

<style lang="scss" scoped>
#game-lobby-role-picker-grid-element {
  transition: border-color 0.2s ease;
}
</style>