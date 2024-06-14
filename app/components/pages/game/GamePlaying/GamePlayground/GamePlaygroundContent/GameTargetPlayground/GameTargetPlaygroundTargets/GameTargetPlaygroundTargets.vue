<template>
  <div id="game-target-playground-targets">
    <div
      v-if="!targets?.length"
      id="no-targets"
      class="flex flex-col h-full items-center justify-center"
    >
      <i class="fa fa-3x fa-users-slash mb-4 text-error"/>

      <h2 class="text-gray-300">
        {{ $t('components.GameTargetPlaygroundTargets.nobodyCanBeTargeted') }}
      </h2>
    </div>

    <div
      v-else
      id="targets"
      class="flex flex-wrap h-full items-center justify-center"
    >
      <GamePlaygroundPlayerCard
        v-for="target in targets"
        :key="target._id"
        class="p-3 target w-3/12"
        :interaction="game.currentPlay?.source.interactions?.[0].type"
        :player="target"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";

import GamePlaygroundPlayerCard from "~/components/pages/game/GamePlaying/GamePlayground/GamePlaygroundContent/GamePlaygroundPlayerCard/GamePlaygroundPlayerCard.vue";
import type { Player } from "~/composables/api/game/types/players/player.class";
import { useGameStore } from "~/stores/game/useGameStore";

const gameStore = useGameStore();
const { game } = storeToRefs(gameStore);

const targets = computed<Player[] | undefined>(() => game.value.currentPlay?.source.interactions?.[0]?.eligibleTargets);
</script>