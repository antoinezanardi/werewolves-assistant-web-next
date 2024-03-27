<template>
  <div
    id="game-over"
    class="flex flex-col gap-6 h-full items-center justify-center"
  >
    <GameOverVictoryText/>

    <GameOverWinners
      v-if="!!winners"
      id="game-over-winners"
    />

    <VuePrimeDivider/>

    <GameOverActions/>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";

import GameOverActions from "~/components/pages/game/GameOver/GameOverActions/GameOverActions.vue";
import GameOverVictoryText from "~/components/pages/game/GameOver/GameOverVictoryText/GameOverVictoryText.vue";
import GameOverWinners from "~/components/pages/game/GameOver/GameOverWinners/GameOverWinners.vue";
import type { Player } from "~/composables/api/game/types/players/player.class";
import { useGameStore } from "~/stores/game/useGameStore";

const gameStore = useGameStore();
const { game } = storeToRefs(gameStore);

const { t } = useI18n();

useHead({ title: t("components.GameOver.gameOver") });

const winners = computed<Player[] | undefined>(() => game.value.victory?.winners);
</script>