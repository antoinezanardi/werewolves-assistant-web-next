<template>
  <div id="game-team-side-player-attribute">
    {{ playerAttributeName }}
  </div>
</template>

<script setup lang="ts">
import type { GameTeamSidePlayerAttributeProps } from "~/components/pages/game/GamePlaying/GameTeamSide/GameTeamSidePlayer/GameTeamSidePlayerAttribute/game-team-side-player-attribute.types";
import type { GameSource } from "~/composables/api/game/types/game.types";
import type { PlayerAttributeName } from "~/composables/api/game/types/players/player-attribute/player-attribute.types";

type PlayerAttributeSvgAndName = { svgPath: string; name: string };

type PlayerAttributesSourceSvgAndName = Partial<Record<GameSource, PlayerAttributeSvgAndName>>;

const props = defineProps<GameTeamSidePlayerAttributeProps>();

const { t } = useI18n();

const playerAttributesSourcesSvgAndName: Record<PlayerAttributeName, PlayerAttributesSourceSvgAndName> = {
  "acting": {
    actor: {
      svgPath: "acting/actor.svg",
      name: "Actor",
    },
  },
  "cant-vote": {
    survivors: {
      svgPath: "cant-vote/survivors.svg",
      name: "Survivors",
    },
    scapegoat: {
      svgPath: "cant-vote/scapegoat.svg",
      name: "Scapegoat",
    },
  },
  "charmed": {
    "pied-piper": {
      svgPath: "charmed/pied-piper.svg",
      name: "Pied Piper",
    },
  },
  "contaminated": {
    "rusty-sword-knight": {
      svgPath: "contaminated/rusty-sword-knight.svg",
      name: "Rusty Sword Knight",
    },
  },
  "drank-death-potion": {
    witch: {
      svgPath: "drank-death-potion/witch.svg",
      name: "Witch",
    },
  },
  "drank-life-potion": {
    witch: {
      svgPath: "drank-life-potion/witch.svg",
      name: "Witch",
    },
  },
  "eaten": {
    "werewolves": {
      svgPath: "eaten/werewolves.svg",
      name: "Werewolves",
    },
    "white-werewolf": {
      svgPath: "eaten/white-werewolf.svg",
      name: "White Werewolf",
    },
    "big-bad-wolf": {
      svgPath: "eaten/big-bad-wolf.svg",
      name: "Big Bad Wolf",
    },
  },
  "in-love": {
    cupid: {
      svgPath: "in-love/cupid.svg",
      name: "Cupid",
    },
  },
  "powerless": {
    "actor": {
      svgPath: "powerless/actor.svg",
      name: "Actor",
    },
    "werewolves": {
      svgPath: "powerless/werewolves.svg",
      name: "Werewolves",
    },
    "accursed-wolf-father": {
      svgPath: "powerless/accursed-wolf-father.svg",
      name: "Accursed Wolf Father",
    },
    "fox": {
      svgPath: "powerless/fox.svg",
      name: "Fox",
    },
    "elder": {
      svgPath: "powerless/elder.svg",
      name: "Elder",
    },
  },
  "protected": {
    defender: {
      svgPath: "protected/defender.svg",
      name: "Defender",
    },
  },
  "scandalmonger-marked": {
    scandalmonger: {
      svgPath: "scandalmonger-marked/scandalmonger.svg",
      name: "Scandalmonger",
    },
  },
  "seen": {
    seer: {
      svgPath: "seen/seer.svg",
      name: "Seer",
    },
  },
  "sheriff": {
    sheriff: {
      svgPath: "sheriff/sheriff.svg",
      name: "sheriff",
    },
    survivors: {
      svgPath: "sheriff/survivors.svg",
      name: "survivors",
    },
  },
  "stolen-role": {
    "devoted-servant": {
      svgPath: "stolen-role/devoted-servant.svg",
      name: "Devoted Servant",
    },
  },
  "worshiped": {
    "wild-child": {
      svgPath: "worshiped/wild-child.svg",
      name: "Wild Child",
    },
  },
};

const playerAttributeSourceSvgAndName = computed<PlayerAttributeSvgAndName | undefined>(() => {
  const { attribute } = props;

  return playerAttributesSourcesSvgAndName[attribute.name][attribute.source];
});

const playerAttributeName = computed<string>(() => {
  if (!playerAttributeSourceSvgAndName.value) {
    return t(`components.GameTeamSidePlayerAttribute.unknownPlayerAttribute`);
  }
  return playerAttributeSourceSvgAndName.value.name;
});

const playerAttributeSvgPath = computed<string>(() => {
  if (!playerAttributeSourceSvgAndName.value) {
    return "/svg/role/unknown.svg";
  }
  return playerAttributeSourceSvgAndName.value.svgPath;
});
</script>