<template>
  <div
    id="game-over-history-record-decision-nominated-players"
    class="flex flex-col gap-3 items-center justify-center"
  >
    <h4
      v-if="nominatedPlayerRoleNameLabel"
      id="game-over-history-decision-nominated-player-role-name"
      class="text-center"
    >
      {{ nominatedPlayerRoleNameLabel }}
    </h4>

    <PlayersHorizontalList
      id="nominated-players-horizontal-list"
      :players="nominatedPlayers"
      :role-image-sizes="70"
    />
  </div>
</template>

<script setup lang="ts">
import type { GameOverHistoryRecordDecisionNominatedPlayersProps } from "~/components/pages/game/GameOver/GameOverHistory/GameOverHistoryRecords/GameOverHistoryRecord/GameOverHistoryRecordDecision/GameOverHistoryRecordDecisionNominatedPlayers/game-over-history-record-decision-nominated-players.types";
import PlayersHorizontalList from "~/components/shared/game/player/PlayersHorizontalList/PlayersHorizontalList.vue";
import type { Player } from "~/composables/api/game/types/players/player.class";
import { useGameSourceName } from "~/composables/api/game/useGameSource";

const props = defineProps<GameOverHistoryRecordDecisionNominatedPlayersProps>();

const { getDefiniteGameSourceNameLabel } = useGameSourceName();

const nominatedPlayers = computed<Player[]>(() => {
  const { voting } = props.gameHistoryRecord.play;

  return voting?.nominatedPlayers ?? [];
});

const isNominatedPlayerAlone = computed<boolean>(() => nominatedPlayers.value.length === 1);

const nominatedPlayerRoleNameLabel = computed<string>(() => {
  if (!isNominatedPlayerAlone.value) {
    return "";
  }
  const nominatedPlayer = nominatedPlayers.value[0];

  return getDefiniteGameSourceNameLabel(nominatedPlayer.role.current, 1);
});
</script>