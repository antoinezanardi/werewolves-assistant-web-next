<template>
  <div
    id="game-playground-player-card"
    class="m-3"
  >
    <PlayerCard
      :player-name="player.name"
      :player-role="player.role.current"
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

import type { GamePlaygroundPlayerCardProps }
  from "~/components/pages/game/GamePlaying/GamePlayground/GamePlaygroundContent/GamePlaygroundPlayerCard/game-playground-player-card.types";
import GamePlaygroundPlayerCardVoteInput
  from "~/components/pages/game/GamePlaying/GamePlayground/GamePlaygroundContent/GamePlaygroundPlayerCard/GamePlaygroundPlayerCardVoteInput/GamePlaygroundPlayerCardVoteInput.vue";
import PlayerCard from "~/components/shared/game/player/PlayerCard/PlayerCard.vue";
import { useGamePlay } from "~/composables/api/game/game-play/useGamePlay";
import { useGameStore } from "~/stores/game/useGameStore";

defineProps<GamePlaygroundPlayerCardProps>();

const gameStore = useGameStore();
const { game } = storeToRefs(gameStore);

const { currentPlayType } = useGamePlay(game);
</script>