<template>
  <div
    id="current-play-expected-players-to-act"
    class="w-full"
  >
    <PlayersHorizontalList
      id="player-horizontal-list"
      :players="expectedPlayersToAct"
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

const expectedPlayersToAct = computed<Player[]>(() => game.value.currentPlay?.source.players ?? []);
</script>