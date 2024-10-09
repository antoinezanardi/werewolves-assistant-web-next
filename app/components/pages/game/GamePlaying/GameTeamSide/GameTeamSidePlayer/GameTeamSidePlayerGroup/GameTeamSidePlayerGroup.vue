<template>
  <div id="game-team-side-player-group">
    <NuxtImg
      id="game-team-side-player-group-icon"
      v-p-tooltip="playerGroupTooltipOptions"
      :alt="playerGroupDescription"
      class="absolute right-2.5 top-2.5"
      height="20"
      placeholder="svg/misc/ripples.svg"
      placeholder-class="w-20 h-20"
      :src="playerGroupSvgPath"
      width="20"
    />
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import type { TooltipOptions } from "primevue/tooltip";

import type { GameTeamSidePlayerGroupProps } from "~/components/pages/game/GamePlaying/GameTeamSide/GameTeamSidePlayer/GameTeamSidePlayerGroup/game-team-side-player-group.types";
import { useGameStore } from "~/stores/game/useGameStore";

const props = defineProps<GameTeamSidePlayerGroupProps>();

const gameStore = useGameStore();
const { gamePlayerGroups } = storeToRefs(gameStore);

const img = useImage();
const { t } = useI18n();

const playerGroupSvgPath = computed<string>(() => {
  const firstGroup = gamePlayerGroups.value[0];
  const groupFileName = props.player.group === firstGroup ? "group-1" : "group-2";

  return `svg/game/player/player-group/${groupFileName}.svg`;
});

const playerGroupDescription = computed<string>(() => t(`components.GameTeamSidePlayerGroup.playerGroup`, { groupName: props.player.group }));

const playerGroupImgUrl = computed(() => img(playerGroupSvgPath.value));

const playerGroupTooltipOptions = computed<TooltipOptions>(() => ({
  value: `<div class="flex flex-col items-center gap-2">
                <img width="75" class="drop-shadow-xl" src="${playerGroupImgUrl.value}" alt="${playerGroupDescription.value}"/>
                <div class="text-center">${playerGroupDescription.value}</div>
            </div>`,
  fitContent: false,
  escape: false,
}));
</script>