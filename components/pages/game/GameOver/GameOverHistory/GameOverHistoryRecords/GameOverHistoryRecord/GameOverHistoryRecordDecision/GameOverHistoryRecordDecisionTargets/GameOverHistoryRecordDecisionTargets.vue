<template>
  <div
    id="game-over-history-record-decision-targets"
    class="flex gap-4 items-center justify-center"
  >
    <GameOverHistoryRecordDecisionTarget
      v-for="gameHistoryRecordPlayTarget in truncatedTargets"
      :key="gameHistoryRecordPlayTarget.player._id"
      class="game-over-history-record-target-player w-full"
      :target="gameHistoryRecordPlayTarget"
    />

    <OverflowTag
      id="target-players-overflow-tag"
      :entities-count="targets.length"
      :maximum-entities-displayed="maximumTargetsDisplayed"
    />
  </div>
</template>

<script setup lang="ts">
import type { GameOverHistoryRecordDecisionTargetsProps } from "~/components/pages/game/GameOver/GameOverHistory/GameOverHistoryRecords/GameOverHistoryRecord/GameOverHistoryRecordDecision/GameOverHistoryRecordDecisionTargets/game-over-history-record-decision-targets.types";
import GameOverHistoryRecordDecisionTarget from "~/components/pages/game/GameOver/GameOverHistory/GameOverHistoryRecords/GameOverHistoryRecord/GameOverHistoryRecordDecision/GameOverHistoryRecordDecisionTargets/GameOverHistoryRecordDecisionTarget/GameOverHistoryRecordDecisionTarget.vue";
import OverflowTag from "~/components/shared/misc/OverflowTag/OverflowTag.vue";
import type { GameHistoryRecordPlayTarget } from "~/composables/api/game/types/game-history-record/game-history-record-play/game-history-record-play-target/game-history-record-play-target.class";

const props = defineProps<GameOverHistoryRecordDecisionTargetsProps>();

const maximumTargetsDisplayed = 3;

const targets = computed<GameHistoryRecordPlayTarget[]>(() => props.gameHistoryRecord.play.targets ?? []);

const truncatedTargets = computed<GameHistoryRecordPlayTarget[]>(() => targets.value.slice(0, maximumTargetsDisplayed));
</script>