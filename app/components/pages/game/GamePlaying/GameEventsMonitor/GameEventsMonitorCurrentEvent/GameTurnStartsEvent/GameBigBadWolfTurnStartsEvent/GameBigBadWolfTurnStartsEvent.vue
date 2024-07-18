<template>
  <GameEventWithTexts
    id="game-big-bad-wolf-turn-starts-event"
    :texts="gameEventTexts"
  >
    <GameEventFlippingPlaySourcePlayersCard/>
  </GameEventWithTexts>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import GameEventFlippingPlaySourcePlayersCard from "~/components/shared/game/game-event/GameEventFlippingPlayerCard/GameEventFlippingPlaySourcePlayersCard/GameEventFlippingPlaySourcePlayersCard.vue";
import GameEventWithTexts from "~/components/shared/game/game-event/GameEventWithTexts/GameEventWithTexts.vue";
import { useArrays } from "~/composables/misc/useArrays";
import { useAudioStore } from "~/stores/audio/useAudioStore";
import { useGameStore } from "~/stores/game/useGameStore";

const gameStore = useGameStore();
const { game } = storeToRefs(gameStore);

const audioStore = useAudioStore();
const { playSoundEffect } = audioStore;

const { t } = useI18n();

const { insertIf } = useArrays();

const canWerewolvesEatEachOther = computed<boolean>(() => game.value.options.roles.werewolf.canEatEachOther);

const gameEventTexts = computed<string[]>(() => [
  t("components.GameBigBadWolfTurnStartsEvent.bigBadWolfEatsVillager"),
  ...insertIf(canWerewolvesEatEachOther.value, t("components.GameBigBadWolfTurnStartsEvent.bigBadWolfCanEatWerewolves")),
]);

playSoundEffect("werewolf-growling-2");
</script>