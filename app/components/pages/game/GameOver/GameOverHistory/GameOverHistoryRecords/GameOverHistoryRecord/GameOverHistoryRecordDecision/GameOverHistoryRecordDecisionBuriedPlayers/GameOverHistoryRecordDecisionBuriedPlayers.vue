<template>
  <div
    id="game-over-history-record-decision-buried-players"
    class="flex flex-col gap-4 items-center justify-center"
  >
    <h4
      v-if="buriedPlayerRoleNameLabel"
      id="game-over-history-record-decision-buried-player-role-name"
      class="text-center"
    >
      {{ buriedPlayerRoleNameLabel }}
    </h4>

    <ul class="mx-auto overflow-x-auto scrollbar-thin text-center w-full whitespace-nowrap">
      <GameOverHistoryRecordDecisionBuriedPlayer
        v-for="buriedPlayer in buriedPlayers"
        :key="buriedPlayer._id"
        :buried-player="buriedPlayer"
        class="game-over-history-record-buried-player inline-block"
        :game-history-record="props.gameHistoryRecord"
        is-disabled
      />
    </ul>
  </div>
</template>

<script setup lang="ts">
import type { GameOverHistoryRecordDecisionBuriedPlayersProps } from "~/components/pages/game/GameOver/GameOverHistory/GameOverHistoryRecords/GameOverHistoryRecord/GameOverHistoryRecordDecision/GameOverHistoryRecordDecisionBuriedPlayers/game-over-history-record-decision-buried-players.types";
import GameOverHistoryRecordDecisionBuriedPlayer from "~/components/pages/game/GameOver/GameOverHistory/GameOverHistoryRecords/GameOverHistoryRecord/GameOverHistoryRecordDecision/GameOverHistoryRecordDecisionBuriedPlayers/GameOverHistoryRecordDecisionBuriedPlayer/GameOverHistoryRecordDecisionBuriedPlayer.vue";
import type { Player } from "~/composables/api/game/types/players/player.class";
import { useRoleName } from "~/composables/api/role/useRoleName";

const props = defineProps<GameOverHistoryRecordDecisionBuriedPlayersProps>();

const { getDefiniteRoleNameLabel } = useRoleName();

const buriedPlayers = computed<Player[]>(() => {
  const { interactions } = props.gameHistoryRecord.play.source;
  const buryDeadBodiesInteraction = interactions?.find(({ type }) => type === "bury");

  return buryDeadBodiesInteraction?.eligibleTargets ?? [];
});

const isBuriedPlayerAlone = computed<boolean>(() => buriedPlayers.value.length === 1);

const buriedPlayerRoleNameLabel = computed<string | undefined>(() => {
  if (!isBuriedPlayerAlone.value) {
    return "";
  }
  const buriedPlayer = buriedPlayers.value[0];

  return getDefiniteRoleNameLabel(buriedPlayer.role.current, 1);
});
</script>