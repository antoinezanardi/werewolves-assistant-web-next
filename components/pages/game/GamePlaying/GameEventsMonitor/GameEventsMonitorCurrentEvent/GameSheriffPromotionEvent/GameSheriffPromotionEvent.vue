<template>
  <GameEventWithTexts
    id="game-sheriff-promotion-event"
    :texts="gameSheriffHasBeenElectedEventTexts"
  >
    <div class="flex h-full items-center justify-center">
      <GameEventFlippingPlayerCard
        v-if="sheriffInPlayers"
        id="game-event-flipping-sheriff-card"
        :players="[sheriffInPlayers]"
        svg-icon-path="svg/game/player/player-attribute/sheriff.svg"
      />
    </div>
  </GameEventWithTexts>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import GameEventFlippingPlayerCard from "~/components/shared/game/game-event/GameEventFlippingPlayerCard/GameEventFlippingPlayerCard.vue";
import GameEventWithTexts from "~/components/shared/game/game-event/GameEventWithTexts/GameEventWithTexts.vue";
import { useGamePlayers } from "~/composables/api/game/useGamePlayers";
import { useGameStore } from "~/stores/game/useGameStore";

const gameStore = useGameStore();
const { game } = storeToRefs(gameStore);
const { sheriffInPlayers } = useGamePlayers(game);

const { t } = useI18n();

const isLastGamePlayActionSheriffDelegates = computed<boolean>(() => game.value.lastGameHistoryRecord?.play.action === "delegate");

const gameSheriffHasBeenElectedEventTexts = computed<string[]>(() => {
  if (!sheriffInPlayers.value) {
    return [t("components.GameSheriffHasBeenElectedEvent.cantFindElectedSheriff")];
  }
  const sheriffPromotionTKey = isLastGamePlayActionSheriffDelegates.value ? "sheriffHasBeenElectedByDelegation" : "sheriffHasBeenElectedBySurvivors";

  return [
    t(`components.GameSheriffHasBeenElectedEvent.${sheriffPromotionTKey}`, { playerName: sheriffInPlayers.value.name }),
    t("components.GameSheriffHasBeenElectedEvent.sheriffCanMakeSpeech"),
  ];
});
</script>