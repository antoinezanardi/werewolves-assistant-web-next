<template>
  <div
    id="game-over-history-record-source"
    class="flex flex-col gap-4 item-center justify-center text-center"
  >
    <h4 id="game-over-history-record-source-name">
      {{ gameHistoryRecordPlaySourceNameLabel }}
    </h4>

    <div
      id="game-over-history-record-source-players"
      class="flex gap-4 items-center justify-center"
    >
      <div
        v-for="playerSource in shuffledTruncatedSourcePlayers"
        :key="playerSource._id"
        class="game-over-history-record-source-player grow"
      >
        <PlayerCard
          class="game-over-history-record-source-player-card"
          :player-name="playerSource.name"
          :player-role="playerSource.role.current"
        />
      </div>

      <OverflowTag
        id="source-player-overflow-tag"
        :entities-count="props.gameHistoryRecord.play.source.players.length"
        :maximum-entities-displayed="maximumSourcePlayersDisplayed"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { shuffle } from "radash";
import type { GameOverHistoryRecordSourceProps } from "~/components/pages/game/GameOver/GameOverHistory/GameOverHistoryRecords/GameOverHistoryRecord/GameOverHistoryRecordSource/game-over-history-record-source.types";
import PlayerCard from "~/components/shared/game/player/PlayerCard/PlayerCard.vue";
import OverflowTag from "~/components/shared/misc/OverflowTag/OverflowTag.vue";
import type { Player } from "~/composables/api/game/types/players/player.class";
import { useGameSourceName } from "~/composables/api/game/useGameSource";

const props = defineProps<GameOverHistoryRecordSourceProps>();

const { getDefiniteGameSourceNameLabel } = useGameSourceName();

const gameHistoryRecordPlaySourceNameLabel = computed<string>(() => {
  const { source } = props.gameHistoryRecord.play;

  return getDefiniteGameSourceNameLabel(source.name, source.players.length);
});

const maximumSourcePlayersDisplayed = 3;

const shuffledTruncatedSourcePlayers = computed<Player[]>(() => shuffle(props.gameHistoryRecord.play.source.players).slice(0, maximumSourcePlayersDisplayed));
</script>