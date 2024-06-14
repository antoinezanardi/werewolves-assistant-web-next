<template>
  <div class="flex flex-col gap-2 items-center justify-center">
    <PlayerCard
      class="game-over-history-record-decision-buried-player-card"
      :player-name="buriedPlayer.name"
      :player-role="buriedPlayer.role.current"
    />

    <VuePrimeTag
      v-if="isTagDisplayed"
      id="devoted-servant-stolen-role-tag"
      class="flex gap-2 items-center justify-center"
      severity="warning"
    >
      <NuxtImg
        id="devoted-servant-stolen-role-tag-icon"
        :alt="$t('components.GameOverHistoryRecordDecisionBuriedPlayer.stolenRoleByDevotedServantIcon')"
        height="25"
        src="/svg/game/player/player-attribute/stolen-role.svg"
        width="25"
      />

      <span id="devoted-servant-stolen-role-tag-text">
        {{ $t("components.GameOverHistoryRecordDecisionBuriedPlayer.stolenRoleByDevotedServant") }}
      </span>
    </VuePrimeTag>
  </div>
</template>

<script setup lang="ts">
import type { GameOverHistoryRecordDecisionBuriedPlayerProps } from "~/components/pages/game/GameOver/GameOverHistory/GameOverHistoryRecords/GameOverHistoryRecord/GameOverHistoryRecordDecision/GameOverHistoryRecordDecisionBuriedPlayers/GameOverHistoryRecordDecisionBuriedPlayer/game-over-history-record-decision-buried-player.types";
import PlayerCard from "~/components/shared/game/player/PlayerCard/PlayerCard.vue";

const props = defineProps<GameOverHistoryRecordDecisionBuriedPlayerProps>();

const isTagDisplayed = computed<boolean>(() => {
  const target = props.gameHistoryRecord.play.targets?.[0];

  return !!target && target.player._id === props.buriedPlayer._id;
});
</script>