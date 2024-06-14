<template>
  <GameEventWithTexts
    id="game-accursed-wolf-father-may-have-infected-event"
    :texts="gameAccursedWolfFatherMayHaveInfectedEventTexts"
  >
    <div class="flex h-full items-center justify-center">
      <GameEventFlippingLastPlayTargetsCard
        id="game-event-flipping-last-play-targets-card"
        :svg-icon-path="svgIconPath"
      />
    </div>
  </GameEventWithTexts>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import GameEventFlippingLastPlayTargetsCard from "~/components/shared/game/game-event/GameEventFlippingPlayerCard/GameEventFlippingLastPlayTargetsCard/GameEventFlippingLastPlayTargetsCard.vue";
import GameEventWithTexts from "~/components/shared/game/game-event/GameEventWithTexts/GameEventWithTexts.vue";
import { useGameLastHistoryRecord } from "~/composables/api/game/game-history-record/useGameLastHistoryRecord";
import { useAudioStore } from "~/stores/audio/useAudioStore";
import { useGameStore } from "~/stores/game/useGameStore";

const gameStore = useGameStore();
const { game } = storeToRefs(gameStore);

const audioStore = useAudioStore();
const { playSoundEffect } = audioStore;

const { lastTargetedPlayers } = useGameLastHistoryRecord(game);

const { t } = useI18n();

const hasAccursedWolfFatherInfectedAnyone = computed<boolean>(() => lastTargetedPlayers.value.length > 0);

const gameAccursedWolfFatherMayHaveInfectedEventTexts = computed<string[]>(() => [
  t("components.GameAccursedWolfFatherMayHaveInfectedEvent.accursedWolfFatherMayHaveInfectedAPlayer"),
  t("components.GameAccursedWolfFatherMayHaveInfectedEvent.gameMasterWillTapAccursedWolfFatherMarkVictim"),
]);

const svgIconPath = computed<string | undefined>(() => {
  if (!hasAccursedWolfFatherInfectedAnyone.value) {
    return undefined;
  }
  return "/svg/role/werewolf.svg";
});

playSoundEffect("evil-demonic-laugh");
</script>