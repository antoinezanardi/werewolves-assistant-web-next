<template>
  <div
    id="game-playground-player-card"
    class="m-3"
  >
    <PlayerCard
      id="player-card"
      :is-selected="isPlayerTargeted"
      :player-name="player.name"
      :player-role="player.role.current"
      @player-card-selector-click="handlePlayerCardSelectorClick"
    />

    <GamePlaygroundPlayerCardVoteInput
      v-if="currentPlayType === 'vote'"
      id="game-playground-player-card-vote-input"
      :player="player"
    />
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";

import type { GamePlaygroundPlayerCardProps } from "~/components/pages/game/GamePlaying/GamePlayground/GamePlaygroundContent/GamePlaygroundPlayerCard/game-playground-player-card.types";
import GamePlaygroundPlayerCardVoteInput from "~/components/pages/game/GamePlaying/GamePlayground/GamePlaygroundContent/GamePlaygroundPlayerCard/GamePlaygroundPlayerCardVoteInput/GamePlaygroundPlayerCardVoteInput.vue";
import PlayerCard from "~/components/shared/game/player/PlayerCard/PlayerCard.vue";
import { useGamePlay } from "~/composables/api/game/game-play/useGamePlay";
import type { GamePlay } from "~/composables/api/game/types/game-play/game-play.class";
import { useMakeGamePlayDtoStore } from "~/stores/game/make-game-play-dto/useMakeGamePlayDtoStore";
import { useGameStore } from "~/stores/game/useGameStore";

const props = defineProps<GamePlaygroundPlayerCardProps>();

const gameStore = useGameStore();
const { game } = storeToRefs(gameStore);

const makeGamePlayDtoStore = useMakeGamePlayDtoStore();
const { makeGamePlayDto } = storeToRefs(makeGamePlayDtoStore);
const { addMakeGamePlayTargetDto, removeMakeGamePlayTargetDto, removeFirstMakeGamePlayTargetDto } = makeGamePlayDtoStore;

const { currentPlayType } = useGamePlay(game);

const canPlayerBeTargeted = computed<boolean>(() => currentPlayType.value === "target");

const isPlayerTargeted = computed<boolean>(() => {
  if (!makeGamePlayDto.value.targets) {
    return false;
  }
  return makeGamePlayDto.value.targets.some(({ playerId }) => playerId === props.player._id);
});

function handlePlayerCardSelectorClick(): void {
  if (!canPlayerBeTargeted.value) {
    return;
  }
  const currentPlay = game.value.currentPlay as GamePlay;
  if (isPlayerTargeted.value) {
    removeMakeGamePlayTargetDto(props.player._id);

    return;
  }
  if (currentPlay.eligibleTargets?.boundaries && makeGamePlayDto.value.targets?.length === currentPlay.eligibleTargets.boundaries.max) {
    removeFirstMakeGamePlayTargetDto();
  }
  addMakeGamePlayTargetDto({ playerId: props.player._id });
}
</script>