import { faker } from "@faker-js/faker";

import { GAME_SOURCES } from "~/composables/api/game/constants/game.constants";
import { PLAYER_ATTRIBUTE_NAMES } from "~/composables/api/game/constants/player/player-attribute/player-attribute.constants";
import type { Game } from "~/composables/api/game/types/game.class";
import { PlayerAttribute } from "~/composables/api/game/types/players/player-attribute/player-attribute.class";
import { RoleNames } from "~/composables/api/role/enums/role.enums";

function createFakeActingByActorPlayerAttribute(attribute: Partial<PlayerAttribute> = {}): PlayerAttribute {
  return createFakePlayerAttribute({
    name: "acting",
    source: RoleNames.ACTOR,
    ...attribute,
  });
}

function createFakeStolenRoleByDevotedServantPlayerAttribute(attribute: Partial<PlayerAttribute> = {}): PlayerAttribute {
  return createFakePlayerAttribute({
    name: "stolen-role",
    source: RoleNames.DEVOTED_SERVANT,
    doesRemainAfterDeath: true,
    ...attribute,
  });
}

function createFakeSheriffBySheriffPlayerAttribute(attribute: Partial<PlayerAttribute> = {}): PlayerAttribute {
  return createFakePlayerAttribute({
    name: "sheriff",
    source: "sheriff",
    doesRemainAfterDeath: true,
    ...attribute,
  });
}

function createFakeSheriffBySurvivorsPlayerAttribute(attribute: Partial<PlayerAttribute> = {}): PlayerAttribute {
  return createFakePlayerAttribute({
    name: "sheriff",
    source: "survivors",
    doesRemainAfterDeath: true,
    ...attribute,
  });
}

function createFakeSeenBySeerPlayerAttribute(attribute: Partial<PlayerAttribute> = {}): PlayerAttribute {
  return createFakePlayerAttribute({
    name: "seen",
    source: RoleNames.SEER,
    remainingPhases: 1,
    ...attribute,
  });
}

function createFakeEatenByWerewolvesPlayerAttribute(attribute: Partial<PlayerAttribute> = {}): PlayerAttribute {
  return createFakePlayerAttribute({
    name: "eaten",
    source: "werewolves",
    remainingPhases: 1,
    ...attribute,
  });
}

function createFakeEatenByWhiteWerewolfPlayerAttribute(attribute: Partial<PlayerAttribute> = {}): PlayerAttribute {
  return createFakePlayerAttribute({
    name: "eaten",
    source: RoleNames.WHITE_WEREWOLF,
    remainingPhases: 1,
    ...attribute,
  });
}

function createFakeEatenByBigBadWolfPlayerAttribute(attribute: Partial<PlayerAttribute> = {}): PlayerAttribute {
  return createFakePlayerAttribute({
    name: "eaten",
    source: RoleNames.BIG_BAD_WOLF,
    remainingPhases: 1,
    ...attribute,
  });
}

function createFakeDrankLifePotionByWitchPlayerAttribute(attribute: Partial<PlayerAttribute> = {}): PlayerAttribute {
  return createFakePlayerAttribute({
    name: "drank-life-potion",
    source: RoleNames.WITCH,
    remainingPhases: 1,
    ...attribute,
  });
}

function createFakeDrankDeathPotionByWitchPlayerAttribute(attribute: Partial<PlayerAttribute> = {}): PlayerAttribute {
  return createFakePlayerAttribute({
    name: "drank-death-potion",
    source: RoleNames.WITCH,
    remainingPhases: 1,
    ...attribute,
  });
}

function createFakeProtectedByDefenderPlayerAttribute(attribute: Partial<PlayerAttribute> = {}): PlayerAttribute {
  return createFakePlayerAttribute({
    name: "protected",
    source: RoleNames.DEFENDER,
    remainingPhases: 1,
    ...attribute,
  });
}

function createFakeScandalmongerMarkedByScandalmongerPlayerAttribute(attribute: Partial<PlayerAttribute> = {}): PlayerAttribute {
  return createFakePlayerAttribute({
    name: "scandalmonger-marked",
    source: RoleNames.SCANDALMONGER,
    remainingPhases: 2,
    ...attribute,
  });
}

function createFakeInLoveByCupidPlayerAttribute(attribute: Partial<PlayerAttribute> = {}): PlayerAttribute {
  return createFakePlayerAttribute({
    name: "in-love",
    source: RoleNames.CUPID,
    ...attribute,
  });
}

function createFakeWorshipedByWildChildPlayerAttribute(attribute: Partial<PlayerAttribute> = {}): PlayerAttribute {
  return createFakePlayerAttribute({
    name: "worshiped",
    source: RoleNames.WILD_CHILD,
    ...attribute,
  });
}

function createFakePowerlessByActorPlayerAttribute(attribute: Partial<PlayerAttribute> = {}): PlayerAttribute {
  return createFakePlayerAttribute({
    name: "powerless",
    source: RoleNames.ACTOR,
    doesRemainAfterDeath: true,
    ...attribute,
  });
}

function createFakePowerlessByWerewolvesPlayerAttribute(attribute: Partial<PlayerAttribute> = {}): PlayerAttribute {
  return createFakePlayerAttribute({
    name: "powerless",
    source: "werewolves",
    doesRemainAfterDeath: true,
    ...attribute,
  });
}

function createFakePowerlessByAccursedWolfFatherPlayerAttribute(attribute: Partial<PlayerAttribute> = {}): PlayerAttribute {
  return createFakePlayerAttribute({
    name: "powerless",
    source: RoleNames.ACCURSED_WOLF_FATHER,
    doesRemainAfterDeath: true,
    ...attribute,
  });
}

function createFakePowerlessByFoxPlayerAttribute(attribute: Partial<PlayerAttribute> = {}): PlayerAttribute {
  return createFakePlayerAttribute({
    name: "powerless",
    source: RoleNames.FOX,
    doesRemainAfterDeath: true,
    ...attribute,
  });
}

function createFakePowerlessByElderPlayerAttribute(attribute: Partial<PlayerAttribute> = {}): PlayerAttribute {
  return createFakePlayerAttribute({
    name: "powerless",
    source: RoleNames.ELDER,
    doesRemainAfterDeath: true,
    ...attribute,
  });
}

function createFakeCantVoteBySurvivorsPlayerAttribute(attribute: Partial<PlayerAttribute> = {}): PlayerAttribute {
  return createFakePlayerAttribute({
    name: "cant-vote",
    source: "survivors",
    ...attribute,
  });
}

function createFakeCantVoteByScapegoatPlayerAttribute(game: Game, attribute: Partial<PlayerAttribute> = {}): PlayerAttribute {
  return createFakePlayerAttribute({
    name: "cant-vote",
    source: RoleNames.SCAPEGOAT,
    remainingPhases: 1,
    activeAt: {
      turn: game.phase === "day" ? game.turn + 1 : game.turn,
      phase: "day",
    },
    ...attribute,
  });
}

function createFakeCharmedByPiedPiperPlayerAttribute(attribute: Partial<PlayerAttribute> = {}): PlayerAttribute {
  return createFakePlayerAttribute({
    name: "charmed",
    source: RoleNames.PIED_PIPER,
    ...attribute,
  });
}

function createFakeContaminatedByRustySwordKnightPlayerAttribute(attribute: Partial<PlayerAttribute> = {}): PlayerAttribute {
  return createFakePlayerAttribute({
    name: "contaminated",
    source: RoleNames.RUSTY_SWORD_KNIGHT,
    remainingPhases: 2,
    ...attribute,
  });
}

function createFakePlayerAttribute(playerAttribute: Partial<PlayerAttribute> = {}): PlayerAttribute {
  return PlayerAttribute.create({
    name: playerAttribute.name ?? faker.helpers.arrayElement(PLAYER_ATTRIBUTE_NAMES),
    source: playerAttribute.source ?? faker.helpers.arrayElement(GAME_SOURCES),
    activeAt: playerAttribute.activeAt,
    remainingPhases: playerAttribute.remainingPhases ?? undefined,
    doesRemainAfterDeath: playerAttribute.doesRemainAfterDeath ?? undefined,
  });
}

export {
  createFakeActingByActorPlayerAttribute,
  createFakeStolenRoleByDevotedServantPlayerAttribute,
  createFakeSheriffBySheriffPlayerAttribute,
  createFakeSheriffBySurvivorsPlayerAttribute,
  createFakeSeenBySeerPlayerAttribute,
  createFakeEatenByWerewolvesPlayerAttribute,
  createFakeEatenByWhiteWerewolfPlayerAttribute,
  createFakeEatenByBigBadWolfPlayerAttribute,
  createFakeDrankLifePotionByWitchPlayerAttribute,
  createFakeDrankDeathPotionByWitchPlayerAttribute,
  createFakeProtectedByDefenderPlayerAttribute,
  createFakeScandalmongerMarkedByScandalmongerPlayerAttribute,
  createFakeInLoveByCupidPlayerAttribute,
  createFakeWorshipedByWildChildPlayerAttribute,
  createFakePowerlessByActorPlayerAttribute,
  createFakePowerlessByWerewolvesPlayerAttribute,
  createFakePowerlessByAccursedWolfFatherPlayerAttribute,
  createFakePowerlessByFoxPlayerAttribute,
  createFakePowerlessByElderPlayerAttribute,
  createFakeCantVoteBySurvivorsPlayerAttribute,
  createFakeCantVoteByScapegoatPlayerAttribute,
  createFakeCharmedByPiedPiperPlayerAttribute,
  createFakeContaminatedByRustySwordKnightPlayerAttribute,
  createFakePlayerAttribute,
};