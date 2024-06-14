import type { PlayerRole } from "~/composables/api/game/types/players/player-role/player-role.class";
import type { Player } from "~/composables/api/game/types/players/player.class";
import type { RoleName } from "~/composables/api/role/types/role.types";
import { createFakePlayerSide } from "@tests/unit/utils/factories/composables/api/game/player/player-side/player-side.factory";
import { createFakePlayer } from "@tests/unit/utils/factories/composables/api/game/player/player.factory";

const werewolfSide = createFakePlayerSide({
  original: "werewolves",
  current: "werewolves",
});

const villagersSide = createFakePlayerSide({
  original: "villagers",
  current: "villagers",
});

function createFakeWerewolfAlivePlayer(player: Partial<Player> = {}): Player {
  return createFakeAlivePlayerWithRole("werewolf", {
    side: player.side ?? werewolfSide,
    ...player,
  });
}

function createFakeBigBadWolfAlivePlayer(player: Partial<Player> = {}): Player {
  return createFakeAlivePlayerWithRole("big-bad-wolf", {
    side: player.side ?? werewolfSide,
    ...player,
  });
}

function createFakeAccursedWolfFatherAlivePlayer(player: Partial<Player> = {}): Player {
  return createFakeAlivePlayerWithRole("accursed-wolf-father", {
    side: player.side ?? werewolfSide,
    ...player,
  });
}

function createFakeWhiteWerewolfAlivePlayer(player: Partial<Player> = {}): Player {
  return createFakeAlivePlayerWithRole("white-werewolf", {
    side: player.side ?? werewolfSide,
    ...player,
  });
}

function createFakeVillagerAlivePlayer(player: Partial<Player> = {}): Player {
  return createFakeAlivePlayerWithRole("villager", {
    side: player.side ?? villagersSide,
    ...player,
  });
}

function createFakeVillagerVillagerAlivePlayer(player: Partial<Player> = {}): Player {
  return createFakeAlivePlayerWithRole("villager-villager", {
    side: player.side ?? villagersSide,
    ...player,
  });
}

function createFakeSeerAlivePlayer(player: Partial<Player> = {}): Player {
  return createFakeAlivePlayerWithRole("seer", {
    side: player.side ?? villagersSide,
    ...player,
  });
}

function createFakeCupidAlivePlayer(player: Partial<Player> = {}): Player {
  return createFakeAlivePlayerWithRole("cupid", {
    side: player.side ?? villagersSide,
    ...player,
  });
}

function createFakeWitchAlivePlayer(player: Partial<Player> = {}): Player {
  return createFakeAlivePlayerWithRole("witch", {
    side: player.side ?? villagersSide,
    ...player,
  });
}

function createFakeHunterAlivePlayer(player: Partial<Player> = {}): Player {
  return createFakeAlivePlayerWithRole("hunter", {
    side: player.side ?? villagersSide,
    ...player,
  });
}

function createFakeLittleGirlAlivePlayer(player: Partial<Player> = {}): Player {
  return createFakeAlivePlayerWithRole("little-girl", {
    side: player.side ?? villagersSide,
    ...player,
  });
}

function createFakeDefenderAlivePlayer(player: Partial<Player> = {}): Player {
  return createFakeAlivePlayerWithRole("defender", {
    side: player.side ?? villagersSide,
    ...player,
  });
}

function createFakeElderAlivePlayer(player: Partial<Player> = {}): Player {
  return createFakeAlivePlayerWithRole("elder", {
    side: player.side ?? villagersSide,
    ...player,
  });
}

function createFakeScapegoatAlivePlayer(player: Partial<Player> = {}): Player {
  return createFakeAlivePlayerWithRole("scapegoat", {
    side: player.side ?? villagersSide,
    ...player,
  });
}

function createFakeIdiotAlivePlayer(player: Partial<Player> = {}): Player {
  return createFakeAlivePlayerWithRole("idiot", {
    side: player.side ?? villagersSide,
    ...player,
  });
}

function createFakeTwoSistersAlivePlayer(player: Partial<Player> = {}): Player {
  return createFakeAlivePlayerWithRole("two-sisters", {
    side: player.side ?? villagersSide,
    ...player,
  });
}

function createFakeThreeBrothersAlivePlayer(player: Partial<Player> = {}): Player {
  return createFakeAlivePlayerWithRole("three-brothers", {
    side: player.side ?? villagersSide,
    ...player,
  });
}

function createFakeFoxAlivePlayer(player: Partial<Player> = {}): Player {
  return createFakeAlivePlayerWithRole("fox", {
    side: player.side ?? villagersSide,
    ...player,
  });
}

function createFakeBearTamerAlivePlayer(player: Partial<Player> = {}): Player {
  return createFakeAlivePlayerWithRole("bear-tamer", {
    side: player.side ?? villagersSide,
    ...player,
  });
}

function createFakeStutteringJudgeAlivePlayer(player: Partial<Player> = {}): Player {
  return createFakeAlivePlayerWithRole("stuttering-judge", {
    side: player.side ?? villagersSide,
    ...player,
  });
}

function createFakeRustySwordKnightAlivePlayer(player: Partial<Player> = {}): Player {
  return createFakeAlivePlayerWithRole("rusty-sword-knight", {
    side: player.side ?? villagersSide,
    ...player,
  });
}

function createFakeWildChildAlivePlayer(player: Partial<Player> = {}): Player {
  return createFakeAlivePlayerWithRole("wild-child", {
    side: player.side ?? villagersSide,
    ...player,
  });
}

function createFakeWolfHoundAlivePlayer(player: Partial<Player> = {}): Player {
  return createFakeAlivePlayerWithRole("wolf-hound", {
    side: player.side ?? villagersSide,
    ...player,
  });
}

function createFakeThiefAlivePlayer(player: Partial<Player> = {}): Player {
  return createFakeAlivePlayerWithRole("thief", {
    side: player.side ?? villagersSide,
    ...player,
  });
}

function createFakeAngelAlivePlayer(player: Partial<Player> = {}): Player {
  return createFakeAlivePlayerWithRole("angel", {
    side: player.side ?? villagersSide,
    ...player,
  });
}

function createFakePiedPiperAlivePlayer(player: Partial<Player> = {}): Player {
  return createFakeAlivePlayerWithRole("pied-piper", {
    side: player.side ?? villagersSide,
    ...player,
  });
}

function createFakeScandalmongerAlivePlayer(player: Partial<Player> = {}): Player {
  return createFakeAlivePlayerWithRole("scandalmonger", {
    side: player.side ?? villagersSide,
    ...player,
  });
}

function createFakePrejudicedManipulatorAlivePlayer(player: Partial<Player> = {}): Player {
  return createFakeAlivePlayerWithRole("prejudiced-manipulator", {
    side: player.side ?? villagersSide,
    ...player,
  });
}

function createFakeActorAlivePlayer(player: Partial<Player> = {}): Player {
  return createFakeAlivePlayerWithRole("actor", {
    side: player.side ?? villagersSide,
    ...player,
  });
}

function createFakeDevotedServantAlivePlayer(player: Partial<Player> = {}): Player {
  return createFakeAlivePlayerWithRole("devoted-servant", {
    side: player.side ?? villagersSide,
    ...player,
  });
}

function createFakeAlivePlayerWithRole(role: RoleName, player: Partial<Player> = {}): Player {
  const playerRole: PlayerRole = {
    current: role,
    original: role,
    isRevealed: role === "villager-villager",
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