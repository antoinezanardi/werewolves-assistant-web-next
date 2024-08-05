<template>
  <div
    id="game-lobby-role-picker-grid-element-badges"
  >
    <PrimeVueBadge
      v-if="countInGameAdditionalCardsCreateGameDto"
      id="role-count-in-additional-cards-badge"
      v-p-tooltip="$t('components.GameLobbyRolePickerGridElementBadges.totalInAdditionalCards')"
      class="-right-4 absolute top-1"
      data-testid="game-lobby-role-picker-role-count-in-additional-cards-badge"
      severity="warning"
    >
      <i class="fa fa-clover me-2"/>

      <span>
        {{ countInGameAdditionalCardsCreateGameDto }}
      </span>
    </PrimeVueBadge>

    <PrimeVueBadge
      v-if="countInCreateGameDto"
      id="role-count-in-game-badge"
      v-p-tooltip="$t('components.GameLobbyRolePickerGridElementBadges.totalInParty')"
      class="-right-4 absolute top-1"
      data-testid="game-lobby-role-picker-role-count-in-game-badge"
    >
      <i class="fa fa-chess-pawn me-2"/>

      <span>
        {{ countInCreateGameDto }}
      </span>
    </PrimeVueBadge>

    <PrimeVueBadge
      v-if="countInCreateGameDto && leftCountToReachMinInCreateGameDto"
      id="role-min-count-in-game-badge"
      v-p-tooltip="$t('components.GameLobbyRolePickerGridElementBadges.minInGameNotReached', { 'count': leftCountToReachMinInCreateGameDto })"
      class="-right-4 absolute top-8"
      data-testid="game-lobby-role-picker-role-min-count-in-game-badge"
      severity="danger"
    >
      <i class="fa fa-exclamation-circle"/>
    </PrimeVueBadge>
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
  getAdditionalCardsWithRoleNameInCreateGameDto,
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

const countInGameAdditionalCardsCreateGameDto = computed<number>(() => {
  if (!props.role) {
    return 0;
  }
  return getAdditionalCardsWithRoleNameInCreateGameDto(props.role.name).length;
});
</script>