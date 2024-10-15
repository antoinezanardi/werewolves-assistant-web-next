<template>
  <li class="inline-block text-center">
    <div class="p-2">
      <GlowElement>
        <RoleImage
          id="targeted-player-role-image"
          class="glow:border-gray-400 mx-auto"
          definition="normal"
          :role-name="target.player.role.current"
          :sizes="roleImageSizesInPx"
        />
      </GlowElement>

      <div
        id="targeted-player-name"
        class="truncate w-full"
      >
        {{ target.player.name }}
      </div>

      <PrimeVueTag
        v-if="isTagDisplayed"
        id="target-potion-tag"
        class="flex gap-2 items-center justify-center mt-1"
        :severity="tagSeverity"
      >
        <NuxtImg
          :alt="tagText"
          height="25"
          placeholder="/svg/misc/ripples.svg"
          placeholder-class="w-25 h-25"
          :src="tagIconPath"
          width="25"
        />

        <span id="target-potion-tag-text">
          {{ tagText }}
        </span>
      </PrimeVueTag>
    </div>
  </li>
</template>

<script setup lang="ts">
import { breakpointsTailwind, useBreakpoints } from "@vueuse/core";

import type { GameOverHistoryRecordDecisionTargetProps } from "~/components/pages/game/GameOver/GameOverHistory/GameOverHistoryRecords/GameOverHistoryRecord/GameOverHistoryRecordDecision/GameOverHistoryRecordDecisionTargets/GameOverHistoryRecordDecisionTarget/game-over-history-record-decision-target.types";
import RoleImage from "~/components/shared/role/RoleImage/RoleImage.vue";
import { BreakpointTypes } from "~/utils/enums/breakpoint.enums";

const props = defineProps<GameOverHistoryRecordDecisionTargetProps>();

const { t } = useI18n();

const breakpoints = useBreakpoints(breakpointsTailwind);
const isSmallerThanMd = breakpoints.smaller(BreakpointTypes.MD);

const roleImageSizesInPx = computed<string>(() => (isSmallerThanMd.value ? "56px" : "70px"));

const isTagDisplayed = computed<boolean>(() => !!props.target.drankPotion);

const tagText = computed<string>(() => {
  if (props.target.drankPotion === "life") {
    return t("components.GameOverHistoryRecordDecisionTarget.lifePotion");
  }
  return t("components.GameOverHistoryRecordDecisionTarget.deathPotion");
});

const tagIconPath = computed<string>(() => {
  if (props.target.drankPotion === "life") {
    return "/svg/game/player/player-attribute/drank-life-potion.svg";
  }
  return "/svg/game/player/player-attribute/drank-death-potion.svg";
});

const tagSeverity = computed<"danger" | "success">(() => {
  if (props.target.drankPotion === "life") {
    return "success";
  }
  return "danger";
});
</script>