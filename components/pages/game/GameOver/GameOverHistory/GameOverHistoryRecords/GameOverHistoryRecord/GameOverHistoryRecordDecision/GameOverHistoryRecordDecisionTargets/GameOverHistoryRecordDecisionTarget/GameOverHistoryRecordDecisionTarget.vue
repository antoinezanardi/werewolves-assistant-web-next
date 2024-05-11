<template>
  <div class="flex flex-col gap-2 items-center justify-center">
    <PlayerCard
      class="game-over-history-record-decision-target-player-card"
      :player-name="target.player.name"
      :player-role="target.player.role.current"
    />

    <VuePrimeTag
      v-if="isTagDisplayed"
      id="target-potion-tag"
    >
      coucou
    </VuePrimeTag>
  </div>
</template>

<script setup lang="ts">
import type { GameOverHistoryRecordDecisionTargetProps } from "~/components/pages/game/GameOver/GameOverHistory/GameOverHistoryRecords/GameOverHistoryRecord/GameOverHistoryRecordDecision/GameOverHistoryRecordDecisionTargets/GameOverHistoryRecordDecisionTarget/game-over-history-record-decision-target.types";
import PlayerCard from "~/components/shared/game/player/PlayerCard/PlayerCard.vue";

const props = defineProps<GameOverHistoryRecordDecisionTargetProps>();

const isTagDisplayed = computed<boolean>(() => !!props.target.drankPotion);
</script>