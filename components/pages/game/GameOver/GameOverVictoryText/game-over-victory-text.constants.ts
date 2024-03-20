import type { GameVictoryTypes } from "~/composables/api/game/types/game-victory/game-victory.types";

type TextsKeyAndSvgPath = {
  textKey: string;
  subTextKey: string;
  svgPath: string;
};

const VICTORY_TYPES_TEXTS_AND_SVG: Record<GameVictoryTypes, TextsKeyAndSvgPath> = {
  "angel": {
    textKey: "components.GameOverVictoryText.angelWins",
    subTextKey: "components.GameOverVictoryText.angelComesBackToParadise",
    svgPath: "svg/role/angel.svg",
  },
  "lovers": {
    textKey: "components.GameOverVictoryText.loversWin",
    subTextKey: "components.GameOverVictoryText.loversAreTogetherForever",
    svgPath: "svg/role/lovers.svg",
  },
  "none": {
    textKey: "components.GameOverVictoryText.nobodyWins",
    subTextKey: "components.GameOverVictoryText.everybodyMurderedEachOther",
    svgPath: "svg/game/player/dead.svg",
  },
  "pied-piper": {
    textKey: "components.GameOverVictoryText.piedPiperWins",
    subTextKey: "components.GameOverVictoryText.piedPiperHasControl",
    svgPath: "svg/role/pied-piper.svg",
  },
  "prejudiced-manipulator": {
    textKey: "components.GameOverVictoryText.prejudicedManipulatorWins",
    subTextKey: "components.GameOverVictoryText.prejudicedManipulatorGroupRemainsAlive",
    svgPath: "svg/role/prejudiced-manipulator.svg",
  },
  "villagers": {
    textKey: "components.GameOverVictoryText.villagersWin",
    subTextKey: "components.GameOverVictoryText.villagersHaveSurvivedWerewolves",
    svgPath: "svg/role/villager.svg",
  },
  "werewolves": {
    textKey: "components.GameOverVictoryText.werewolvesWin",
    subTextKey: "components.GameOverVictoryText.werewolvesHaveEatenALot",
    svgPath: "svg/role/werewolf.svg",
  },
  "white-werewolf": {
    textKey: "components.GameOverVictoryText.whiteWerewolfWins",
    subTextKey: "components.GameOverVictoryText.whiteWerewolfWinsAlone",
    svgPath: "svg/role/white-werewolf.svg",
  },
} as const;

export { VICTORY_TYPES_TEXTS_AND_SVG };