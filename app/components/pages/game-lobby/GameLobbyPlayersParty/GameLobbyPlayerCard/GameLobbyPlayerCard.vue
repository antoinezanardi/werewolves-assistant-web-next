<template>
  <div
    class="flex flex-col game-lobby-player-card items-center mb-4 p-1"
    :data-testid="`game-lobby-player-card-${props.player.name}`"
  >
    <PrimeVueButton
      v-p-tooltip="$t('components.GameLobbyPlayerCard.removePlayer', { 'playerName': player.name })"
      :aria-label="$t('components.GameLobbyPlayerCard.removePlayer', { 'playerName': player.name })"
      class="mb-1 player-card-delete-button"
      icon="fa-minus fa fa-2x"
      raised
      severity="danger"
      size="small"
      type="button"
      @click.prevent="onClickFromRemovePlayerButton"
    />

    <PlayerCard
      class="player-card"
      :player-name="player.name"
      :player-role="player.role.name"
      @player-card-selector-click="onPlayerCardSelectorClickFromPlayerCard"
    />

    <small class="player-card-role truncate">
      {{ playerCardRoleText }}
    </small>
  </div>
</template>

<script setup lang="ts">
import type { GameLobbyPlayerCardEmits, GameLobbyPlayerCardProps } from "~/components/pages/game-lobby/GameLobbyPlayersParty/GameLobbyPlayerCard/game-lobby-player-card.types";
import PlayerCard from "~/components/shared/game/player/PlayerCard/PlayerCard.vue";
import { useRoleName } from "~/composables/api/role/useRoleName";
import { useCreateGameDtoStore } from "~/stores/game/create-game-dto/useCreateGameDtoStore";

const props = defineProps<GameLobbyPlayerCardProps>();

const emit = defineEmits<GameLobbyPlayerCardEmits>();

const { getRoleNameLabel } = useRoleName();

const { t } = useI18n();

const createGameDtoStore = useCreateGameDtoStore();

const playerCardRoleText = computed<string>(() => {
  if (props.player.role.name === undefined) {
    return t("components.GameLobbyPlayerCard.roleNotSelected");
  }
  return getRoleNameLabel(props.player.role.name);
});

function onClickFromRemovePlayerButton(): void {
  createGameDtoStore.removePlayerFromCreateGameDto(props.player.name);
}

function onPlayerCardSelectorClickFromPlayerCard(): void {
  emit("pickRoleForPlayer", props.player);
}
</script>

<style lang="scss" scoped>
  .game-lobby-player-card {
    .player-card-delete-button {
      max-height: 10px;
      width: 10px;
      font-size: .5rem;
    }
  }
</style>