<template>
  <div
    id="game-over-history-record-action"
    class="flex flex-col gap-2 items-center justify-center"
  >
    <h4
      id="game-over-history-record-action-text"
      class="!font-bold !text-lg italic text-center"
    >
      {{ gameHistoryRecordActionText }}
    </h4>

    <NuxtImg
      :alt="$t('components.GameOverHistoryRecordAction.actionIconAltText')"
      class="hidden md:block"
      height="40"
      placeholder="/svg/misc/ripples.svg"
      placeholder-class="w-40 h-40"
      :src="gameHistoryRecordActionTextIcon"
      width="40"
    />
  </div>
</template>

<script setup lang="ts">
import { GAME_HISTORY_RECORD_PLAYS_TEXT } from "~/components/pages/game/GameOver/GameOverHistory/GameOverHistoryRecords/GameOverHistoryRecord/GameOverHistoryRecordAction/game-over-history-record-action.constants";
import type { GameOverHistoryRecordActionProps } from "~/components/pages/game/GameOver/GameOverHistory/GameOverHistoryRecords/GameOverHistoryRecord/GameOverHistoryRecordAction/game-over-history-record-action.types";
import { useGameHistoryRecord } from "~/composables/api/game/game-history-record/useGameHistoryRecord";

const props = defineProps<GameOverHistoryRecordActionProps>();

const { t } = useI18n();

const { didSourceSkipped } = useGameHistoryRecord();

const gameHistoryRecordActionText = computed<string>(() => {
  if (didSourceSkipped(props.gameHistoryRecord)) {
    return t("components.GameOverHistoryRecordAction.skippedTurn");
  }
  const textKey = GAME_HISTORY_RECORD_PLAYS_TEXT[props.gameHistoryRecord.play.source.name][props.gameHistoryRecord.play.action]?.textKey;
  if (textKey === undefined) {
    return t("components.GameOverHistoryRecordAction.unknownGamePlay");
  }
  return t(textKey);
});

const gameHistoryRecordActionTextIcon = computed<string>(() => {
  const { action } = props.gameHistoryRecord.play;
  if (didSourceSkipped(props.gameHistoryRecord)) {
    return "/svg/game/player/player-attribute/powerless.svg";
  }
  if (action === "request-another-vote") {
    return "/svg/misc/exclamation-mark.svg";
  }
  if (action === "meet-each-other") {
    return "/svg/misc/people.svg";
  }
  return "/svg/misc/arrow-right.svg";
});
</script>