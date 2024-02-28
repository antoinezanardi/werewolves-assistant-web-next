import type { PlayerRole } from "~/composables/api/game/types/players/player-role/player-role.class";
import type { Player } from "~/composables/api/game/types/players/player.class";
import { RoleNames, RoleSides } from "~/composables/api/role/enums/role.enums";
import { createFakePlayerSide } from "~/tests/unit/utils/factories/composables/api/game/player/player-side/player-side.factory";
import { createFakePlayer } from "~/tests/unit/utils/factories/composables/api/game/player/player.factory";

const werewolfSide = createFakePlayerSide({
  original: RoleSides.WEREWOLVES,
  current: RoleSides.WEREWOLVES,
});

const villagersSide = createFakePlayerSide({
  original: RoleSides.VILLAGERS,
  current: RoleSides.VILLAGERS,
});

function createFakeWerewolfAlivePlayer(player: Partial<Player> = {}): Player {
  return createFakeAlivePlayerWithRole(RoleNames.WEREWOLF, {
    side: player.side ?? werewolfSide,
    ...player,
  });
}

function createFakeBigBadWolfAlivePlayer(player: Partial<Player> = {}): Player {
  return createFakeAlivePlayerWithRole(RoleNames.BIG_BAD_WOLF, {
    side: player.side ?? werewolfSide,
    ...player,
  });
}

function createFakeAccursedWolfFatherAlivePlayer(player: Partial<Player> = {}): Player {
  return createFakeAlivePlayerWithRole(RoleNames.ACCURSED_WOLF_FATHER, {
    side: player.side ?? werewolfSide,
    ...player,
  });
}

function createFakeWhiteWerewolfAlivePlayer(player: Partial<Player> = {}): Player {
  return createFakeAlivePlayerWithRole(RoleNames.WHITE_WEREWOLF, {
    side: player.side ?? werewolfSide,
    ...player,
  });
}

function createFakeVillagerAlivePlayer(player: Partial<Player> = {}): Player {
  return createFakeAlivePlayerWithRole(RoleNames.VILLAGER, {
    side: player.side ?? villagersSide,
    ...player,
  });
}

function createFakeVillagerVillagerAlivePlayer(player: Partial<Player> = {}): Player {
  return createFakeAlivePlayerWithRole(RoleNames.VILLAGER_VILLAGER, {
    side: player.side ?? villagersSide,
    ...player,
  });
}

function createFakeSeerAlivePlayer(player: Partial<Player> = {}): Player {
  return createFakeAlivePlayerWithRole(RoleNames.SEER, {
    side: player.side ?? villagersSide,
    ...player,
  });
}

function createFakeCupidAlivePlayer(player: Partial<Player> = {}): Player {
  return createFakeAlivePlayerWithRole(RoleNames.CUPID, {
    side: player.side ?? villagersSide,
    ...player,
  });
}

function createFakeWitchAlivePlayer(player: Partial<Player> = {}): Player {
  return createFakeAlivePlayerWithRole(RoleNames.WITCH, {
    side: player.side ?? villagersSide,
    ...player,
  });
}

function createFakeHunterAlivePlayer(player: Partial<Player> = {}): Player {
  return createFakeAlivePlayerWithRole(RoleNames.HUNTER, {
    side: player.side ?? villagersSide,
    ...player,
  });
}

function createFakeLittleGirlAlivePlayer(player: Partial<Player> = {}): Player {
  return createFakeAlivePlayerWithRole(RoleNames.LITTLE_GIRL, {
    side: player.side ?? villagersSide,
    ...player,
  });
}

function createFakeDefenderAlivePlayer(player: Partial<Player> = {}): Player {
  return createFakeAlivePlayerWithRole(RoleNames.DEFENDER, {
    side: player.side ?? villagersSide,
    ...player,
  });
}

function createFakeElderAlivePlayer(player: Partial<Player> = {}): Player {
  return createFakeAlivePlayerWithRole(RoleNames.ELDER, {
    side: player.side ?? villagersSide,
    ...player,
  });
}

function createFakeScapegoatAlivePlayer(player: Partial<Player> = {}): Player {
  return createFakeAlivePlayerWithRole(RoleNames.SCAPEGOAT, {
    side: player.side ?? villagersSide,
    ...player,
  });
}

function createFakeIdiotAlivePlayer(player: Partial<Player> = {}): Player {
  return createFakeAlivePlayerWithRole(RoleNames.IDIOT, {
    side: player.side ?? villagersSide,
    ...player,
  });
}

function createFakeTwoSistersAlivePlayer(player: Partial<Player> = {}): Player {
  return createFakeAlivePlayerWithRole(RoleNames.TWO_SISTERS, {
    side: player.side ?? villagersSide,
    ...player,
  });
}

function createFakeThreeBrothersAlivePlayer(player: Partial<Player> = {}): Player {
  return createFakeAlivePlayerWithRole(RoleNames.THREE_BROTHERS, {
    side: player.side ?? villagersSide,
    ...player,
  });
}

function createFakeFoxAlivePlayer(player: Partial<Player> = {}): Player {
  return createFakeAlivePlayerWithRole(RoleNames.FOX, {
    side: player.side ?? villagersSide,
    ...player,
  });
}

function createFakeBearTamerAlivePlayer(player: Partial<Player> = {}): Player {
  return createFakeAlivePlayerWithRole(RoleNames.BEAR_TAMER, {
    side: player.side ?? villagersSide,
    ...player,
  });
}

function createFakeStutteringJudgeAlivePlayer(player: Partial<Player> = {}): Player {
  return createFakeAlivePlayerWithRole(RoleNames.STUTTERING_JUDGE, {
    side: player.side ?? villagersSide,
    ...player,
  });
}

function createFakeRustySwordKnightAlivePlayer(player: Partial<Player> = {}): Player {
  return createFakeAlivePlayerWithRole(RoleNames.RUSTY_SWORD_KNIGHT, {
    side: player.side ?? villagersSide,
    ...player,
  });
}

function createFakeWildChildAlivePlayer(player: Partial<Player> = {}): Player {
  return createFakeAlivePlayerWithRole(RoleNames.WILD_CHILD, {
    side: player.side ?? villagersSide,
    ...player,
  });
}

function createFakeWolfHoundAlivePlayer(player: Partial<Player> = {}): Player {
  return createFakeAlivePlayerWithRole(RoleNames.WOLF_HOUND, {
    side: player.side ?? villagersSide,
    ...player,
  });
}

function createFakeThiefAlivePlayer(player: Partial<Player> = {}): Player {
  return createFakeAlivePlayerWithRole(RoleNames.THIEF, {
    side: player.side ?? villagersSide,
    ...player,
  });
}

function createFakeAngelAlivePlayer(player: Partial<Player> = {}): Player {
  return createFakeAlivePlayerWithRole(RoleNames.ANGEL, {
    side: player.side ?? villagersSide,
    ...player,
  });
}

function createFakePiedPiperAlivePlayer(player: Partial<Player> = {}): Player {
  return createFakeAlivePlayerWithRole(RoleNames.PIED_PIPER, {
    side: player.side ?? villagersSide,
    ...player,
  });
}

function createFakeScandalmongerAlivePlayer(player: Partial<Player> = {}): Player {
  return createFakeAlivePlayerWithRole(RoleNames.SCANDALMONGER, {
    side: player.side ?? villagersSide,
    ...player,
  });
}

function createFakePrejudicedManipulatorAlivePlayer(player: Partial<Player> = {}): Player {
  return createFakeAlivePlayerWithRole(RoleNames.PREJUDICED_MANIPULATOR, {
    side: player.side ?? villagersSide,
    ...player,
  });
}

function createFakeActorAlivePlayer(player: Partial<Player> = {}): Player {
  return createFakeAlivePlayerWithRole(RoleNames.ACTOR, {
    side: player.side ?? villagersSide,
    ...player,
  });
}

function createFakeDevotedServantAlivePlayer(player: Partial<Player> = {}): Player {
  return createFakeAlivePlayerWithRole(RoleNames.DEVOTED_SERVANT, {
    side: player.side ?? villagersSide,
    ...player,
  });
}

function createFakeAlivePlayerWithRole(role: RoleNames, player: Partial<Player> = {}): Player {
  const playerRole: PlayerRole = {
    current: role,
    original: role,
    isRevealed: role === RoleNames.VILLAGER_VILLAGER,
  };

  return createFakePlayer({
    role: playerRole,
    isAlive: true,
    ...player,
  });
}

export {
  createFakeAlivePlayerWithRole,
  createFakeWerewolfAlivePlayer,
  createFakeBigBadWolfAlivePlayer,
  createFakeAccursedWolfFatherAlivePlayer,
  createFakeWhiteWerewolfAlivePlayer,
  createFakeVillagerAlivePlayer,
  createFakeVillagerVillagerAlivePlayer,
  createFakeSeerAlivePlayer,
  createFakeCupidAlivePlayer,
  createFakeWitchAlivePlayer,
  createFakeHunterAlivePlayer,
  createFakeLittleGirlAlivePlayer,
  createFakeDefenderAlivePlayer,
  createFakeElderAlivePlayer,
  createFakeScapegoatAlivePlayer,
  createFakeIdiotAlivePlayer,
  createFakeTwoSistersAlivePlayer,
  createFakeThreeBrothersAlivePlayer,
  createFakeFoxAlivePlayer,
  createFakeBearTamerAlivePlayer,
  createFakeStutteringJudgeAlivePlayer,
  createFakeRustySwordKnightAlivePlayer,
  createFakeWildChildAlivePlayer,
  createFakeWolfHoundAlivePlayer,
  createFakeThiefAlivePlayer,
  createFakeAngelAlivePlayer,
  createFakePiedPiperAlivePlayer,
  createFakeScandalmongerAlivePlayer,
  createFakePrejudicedManipulatorAlivePlayer,
  createFakeActorAlivePlayer,
  createFakeDevotedServantAlivePlayer,
};