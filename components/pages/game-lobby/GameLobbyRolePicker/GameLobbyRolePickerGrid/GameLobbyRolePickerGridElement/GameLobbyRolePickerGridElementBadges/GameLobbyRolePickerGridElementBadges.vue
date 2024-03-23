<template>
  <div
    id="game-lobby-role-picker-grid-element-badges"
  >
    <VuePrimeBadge
      v-if="countInCreateGameDto"
      id="role-count-in-game-badge"
      v-p-tooltip="$t('components.GameLobbyRolePickerGridElementBadges.totalInParty')"
      class="-right-4 absolute top-1"
    >
      <i class="fa fa-chess-pawn me-2"/>

      <span>
        {{ countInCreateGameDto }}
      </span>
    </VuePrimeBadge>

    <VuePrimeBadge
      v-if="countInCreateGameDto && leftCountToReachMinInCreateGameDto"
      id="role-min-count-in-game-badge"
      v-p-tooltip="$t('components.GameLobbyRolePickerGridElementBadges.minInGameNotReached', { 'count': leftCountToReachMinInCreateGameDto })"
      class="-right-4 absolute top-8"
      severity="danger"
    >
      <i class="fa fa-exclamation-circle"/>
    </VuePrimeBadge>
  </div>
</template>

<script setup lang="ts">
import type { GameLobbyRolePickerGridElementBadgesProps } from "~/components/pages/game-lobby/GameLobbyRolePicker/GameLobbyRolePickerGrid/GameLobbyRolePickerGridElement/GameLobbyRolePickerGridElementBadges/game-lobby-role-picker-grid-element-badges.types";
import { useCreateGameDtoStore } from "~/stores/game/create-game-dto/useCreateGameDtoStore";

const props = defineProps<GameLobbyRolePickerGridElementBadgesProps>();

const createGameDtoStore = useCreateGameDtoStore();
const {
  getPlayersWithRoleNameInCreateGameDto,
  getRoleLeftCountToReachMinInCreateGameDto,
} = createGameDtoStore;

const countInCreateGameDto = computed<number>(() => {
  if (!props.role) {
    return 0;
  }
  return getPlayersWithRoleNameInCreateGameDto(props.role.name).length;
});

const leftCountToReachMinInCreateGameDto = computed<number>(() => {
  if (!props.role) {
    return 0;
  }
  return getRoleLeftCountToReachMinInCreateGameDto(props.role.name);
});
</script>