<template>
  <li class="inline-block text-center">
    <div class="p-2">
      <GlowElement>
        <RoleImage
          id="buried-player-role-image"
          class="glow:border-gray-400 mx-auto"
          definition="normal"
          :role-name="buriedPlayer.role.current"
          :sizes="roleImageSizesInPx"
        />
      </GlowElement>

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
import { breakpointsTailwind, useBreakpoints } from "@vueuse/core";

import type { GameOverHistoryRecordDecisionBuriedPlayerProps } from "~/components/pages/game/GameOver/GameOverHistory/GameOverHistoryRecords/GameOverHistoryRecord/GameOverHistoryRecordDecision/GameOverHistoryRecordDecisionBuriedPlayers/GameOverHistoryRecordDecisionBuriedPlayer/game-over-history-record-decision-buried-player.types";
import RoleImage from "~/components/shared/role/RoleImage/RoleImage.vue";
import { BreakpointTypes } from "~/utils/enums/breakpoint.enums";

const props = defineProps<GameOverHistoryRecordDecisionBuriedPlayerProps>();

const breakpoints = useBreakpoints(breakpointsTailwind);
const isSmallerThanMd = breakpoints.smaller(BreakpointTypes.MD);

const roleImageSizesInPx = computed<string>(() => (isSmallerThanMd.value ? "56px" : "70px"));

const isTagDisplayed = computed<boolean>(() => {
  const target = props.gameHistoryRecord.play.targets?.[0];

  return !!target && target.player._id === props.buriedPlayer._id;
});
</script>