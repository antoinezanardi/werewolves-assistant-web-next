<template>
  <div id="game-team-side-player-attribute">
    <NuxtImg
      id="game-team-side-player-attribute-icon"
      v-p-tooltip:[{position:tooltipPosition}]="playerAttributeTooltipOptions"
      :alt="playerAttributeDescription"
      height="50"
      :src="playerAttributeSvgPath"
      width="50"
    />
  </div>
</template>

<script setup lang="ts">
import type { TooltipOptions } from "primevue/tooltip";

import { PLAYER_ATTRIBUTES_SOURCES_SVG_AND_DESCRIPTION } from "~/components/pages/game/GamePlaying/GameTeamSide/GameTeamSidePlayer/GameTeamSidePlayerAttribute/game-team-side-player-attribute.constants";
import type { GameTeamSidePlayerAttributeProps } from "~/components/pages/game/GamePlaying/GameTeamSide/GameTeamSidePlayer/GameTeamSidePlayerAttribute/game-team-side-player-attribute.types";

type PlayerAttributeSvgAndDescription = { svgPath: string; description: string };

const props = defineProps<GameTeamSidePlayerAttributeProps>();

const { t } = useI18n();

const img = useImage();

const playerAttributeSourceSvgAndDescription = computed<PlayerAttributeSvgAndDescription | undefined>(() => {
  const { attribute } = props;

  const sourceSvgAndDescription = PLAYER_ATTRIBUTES_SOURCES_SVG_AND_DESCRIPTION[attribute.name][attribute.source];
  if (!sourceSvgAndDescription) {
    return undefined;
  }
  return {
    svgPath: sourceSvgAndDescription.svgPath,
    description: t(sourceSvgAndDescription.descriptionKey),
  };
});

const playerAttributeDescription = computed<string>(() => {
  if (!playerAttributeSourceSvgAndDescription.value) {
    return t(`components.GameTeamSidePlayerAttribute.unknownPlayerAttribute`);
  }
  return playerAttributeSourceSvgAndDescription.value.description;
});

const playerAttributeSvgPath = computed<string>(() => {
  if (!playerAttributeSourceSvgAndDescription.value) {
    return "svg/misc/question-mark.svg";
  }
  return playerAttributeSourceSvgAndDescription.value.svgPath;
});

const tooltipPosition = computed<"left" | "right">(() => {
  const { side } = props.player;

  return side.current === "werewolves" ? "left" : "right";
});

const playerAttributeTooltipOptions = computed<TooltipOptions>(() => {
  const imgUrl = img(playerAttributeSvgPath.value);

  return {
    value: `<div class="flex flex-col items-center">
                <img width="75" src="${imgUrl}" alt="${playerAttributeDescription.value}" class="mb-3"/>
                <div class="text-center">${playerAttributeDescription.value}</div>
            </div>`,
    fitContent: false,
    escape: false,
  };
});
</script>