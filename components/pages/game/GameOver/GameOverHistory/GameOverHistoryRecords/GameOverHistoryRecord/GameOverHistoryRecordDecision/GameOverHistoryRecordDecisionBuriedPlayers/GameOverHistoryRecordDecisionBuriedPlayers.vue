<template>
  <div
    id="game-over-history-record-decision-buried-players"
    class="flex gap-4 items-center justify-center"
  >
    <GameOverHistoryRecordDecisionBuriedPlayer
      v-for="buriedPlayer in truncatedBuriedPlayers"
      :key="buriedPlayer._id"
      :buried-player="buriedPlayer"
      class="game-over-history-record-buried-player w-full"
      :game-history-record="props.gameHistoryRecord"
    />

    <OverflowTag
      id="buried-players-overflow-tag"
      :entities-count="buriedPlayers.length"
      :maximum-entities-displayed="maximumBuriedPlayersDisplayed"
    />
  </div>
</template>

<script setup lang="ts">
import type { GameOverHistoryRecordDecisionBuriedPlayersProps } from "~/components/pages/game/GameOver/GameOverHistory/GameOverHistoryRecords/GameOverHistoryRecord/GameOverHistoryRecordDecision/GameOverHistoryRecordDecisionBuriedPlayers/game-over-history-record-decision-buried-players.types";
import GameOverHistoryRecordDecisionBuriedPlayer from "~/components/pages/game/GameOver/GameOverHistory/GameOverHistoryRecords/GameOverHistoryRecord/GameOverHistoryRecordDecision/GameOverHistoryRecordDecisionBuriedPlayers/GameOverHistoryRecordDecisionBuriedPlayer/GameOverHistoryRecordDecisionBuriedPlayer.vue";
import OverflowTag from "~/components/shared/misc/OverflowTag/OverflowTag.vue";
import type { Player } from "~/composables/api/game/types/players/player.class";

const props = defineProps<GameOverHistoryRecordDecisionBuriedPlayersProps>();

const maximumBuriedPlayersDisplayed = 3;

const buriedPlayers = computed<Player[]>(() => {
  const { interactions } = props.gameHistoryRecord.play.source;
  const buryDeadBodiesInteraction = interactions?.find(({ type }) => type === "bury");

  return buryDeadBodiesInteraction?.eligibleTargets ?? [];
});

const truncatedBuriedPlayers = computed<Player[]>(() => buriedPlayers.value.slice(0, maximumBuriedPlayersDisplayed));
</script>