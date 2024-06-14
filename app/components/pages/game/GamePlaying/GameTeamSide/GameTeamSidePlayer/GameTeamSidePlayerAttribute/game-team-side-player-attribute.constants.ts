import type { GameSource } from "~/composables/api/game/types/game.types";
import type { PlayerAttributeName } from "~/composables/api/game/types/players/player-attribute/player-attribute.types";

type PlayerAttributesSourceSvgAndDescriptionKey = {
  svgPath: string;
  descriptionKey: string;
};

const PLAYER_ATTRIBUTES_SOURCES_SVG_AND_DESCRIPTION: Record<PlayerAttributeName, Partial<Record<GameSource, PlayerAttributesSourceSvgAndDescriptionKey>>> = {
  "acting": {
    actor: {
      svgPath: "svg/role/actor.svg",
      descriptionKey: "components.GameTeamSidePlayerAttribute.actingByActor",
    },
  },
  "cant-vote": {
    survivors: {
      svgPath: "svg/game/player/player-attribute/cant-vote.svg",
      descriptionKey: "components.GameTeamSidePlayerAttribute.cantVoteBySurvivors",
    },
    scapegoat: {
      svgPath: "svg/game/player/player-attribute/cant-vote.svg",
      descriptionKey: "components.GameTeamSidePlayerAttribute.cantVoteByScapegoat",
    },
  },
  "charmed": {
    "pied-piper": {
      svgPath: "svg/game/player/player-attribute/charmed.svg",
      descriptionKey: "components.GameTeamSidePlayerAttribute.charmedByPiedPiper",
    },
  },
  "contaminated": {
    "rusty-sword-knight": {
      svgPath: "svg/game/player/player-attribute/contaminated.svg",
      descriptionKey: "components.GameTeamSidePlayerAttribute.contaminatedByRustySwordKnight",
    },
  },
  "drank-death-potion": {
    witch: {
      svgPath: "svg/game/player/player-attribute/drank-death-potion.svg",
      descriptionKey: "components.GameTeamSidePlayerAttribute.drankDeathPotionByWitch",
    },
  },
  "drank-life-potion": {
    witch: {
      svgPath: "svg/game/player/player-attribute/drank-life-potion.svg",
      descriptionKey: "components.GameTeamSidePlayerAttribute.drankLifePotionByWitch",
    },
  },
  "eaten": {
    "werewolves": {
      svgPath: "svg/role/werewolf.svg",
      descriptionKey: "components.GameTeamSidePlayerAttribute.eatenByWerewolves",
    },
    "white-werewolf": {
      svgPath: "svg/role/white-werewolf.svg",
      descriptionKey: "components.GameTeamSidePlayerAttribute.eatenByWhiteWerewolf",
    },
    "big-bad-wolf": {
      svgPath: "svg/role/big-bad-wolf.svg",
      descriptionKey: "components.GameTeamSidePlayerAttribute.eatenByBigBadWolf",
    },
  },
  "in-love": {
    cupid: {
      svgPath: "svg/game/player/player-attribute/in-love.svg",
      descriptionKey: "components.GameTeamSidePlayerAttribute.inLoveByCupid",
    },
  },
  "powerless": {
    "actor": {
      svgPath: "svg/game/player/player-attribute/powerless.svg",
      descriptionKey: "components.GameTeamSidePlayerAttribute.powerlessByActor",
    },
    "werewolves": {
      svgPath: "svg/game/player/player-attribute/powerless.svg",
      descriptionKey: "components.GameTeamSidePlayerAttribute.powerlessByWerewolves",
    },
    "accursed-wolf-father": {
      svgPath: "svg/game/player/player-attribute/powerless.svg",
      descriptionKey: "components.GameTeamSidePlayerAttribute.powerlessByAccursedWolfFather",
    },
    "fox": {
      svgPath: "svg/game/player/player-attribute/powerless.svg",
      descriptionKey: "components.GameTeamSidePlayerAttribute.powerlessByFox",
    },
    "elder": {
      svgPath: "svg/game/player/player-attribute/powerless.svg",
      descriptionKey: "components.GameTeamSidePlayerAttribute.powerlessByElder",
    },
  },
  "protected": {
    defender: {
      svgPath: "svg/game/player/player-attribute/protected.svg",
      descriptionKey: "components.GameTeamSidePlayerAttribute.protectedByDefender",
    },
  },
  "scandalmonger-marked": {
    scandalmonger: {
      svgPath: "svg/game/player/player-attribute/scandalmonger-marked.svg",
      descriptionKey: "components.GameTeamSidePlayerAttribute.scandalmongerMarkedByScandalmonger",
    },
  },
  "seen": {
    seer: {
      svgPath: "svg/game/player/player-attribute/seen.svg",
      descriptionKey: "components.GameTeamSidePlayerAttribute.seenBySeer",
    },
  },
  "sheriff": {
    sheriff: {
      svgPath: "svg/game/player/player-attribute/sheriff.svg",
      descriptionKey: "components.GameTeamSidePlayerAttribute.sheriffBySheriff",
    },
    survivors: {
      svgPath: "svg/game/player/player-attribute/sheriff.svg",
      descriptionKey: "components.GameTeamSidePlayerAttribute.sheriffBySurvivors",
    },
  },
  "stolen-role": {
    "devoted-servant": {
      svgPath: "svg/game/player/player-attribute/stolen-role.svg",
      descriptionKey: "components.GameTeamSidePlayerAttribute.stolenRoleByDevotedServant",
    },
  },
  "worshiped": {
    "wild-child": {
      svgPath: "svg/role/wild-child.svg",
      descriptionKey: "components.GameTeamSidePlayerAttribute.worshipedByWildChild",
    },
  },
};

export { PLAYER_ATTRIBUTES_SOURCES_SVG_AND_DESCRIPTION };