<template>
  <div id="game-team-side-player-attribute">
    <NuxtImg
      id="game-team-side-player-attribute-icon"
      v-p-tooltip="playerAttributeTooltipOptions"
      :alt="playerAttributeDescription"
      height="50"
      :src="playerAttributeSvgPath"
      width="50"
    />
  </div>
</template>

<script setup lang="ts">
import type { TooltipOptions } from "primevue/tooltip";

import type { GameTeamSidePlayerAttributeProps } from "~/components/pages/game/GamePlaying/GameTeamSide/GameTeamSidePlayer/GameTeamSidePlayerAttribute/game-team-side-player-attribute.types";
import type { GameSource } from "~/composables/api/game/types/game.types";
import type { PlayerAttributeName } from "~/composables/api/game/types/players/player-attribute/player-attribute.types";

type PlayerAttributeSvgAndDescription = { svgPath: string; description: string };

type PlayerAttributesSourceSvgAndDescription = Partial<Record<GameSource, PlayerAttributeSvgAndDescription>>;

const props = defineProps<GameTeamSidePlayerAttributeProps>();

const { t } = useI18n();

const img = useImage();

const playerAttributesSourcesSvgAndDescription: Record<PlayerAttributeName, PlayerAttributesSourceSvgAndDescription> = {
  "acting": {
    actor: {
      svgPath: "svg/role/actor.svg",
      description: t("components.GameTeamSidePlayerAttribute.actingByActor"),
    },
  },
  "cant-vote": {
    survivors: {
      svgPath: "svg/game/player/player-attribute/cant-vote.svg",
      description: t("components.GameTeamSidePlayerAttribute.cantVoteBySurvivors"),
    },
    scapegoat: {
      svgPath: "svg/game/player/player-attribute/cant-vote.svg",
      description: t("components.GameTeamSidePlayerAttribute.cantVoteByScapegoat"),
    },
  },
  "charmed": {
    "pied-piper": {
      svgPath: "svg/game/player/player-attribute/charmed.svg",
      description: t("components.GameTeamSidePlayerAttribute.charmedByPiedPiper"),
    },
  },
  "contaminated": {
    "rusty-sword-knight": {
      svgPath: "svg/game/player/player-attribute/contaminated.svg",
      description: t("components.GameTeamSidePlayerAttribute.contaminatedByRustySwordKnight"),
    },
  },
  "drank-death-potion": {
    witch: {
      svgPath: "svg/game/player/player-attribute/drank-death-potion.svg",
      description: t("components.GameTeamSidePlayerAttribute.drankDeathPotionByWitch"),
    },
  },
  "drank-life-potion": {
    witch: {
      svgPath: "svg/game/player/player-attribute/drank-life-potion.svg",
      description: t("components.GameTeamSidePlayerAttribute.drankLifePotionByWitch"),
    },
  },
  "eaten": {
    "werewolves": {
      svgPath: "svg/role/werewolf.svg",
      description: t("components.GameTeamSidePlayerAttribute.eatenByWerewolves"),
    },
    "white-werewolf": {
      svgPath: "svg/role/white-werewolf.svg",
      description: t("components.GameTeamSidePlayerAttribute.eatenByWhiteWerewolf"),
    },
    "big-bad-wolf": {
      svgPath: "svg/role/big-bad-wolf.svg",
      description: t("components.GameTeamSidePlayerAttribute.eatenByBigBadWolf"),
    },
  },
  "in-love": {
    cupid: {
      svgPath: "svg/game/player/player-attribute/in-love.svg",
      description: t("components.GameTeamSidePlayerAttribute.inLoveByCupid"),
    },
  },
  "powerless": {
    "actor": {
      svgPath: "svg/game/player/player-attribute/powerless.svg",
      description: t("components.GameTeamSidePlayerAttribute.powerlessByActor"),
    },
    "werewolves": {
      svgPath: "svg/game/player/player-attribute/powerless.svg",
      description: t("components.GameTeamSidePlayerAttribute.powerlessByWerewolves"),
    },
    "accursed-wolf-father": {
      svgPath: "svg/game/player/player-attribute/powerless.svg",
      description: t("components.GameTeamSidePlayerAttribute.powerlessByAccursedWolfFather"),
    },
    "fox": {
      svgPath: "svg/game/player/player-attribute/powerless.svg",
      description: t("components.GameTeamSidePlayerAttribute.powerlessByFox"),
    },
    "elder": {
      svgPath: "svg/game/player/player-attribute/powerless.svg",
      description: t("components.GameTeamSidePlayerAttribute.powerlessByElder"),
    },
  },
  "protected": {
    defender: {
      svgPath: "svg/game/player/player-attribute/protected.svg",
      description: t("components.GameTeamSidePlayerAttribute.protectedByDefender"),
    },
  },
  "scandalmonger-marked": {
    scandalmonger: {
      svgPath: "svg/game/player/player-attribute/scandalmonger-marked.svg",
      description: t("components.GameTeamSidePlayerAttribute.scandalmongerMarkedByScandalmonger"),
    },
  },
  "seen": {
    seer: {
      svgPath: "svg/game/player/player-attribute/seen.svg",
      description: t("components.GameTeamSidePlayerAttribute.seenBySeer"),
    },
  },
  "sheriff": {
    sheriff: {
      svgPath: "svg/game/player/player-attribute/sheriff.svg",
      description: t("components.GameTeamSidePlayerAttribute.sheriffBySheriff"),
    },
    survivors: {
      svgPath: "svg/game/player/player-attribute/sheriff.svg",
      description: t("components.GameTeamSidePlayerAttribute.sheriffBySurvivors"),
    },
  },
  "stolen-role": {
    "devoted-servant": {
      svgPath: "svg/game/player/player-attribute/stolen-role.svg",
      description: t("components.GameTeamSidePlayerAttribute.stolenRoleByDevotedServant"),
    },
  },
  "worshiped": {
    "wild-child": {
      svgPath: "svg/role/wild-child.svg",
      description: t("components.GameTeamSidePlayerAttribute.worshipedByWildChild"),
    },
  },
};

const playerAttributeSourceSvgAndDescription = computed<PlayerAttributeSvgAndDescription | undefined>(() => {
  const { attribute } = props;

  return playerAttributesSourcesSvgAndDescription[attribute.name][attribute.source];
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