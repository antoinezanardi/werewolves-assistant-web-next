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

    <GameOverActions
      id="game-over-actions"
      @show-game-history="showGameHistory"
    />

    <GameOverHistory ref="gameOverHistory"/>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";

import GameOverActions from "~/components/pages/game/GameOver/GameOverActions/GameOverActions.vue";
import type { GameOverHistoryExposed } from "~/components/pages/game/GameOver/GameOverHistory/game-over-history.types";
import GameOverHistory from "~/components/pages/game/GameOver/GameOverHistory/GameOverHistory.vue";
import GameOverVictoryText from "~/components/pages/game/GameOver/GameOverVictoryText/GameOverVictoryText.vue";
import GameOverWinners from "~/components/pages/game/GameOver/GameOverWinners/GameOverWinners.vue";
import type { GameVictoryType } from "~/composables/api/game/types/game-victory/game-victory.types";
import type { Player } from "~/composables/api/game/types/players/player.class";
import type { SoundEffectName } from "~/stores/audio/types/audio.types";
import { useAudioStore } from "~/stores/audio/useAudioStore";
import { useGameHistoryRecordsStore } from "~/stores/game/game-history-record/useGameHistoryRecordsStore";
import { useGameStore } from "~/stores/game/useGameStore";

const gameStore = useGameStore();
const { game } = storeToRefs(gameStore);

const gameHistoryRecordsStore = useGameHistoryRecordsStore();
const { fetchAndSetGameHistoryRecords } = gameHistoryRecordsStore;

const audioStore = useAudioStore();

const { t } = useI18n();

const victoryTypesSoundEffectName: Record<GameVictoryType, SoundEffectName> = {
  "angel": "angelic-intervention",
  "lovers": "heartbeat",
  "none": "death",
  "pied-piper": "flute-and-drums",
  "prejudiced-manipulator": "possessed-laugh",
  "villagers": "crowd-cheering",
  "werewolves": "werewolf-howling",
  "white-werewolf": "werewolf-transformation",
};

useHead({ title: t("components.GameOver.gameOver") });

const gameOverHistory = ref<GameOverHistoryExposed | null>(null);

const winners = computed<Player[] | undefined>(() => game.value.victory?.winners);

function showGameHistory(): void {
  if (!gameOverHistory.value) {
    throw createError("Game Over History is not defined");
  }
  gameOverHistory.value.showGameHistory();
}

function playVictorySoundEffect(): void {
  const soundEffectName = victoryTypesSoundEffectName[game.value.victory?.type ?? "none"];
  audioStore.playSoundEffect(soundEffectName);
}

void fetchAndSetGameHistoryRecords(game.value._id);
playVictorySoundEffect();
</script>