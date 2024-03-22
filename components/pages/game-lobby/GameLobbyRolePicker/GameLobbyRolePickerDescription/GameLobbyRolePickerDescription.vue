<template>
  <div
    id="game-lobby-role-picker-description"
    class="border-gray-600 border-r flex flex-col gap-2 items-center pe-4"
  >
    <RoleImage
      class="rounded-2xl"
      :role-name="pickedRole?.name"
      sizes="200px"
    />

    <div
      v-if="!pickedRole"
      id="no-picked-role-container"
      class="flex flex-col gap-4 items-center justify-center"
    >
      <h3>
        {{ $t("components.GameLobbyRolePickerDescription.pickARole") }}
      </h3>

      <i class="fa-3x fa-circle-chevron-right fas"/>
    </div>

    <GameLobbyRolePickerDescriptionContent
      v-else
      id="game-lobby-role-picker-description-content"
      :picked-role="pickedRole"
    />
  </div>
</template>

<script setup lang="ts">
import type { GameLobbyRolePickerDescriptionProps } from "~/components/pages/game-lobby/GameLobbyRolePicker/GameLobbyRolePickerDescription/game-lobby-role-picker-description.types";
import GameLobbyRolePickerDescriptionContent from "~/components/pages/game-lobby/GameLobbyRolePicker/GameLobbyRolePickerDescription/GameLobbyRolePickerDescriptionContent/GameLobbyRolePickerDescriptionContent.vue";
import RoleImage from "~/components/shared/role/RoleImage/RoleImage.vue";

defineProps<GameLobbyRolePickerDescriptionProps>();
</script>