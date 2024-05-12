<template>
  <div
    id="game-over-history-record-decision-nominated-players"
    class="flex gap-4 items-center justify-center"
  >
    <div
      v-for="nominatedPlayer in truncatedNominatedPlayers"
      :key="nominatedPlayer._id"
      class="game-over-history-record-source-player w-full"
    >
      <PlayerCard
        class="game-over-history-record-decision-nominated-player-card"
        :player-name="nominatedPlayer.name"
        :player-role="nominatedPlayer.role.current"
      />
    </div>

    <OverflowTag
      id="nominated-players-overflow-tag"
      :entities-count="nominatedPlayers.length"
      :maximum-entities-displayed="maximumNominatedPlayersDisplayed"
    />
  </div>
</template>

<script setup lang="ts">
import type { GameOverHistoryRecordDecisionNominatedPlayersProps } from "~/components/pages/game/GameOver/GameOverHistory/GameOverHistoryRecords/GameOverHistoryRecord/GameOverHistoryRecordDecision/GameOverHistoryRecordDecisionNominatedPlayers/game-over-history-record-decision-nominated-players.types";
import PlayerCard from "~/components/shared/game/player/PlayerCard/PlayerCard.vue";
import OverflowTag from "~/components/shared/misc/OverflowTag/OverflowTag.vue";
import type { Player } from "~/composables/api/game/types/players/player.class";

const props = defineProps<GameOverHistoryRecordDecisionNominatedPlayersProps>();

const maximumNominatedPlayersDisplayed = 3;

const nominatedPlayers = computed<Player[]>(() => {
  const { voting } = props.gameHistoryRecord.play;

  return voting?.nominatedPlayers ?? [];
});

const truncatedNominatedPlayers = computed<Player[]>(() => nominatedPlayers.value.slice(0, maximumNominatedPlayersDisplayed));
</script>