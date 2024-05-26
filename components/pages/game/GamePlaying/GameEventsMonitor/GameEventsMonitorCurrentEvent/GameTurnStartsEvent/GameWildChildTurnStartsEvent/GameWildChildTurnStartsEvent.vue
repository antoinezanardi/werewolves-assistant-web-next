<template>
  <GameEventWithTexts
    id="game-wild-child-turn-starts-event"
    :texts="gameEventTexts"
  >
    <GameEventFlippingPlaySourcePlayersCard/>
  </GameEventWithTexts>
</template>

<script setup lang="ts">
import GameEventFlippingPlaySourcePlayersCard from "~/components/shared/game/game-event/GameEventFlippingPlayerCard/GameEventFlippingPlaySourcePlayersCard/GameEventFlippingPlaySourcePlayersCard.vue";
import GameEventWithTexts from "~/components/shared/game/game-event/GameEventWithTexts/GameEventWithTexts.vue";

const { t } = useI18n();

const gameEventTexts = computed<string[]>(() => [
  t("components.GameWildChildTurnStartsEvent.wildChildChoosesModel"),
  t("components.GameWildChildTurnStartsEvent.ifModelDiesWildChildBecomesWolf"),
]);
</script>