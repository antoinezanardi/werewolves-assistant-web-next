<template>
  <div
    id="game-over-winners"
    class="w-full"
  >
    <PlayersHorizontalList
      v-if="!!winners"
      id="players-horizontal-list"
      data-testid="game-over-winners"
      :players="winners"
    />
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";

import PlayersHorizontalList from "~/components/shared/game/player/PlayersHorizontalList/PlayersHorizontalList.vue";
import type { Player } from "~/composables/api/game/types/players/player.class";
import { useGameStore } from "~/stores/game/useGameStore";

const gameStore = useGameStore();
const { game } = storeToRefs(gameStore);

const winners = computed<Player[] | undefined>(() => game.value.victory?.winners);
</script>