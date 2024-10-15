<template>
  <div
    id="game-over-history-record-source"
    class="flex flex-col gap-4 item-center justify-center text-center"
  >
    <h4 id="game-over-history-record-source-name">
      {{ gameHistoryRecordPlaySourceNameLabel }}
    </h4>

    <PlayersHorizontalList
      id="game-over-history-record-source-horizontal-list"
      :players="props.gameHistoryRecord.play.source.players"
      :role-image-sizes="70"
    />
  </div>
</template>

<script setup lang="ts">
import type { GameOverHistoryRecordSourceProps } from "~/components/pages/game/GameOver/GameOverHistory/GameOverHistoryRecords/GameOverHistoryRecord/GameOverHistoryRecordSource/game-over-history-record-source.types";
import PlayersHorizontalList from "~/components/shared/game/player/PlayersHorizontalList/PlayersHorizontalList.vue";
import { useGameSourceName } from "~/composables/api/game/useGameSource";

const props = defineProps<GameOverHistoryRecordSourceProps>();

const { getDefiniteGameSourceNameLabel } = useGameSourceName();

const gameHistoryRecordPlaySourceNameLabel = computed<string>(() => {
  const { source } = props.gameHistoryRecord.play;

  return getDefiniteGameSourceNameLabel(source.name, source.players.length);
});
</script>