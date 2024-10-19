<template>
  <li class="inline-block text-center">
    <div class="p-2">
      <RoleImage
        id="buried-player-role-image"
        v-tilt
        class="mx-auto"
        definition="normal"
        :role-name="buriedPlayer.role.current"
        :sizes="roleImageSizesInPx"
      />

      <div
        id="player-name"
        class="truncate w-full"
      >
        {{ buriedPlayer.name }}
      </div>

      <PrimeVueTag
        v-if="isTagDisplayed"
        id="devoted-servant-stolen-role-tag"
        class="flex gap-2 items-center justify-center mt-1"
        severity="warning"
      >
        <NuxtImg
          id="devoted-servant-stolen-role-tag-icon"
          :alt="$t('components.GameOverHistoryRecordDecisionBuriedPlayer.stolenRoleByDevotedServantIcon')"
          height="25"
          placeholder="/svg/misc/ripples.svg"
          placeholder-class="w-25 h-25"
          src="/svg/game/player/player-attribute/stolen-role.svg"
          width="25"
        />

        <span id="devoted-servant-stolen-role-tag-text">
          {{ $t("components.GameOverHistoryRecordDecisionBuriedPlayer.stolenRoleByDevotedServant") }}
        </span>
      </PrimeVueTag>
    </div>
  </li>
</template>

<script setup lang="ts">
import { GAME_HISTORY_RECORD_ROLE_IMAGE_SIZE_BELOW_MD, GAME_HISTORY_RECORD_ROLE_IMAGE_SIZE_OVER_MD } from "~/components/pages/game/GameOver/GameOverHistory/GameOverHistoryRecords/GameOverHistoryRecord/game-over-history-record.constants";
import type { GameOverHistoryRecordDecisionBuriedPlayerProps } from "~/components/pages/game/GameOver/GameOverHistory/GameOverHistoryRecords/GameOverHistoryRecord/GameOverHistoryRecordDecision/GameOverHistoryRecordDecisionBuriedPlayers/GameOverHistoryRecordDecisionBuriedPlayer/game-over-history-record-decision-buried-player.types";
import RoleImage from "~/components/shared/role/RoleImage/RoleImage.vue";
import { useAppBreakpoints } from "~/composables/style/useAppBreakpoints";

const props = defineProps<GameOverHistoryRecordDecisionBuriedPlayerProps>();

const { isSmallerThanMdBreakpoint } = useAppBreakpoints();

const roleImageSizesInPx = computed<string>(() => {
  if (isSmallerThanMdBreakpoint.value) {
    return `${GAME_HISTORY_RECORD_ROLE_IMAGE_SIZE_BELOW_MD}px`;
  }
  return `${GAME_HISTORY_RECORD_ROLE_IMAGE_SIZE_OVER_MD}px`;
});

const isTagDisplayed = computed<boolean>(() => {
  const target = props.gameHistoryRecord.play.targets?.[0];

  return !!target && target.player._id === props.buriedPlayer._id;
});
</script>