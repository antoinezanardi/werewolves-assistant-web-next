<template>
  <div
    id="game-lobby-role-picker-header"
    class="flex items-center justify-center w-full"
  >
    <div
      id="current-player-role"
      class="border-2 border-gray-600 me-2 px-2 py-1 rounded-lg self-start text-center"
    >
      <span
        id="current-role-title"
        class="italic text-gray-400 text-sm"
      >
        {{ t("components.GameLobbyRolePickerHeader.currentRole") }}
      </span>

      <RoleImage
        class="mx-auto"
        definition="small"
        :role-name="player.role.name"
        sizes="35px"
      />

      <span id="current-role-text">
        {{ currentRoleText }}
      </span>
    </div>

    <h3 id="role-picker-header-title">
      {{ title }}
    </h3>
  </div>
</template>

<script setup lang="ts">
import type { GameLobbyRolePickerHeaderProps } from "~/components/pages/game-lobby/GameLobbyRolePicker/GameLobbyRolePickerHeader/game-lobby-role-picker-header.types";
import RoleImage from "~/components/shared/role/RoleImage/RoleImage.vue";
import { useRoleName } from "~/composables/api/role/useRoleName";

const props = defineProps<GameLobbyRolePickerHeaderProps>();

const { getRoleNameLabel } = useRoleName();

const { t } = useI18n();

const title = computed<string>(() => t("components.GameLobbyRolePickerHeader.pickRoleForPlayer", { playerName: props.player.name }));

const currentRoleText = computed<string>(() => {
  if (!props.player.role.name) {
    return t("components.GameLobbyRolePickerHeader.noRole");
  }
  return getRoleNameLabel(props.player.role.name);
});
</script>