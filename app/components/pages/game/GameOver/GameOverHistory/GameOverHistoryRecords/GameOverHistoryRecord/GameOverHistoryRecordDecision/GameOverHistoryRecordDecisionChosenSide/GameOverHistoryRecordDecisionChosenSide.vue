<template>
  <div
    id="game-over-history-record-decision-chosen-side"
    class="flex flex-col gap-4 items-center justify-center"
  >
    <h4 id="game-over-history-record-decision-chosen-side-text">
      {{ chosenSideText }}
    </h4>

    <NuxtImg
      :alt="$t(`components.GameTeamSide.sideAltText.${props.gameHistoryRecord.play.chosenSide}`)"
      height="75"
      placeholder="/svg/misc/infinite-spinner.svg"
      :src="chosenSideSvgIconPath"
      width="75"
    />
  </div>
</template>

<script setup lang="ts">
import type { GameOverHistoryRecordDecisionChosenSideProps } from "~/components/pages/game/GameOver/GameOverHistory/GameOverHistoryRecords/GameOverHistoryRecord/GameOverHistoryRecordDecision/GameOverHistoryRecordDecisionChosenSide/game-over-history-record-decision-chosen-side.types";

const props = defineProps<GameOverHistoryRecordDecisionChosenSideProps>();

const { t } = useI18n();

const chosenSideSvgIconPath = computed<string>(() => {
  if (props.gameHistoryRecord.play.chosenSide === "villagers") {
    return "/svg/role/villager.svg";
  }
  return "/svg/role/werewolf.svg";
});

const chosenSideText = computed<string>(() => t(`shared.role.definiteSide.${props.gameHistoryRecord.play.chosenSide}`));
</script>