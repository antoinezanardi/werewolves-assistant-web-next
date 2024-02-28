<template>
  <div
    class="flex flex-col game-lobby-player-card items-center mb-4 p-1"
    :data-testid="`game-lobby-player-card-${props.player.name}`"
  >
    <VuePrimeButton
      v-p-tooltip="$t('components.GameLobbyPlayerCard.removePlayer', { 'playerName': player.name })"
      :aria-label="$t('components.GameLobbyPlayerCard.removePlayer', { 'playerName': player.name })"
      class="mb-1 player-card-delete-button"
      icon="fa-minus fa fa-2x"
      raised
      severity="danger"
      size="small"
      type="button"
      @click.prevent="removePlayerFromCreateGameDto"
    />

    <PlayerCard
      :player-name="player.name"
      :player-role="player.role.name"
    />

    <small class="player-card-role text-truncate">
      {{ playerCardRoleText }}
    </small>
  </div>
</template>

<script setup lang="ts">
import type { GameLobbyPlayerCardProps } from "~/components/pages/game-lobby/GameLobbyPlayersParty/GameLobbyPlayerCard/game-lobby-player-card.types";
import PlayerCard from "~/components/shared/game/player/PlayerCard/PlayerCard.vue";
import { useRoleName } from "~/composables/api/role/useRoleName";
import { useCreateGameDtoStore } from "~/stores/game/create-game-dto/useCreateGameDtoStore";

const props = defineProps<GameLobbyPlayerCardProps>();

const { getRoleNameLabel } = useRoleName();

const { t } = useI18n();

const createGameDtoStore = useCreateGameDtoStore();

const playerCardRoleText = computed<string>(() => {
  if (props.player.role.name === undefined) {
    return t("components.GameLobbyPlayerCard.roleNotSelected");
  }
  return getRoleNameLabel(props.player.role.name);
});

function removePlayerFromCreateGameDto(): void {
  createGameDtoStore.removePlayerFromCreateGameDto(props.player.name);
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