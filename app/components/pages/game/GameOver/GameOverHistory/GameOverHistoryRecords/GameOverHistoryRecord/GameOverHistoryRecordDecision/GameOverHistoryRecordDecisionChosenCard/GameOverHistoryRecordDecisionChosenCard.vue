<template>
  <GlowCapture
    id="game-over-history-record-decision-chosen-card"
    class="flex flex-col gap-4 items-center justify-center"
  >
    <h4
      id="game-over-history-record-decision-chosen-card-text"
      class="text-center"
    >
      {{ chosenCardText }}
    </h4>

    <GlowElement>
      <RoleImage
        id="game-over-history-record-decision-chosen-card-role-image"
        class="glow:border-gray-400"
        :role-name="props.gameHistoryRecord.play.chosenCard.roleName"
        :sizes="roleImageSizesInPx"
      />
    </GlowElement>
  </GlowCapture>
</template>

<script setup lang="ts">
import { breakpointsTailwind, useBreakpoints } from "@vueuse/core";

import type { GameOverHistoryRecordDecisionChosenCardProps } from "~/components/pages/game/GameOver/GameOverHistory/GameOverHistoryRecords/GameOverHistoryRecord/GameOverHistoryRecordDecision/GameOverHistoryRecordDecisionChosenCard/game-over-history-record-decision-chosen-card.types";
import RoleImage from "~/components/shared/role/RoleImage/RoleImage.vue";
import { useRoleName } from "~/composables/api/role/useRoleName.js";
import { BreakpointTypes } from "~/utils/enums/breakpoint.enums";

const props = defineProps<GameOverHistoryRecordDecisionChosenCardProps>();
const { getDefiniteRoleNameLabel } = useRoleName();

const breakpoints = useBreakpoints(breakpointsTailwind);
const isSmallerThanMd = breakpoints.smaller(BreakpointTypes.MD);

const chosenCardText = computed<string>(() => getDefiniteRoleNameLabel(props.gameHistoryRecord.play.chosenCard.roleName, 1));

const roleImageSizesInPx = computed<string>(() => (isSmallerThanMd.value ? "56px" : "70px"));
</script>