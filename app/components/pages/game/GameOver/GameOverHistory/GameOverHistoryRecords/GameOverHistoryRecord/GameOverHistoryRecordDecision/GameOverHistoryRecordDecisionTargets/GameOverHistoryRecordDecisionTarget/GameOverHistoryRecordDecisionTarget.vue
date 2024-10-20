<template>
  <li class="inline-block text-center">
    <div class="p-2">
      <RoleImage
        id="targeted-player-role-image"
        v-tilt
        class="mx-auto"
        definition="normal"
        :role-name="target.player.role.current"
        :sizes="roleImageSizesInPx"
      />

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
import { GAME_HISTORY_RECORD_ROLE_IMAGE_SIZE_BELOW_MD, GAME_HISTORY_RECORD_ROLE_IMAGE_SIZE_OVER_MD } from "~/components/pages/game/GameOver/GameOverHistory/GameOverHistoryRecords/GameOverHistoryRecord/game-over-history-record.constants";
import type { GameOverHistoryRecordDecisionTargetProps } from "~/components/pages/game/GameOver/GameOverHistory/GameOverHistoryRecords/GameOverHistoryRecord/GameOverHistoryRecordDecision/GameOverHistoryRecordDecisionTargets/GameOverHistoryRecordDecisionTarget/game-over-history-record-decision-target.types";
import RoleImage from "~/components/shared/role/RoleImage/RoleImage.vue";
import { useAppBreakpoints } from "~/composables/style/useAppBreakpoints";

const props = defineProps<GameOverHistoryRecordDecisionTargetProps>();

const { t } = useI18n();

const { isSmallerThanMdBreakpoint } = useAppBreakpoints();

const roleImageSizesInPx = computed<string>(() => {
  if (isSmallerThanMdBreakpoint.value) {
    return `${GAME_HISTORY_RECORD_ROLE_IMAGE_SIZE_BELOW_MD}px`;
  }
  return `${GAME_HISTORY_RECORD_ROLE_IMAGE_SIZE_OVER_MD}px`;
});

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