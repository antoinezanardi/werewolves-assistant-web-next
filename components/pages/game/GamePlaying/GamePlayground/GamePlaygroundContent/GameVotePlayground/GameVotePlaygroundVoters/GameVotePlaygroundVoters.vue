<template>
  <div id="game-vote-playground-voters">
    <div
      v-if="!voters.length"
      id="no-voters"
      class="flex flex-col h-full items-center justify-center"
    >
      <i class="fa fa-3x fa-comment-slash mb-4 text-error"/>

      <h2>
        {{ $t('components.GameVotePlaygroundVoters.nobodyCanVote') }}
      </h2>
    </div>

    <div
      v-else
      id="voters"
      class="flex flex-wrap h-full items-center justify-center"
    >
      <GamePlaygroundPlayerCard
        v-for="voter in voters"
        :key="voter._id"
        class="p-3 voter w-1/3"
        :player="voter"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { shuffle } from "radash";

import GamePlaygroundPlayerCard from "~/components/pages/game/GamePlaying/GamePlayground/GamePlaygroundContent/GamePlaygroundPlayerCard/GamePlaygroundPlayerCard.vue";
import type { Player } from "~/composables/api/game/types/players/player.class";
import { useGameStore } from "~/stores/game/useGameStore";

const gameStore = useGameStore();
const { game } = storeToRefs(gameStore);

const voters = computed<Player[]>(() => {
  if (game.value.currentPlay?.source.players === undefined || game.value.currentPlay.source.players.length === 0) {
    return [];
  }
  return shuffle(game.value.currentPlay.source.players);
});
</script>