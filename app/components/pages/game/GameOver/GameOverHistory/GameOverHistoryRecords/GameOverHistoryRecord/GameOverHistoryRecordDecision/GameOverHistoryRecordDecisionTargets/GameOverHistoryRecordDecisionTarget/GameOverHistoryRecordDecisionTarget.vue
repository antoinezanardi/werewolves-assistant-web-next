<template>
  <div class="flex flex-col gap-2 items-center justify-center">
    <PlayerCard
      class="game-over-history-record-decision-target-player-card"
      :player-name="target.player.name"
      :player-role="target.player.role.current"
    />

    <PrimeVueTag
      v-if="isTagDisplayed"
      id="target-potion-tag"
      class="flex gap-2 items-center justify-center"
      :severity="tagSeverity"
    >
      <NuxtImg
        :alt="tagText"
        height="25"
        :src="tagIconPath"
        width="25"
      />

      <span id="target-potion-tag-text">
        {{ tagText }}
      </span>
    </PrimeVueTag>
  </div>
</template>

<script setup lang="ts">
import type { GameOverHistoryRecordDecisionTargetProps } from "~/components/pages/game/GameOver/GameOverHistory/GameOverHistoryRecords/GameOverHistoryRecord/GameOverHistoryRecordDecision/GameOverHistoryRecordDecisionTargets/GameOverHistoryRecordDecisionTarget/game-over-history-record-decision-target.types";
import PlayerCard from "~/components/shared/game/player/PlayerCard/PlayerCard.vue";

const props = defineProps<GameOverHistoryRecordDecisionTargetProps>();

const { t } = useI18n();

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