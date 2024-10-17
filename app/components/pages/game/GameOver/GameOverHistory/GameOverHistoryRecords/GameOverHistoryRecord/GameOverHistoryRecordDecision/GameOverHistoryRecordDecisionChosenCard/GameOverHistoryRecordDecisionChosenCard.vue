<template>
  <GlowCapture
    id="game-over-history-record-decision-chosen-card"
    class="flex flex-col gap-4 items-center justify-center"
  >
    <h4
      v-if="chosenCardText"
      id="game-over-history-record-decision-chosen-card-text"
      class="text-center"
    >
      {{ chosenCardText }}
    </h4>

    <GlowElement>
      <RoleImage
        v-if="props.gameHistoryRecord.play.chosenCard"
        id="game-over-history-record-decision-chosen-card-role-image"
        class="glow:border-gray-400"
        :role-name="props.gameHistoryRecord.play.chosenCard.roleName"
        :sizes="roleImageSizesInPx"
      />
    </GlowElement>
  </GlowCapture>
</template>

<script setup lang="ts">
import { GAME_HISTORY_RECORD_ROLE_IMAGE_SIZE_BELOW_MD, GAME_HISTORY_RECORD_ROLE_IMAGE_SIZE_OVER_MD } from "~/components/pages/game/GameOver/GameOverHistory/GameOverHistoryRecords/GameOverHistoryRecord/game-over-history-record.constants";
import type { GameOverHistoryRecordDecisionChosenCardProps } from "~/components/pages/game/GameOver/GameOverHistory/GameOverHistoryRecords/GameOverHistoryRecord/GameOverHistoryRecordDecision/GameOverHistoryRecordDecisionChosenCard/game-over-history-record-decision-chosen-card.types";
import RoleImage from "~/components/shared/role/RoleImage/RoleImage.vue";
import { useRoleName } from "~/composables/api/role/useRoleName.js";
import { useAppBreakpoints } from "~/composables/style/useAppBreakpoints";

const props = defineProps<GameOverHistoryRecordDecisionChosenCardProps>();
const { getDefiniteRoleNameLabel } = useRoleName();

const { isSmallerThanMdBreakpoint } = useAppBreakpoints();

const chosenCardText = computed<string>(() => {
  if (!props.gameHistoryRecord.play.chosenCard) {
    return "";
  }
  return getDefiniteRoleNameLabel(props.gameHistoryRecord.play.chosenCard.roleName, 1);
});

const roleImageSizesInPx = computed<string>(() => {
  if (isSmallerThanMdBreakpoint.value) {
    return `${GAME_HISTORY_RECORD_ROLE_IMAGE_SIZE_BELOW_MD}px`;
  }
  return `${GAME_HISTORY_RECORD_ROLE_IMAGE_SIZE_OVER_MD}px`;
});
</script>