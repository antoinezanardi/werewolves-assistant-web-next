<template>
  <div
    id="game-over-history-record-decision-targets"
    class="flex flex-col gap-4 items-center justify-center"
  >
    <h4
      v-if="targetRoleNameLabel"
      id="game-over-history-record-target-role-name"
      class="text-center"
    >
      {{ targetRoleNameLabel }}
    </h4>

    <ul class="mx-auto overflow-x-auto scrollbar-thin text-center w-full whitespace-nowrap">
      <GameOverHistoryRecordDecisionTarget
        v-for="gameHistoryRecordPlayTarget in targets"
        :key="gameHistoryRecordPlayTarget.player._id"
        class="game-over-history-record-target-player inline-block"
        :target="gameHistoryRecordPlayTarget"
      />
    </ul>
  </div>
</template>

<script setup lang="ts">
import type { GameOverHistoryRecordDecisionTargetsProps } from "~/components/pages/game/GameOver/GameOverHistory/GameOverHistoryRecords/GameOverHistoryRecord/GameOverHistoryRecordDecision/GameOverHistoryRecordDecisionTargets/game-over-history-record-decision-targets.types";
import GameOverHistoryRecordDecisionTarget from "~/components/pages/game/GameOver/GameOverHistory/GameOverHistoryRecords/GameOverHistoryRecord/GameOverHistoryRecordDecision/GameOverHistoryRecordDecisionTargets/GameOverHistoryRecordDecisionTarget/GameOverHistoryRecordDecisionTarget.vue";
import type { GameHistoryRecordPlayTarget } from "~/composables/api/game/types/game-history-record/game-history-record-play/game-history-record-play-target/game-history-record-play-target.class";
import { useRoleName } from "~/composables/api/role/useRoleName";

const props = defineProps<GameOverHistoryRecordDecisionTargetsProps>();

const { getDefiniteRoleNameLabel } = useRoleName();

const targets = computed<GameHistoryRecordPlayTarget[]>(() => props.gameHistoryRecord.play.targets ?? []);

const isTargetAlone = computed<boolean>(() => targets.value.length === 1);

const targetRoleNameLabel = computed<string>(() => {
  if (!isTargetAlone.value) {
    return "";
  }
  const target = targets.value[0].player;

  return getDefiniteRoleNameLabel(target.role.current, 1);
});
</script>