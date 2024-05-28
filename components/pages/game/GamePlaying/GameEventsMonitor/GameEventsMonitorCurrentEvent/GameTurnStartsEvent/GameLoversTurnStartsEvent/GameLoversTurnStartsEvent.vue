<template>
  <GameEventWithTexts
    id="game-lovers-turn-starts-event"
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
import { useGameStore } from "~/stores/game/useGameStore";

const gameStore = useGameStore();
const { game } = storeToRefs(gameStore);

const { insertIf } = useArrays();

const { t } = useI18n();

const doLoversRevealEachOtherRoles = computed<boolean>(() => game.value.options.roles.cupid.lovers.doRevealRoleToEachOther);

const gameEventTexts = computed<string[]>(() => [
  t("components.GameLoversTurnStartsEvent.loversMeetEachOther"),
  t("components.GameLoversTurnStartsEvent.ifOneLoveDiesOtherDiesToo"),
  ...insertIf(doLoversRevealEachOtherRoles.value, t("components.GameLoversTurnStartsEvent.loversRevealEachOtherRoles")),
]);
</script>