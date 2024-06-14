import { faker } from "@faker-js/faker";
import { RolesGameOptions } from "~/composables/api/game/types/game-options/roles-game-options/roles-game-options.class";
import { createFakeActorGameOptionsFactory } from "@tests/unit/utils/factories/composables/api/game/game-options/roles-game-options/actor-game-options/actor-game-options.factory";
import { createFakeBearTamerGameOptions } from "@tests/unit/utils/factories/composables/api/game/game-options/roles-game-options/bear-tamer-game-options/bear-tamer-game-options.factory";
import { createFakeBigBadWolfGameOptions } from "@tests/unit/utils/factories/composables/api/game/game-options/roles-game-options/big-bad-wolf-options/big-bad-wolf-options.factory";
import { createFakeCupidGameOptions } from "@tests/unit/utils/factories/composables/api/game/game-options/roles-game-options/cupid-game-options/cupid-game-options.factory";
import { createFakeDefenderGameOptions } from "@tests/unit/utils/factories/composables/api/game/game-options/roles-game-options/defender-game-options/defender-game-options.factory";
import { createFakeElderGameOptions } from "@tests/unit/utils/factories/composables/api/game/game-options/roles-game-options/elder-game-options/elder-game-options.factory";
import { createFakeFoxGameOptions } from "@tests/unit/utils/factories/composables/api/game/game-options/roles-game-options/fox-game-options/fox-game-options.factory";
import { createFakeIdiotGameOptions } from "@tests/unit/utils/factories/composables/api/game/game-options/roles-game-options/idiot-game-options/idiot-game-options.factory";
import { createFakeLittleGirlGameOptions } from "@tests/unit/utils/factories/composables/api/game/game-options/roles-game-options/little-girl-game-options/little-girl-game-options.factory";
import { createFakePiedPiperGameOptions } from "@tests/unit/utils/factories/composables/api/game/game-options/roles-game-options/pied-piper-game-options/pied-piper-game-options.factory";
import { createFakePrejudicedManipulatorGameOptions } from "@tests/unit/utils/factories/composables/api/game/game-options/roles-game-options/prejudiced-manipulator-game-options/prejudiced-manipulator-game-options.factory";
import { createFakeScandalmongerGameOptions } from "@tests/unit/utils/factories/composables/api/game/game-options/roles-game-options/scandalmonger-game-options/scandalmonger-game-options.factory";
import { createFakeSeerGameOptions } from "@tests/unit/utils/factories/composables/api/game/game-options/roles-game-options/seer-game-options/seer-game-options.factory";
import { createFakeSheriffGameOptions } from "@tests/unit/utils/factories/composables/api/game/game-options/roles-game-options/sheriff-game-options/sheriff-game-options.factory";
import { createFakeStutteringJudgeGameOptions } from "@tests/unit/utils/factories/composables/api/game/game-options/roles-game-options/stuttering-judge-game-options/stuttering-judge-game-options.factory";
import { createFakeThiefGameOptions } from "@tests/unit/utils/factories/composables/api/game/game-options/roles-game-options/thief-game-options/thief-game-options.factory";
import { createFakeThreeBrothersGameOptions } from "@tests/unit/utils/factories/composables/api/game/game-options/roles-game-options/three-brothers-game-options/three-brothers-game-options.factory";
import { createFakeTwoSistersGameOptions } from "@tests/unit/utils/factories/composables/api/game/game-options/roles-game-options/two-sisters-game-options/two-sisters-game-options.factory";
import { createFakeWhiteWerewolfGameOptions } from "@tests/unit/utils/factories/composables/api/game/game-options/roles-game-options/white-werewolf-game-options/white-werewolf-game-options.factory";
import { createFakeWildChildGameOptions } from "@tests/unit/utils/factories/composables/api/game/game-options/roles-game-options/wild-child-game-options/wild-child-game-options.factory";
import { createFakeWitchGameOptions } from "@tests/unit/utils/factories/composables/api/game/game-options/roles-game-options/witch-game-options/witch-game-options.factory";
import { createFakeWolfHoundGameOptions } from "@tests/unit/utils/factories/composables/api/game/game-options/roles-game-options/wolf-hound-game-options/wolf-hound-game-options.factory";

function createFakeRolesGameOptions(roleGameOptions: Partial<RolesGameOptions> = {}): RolesGameOptions {
  return RolesGameOptions.create({
    areRevealedOnDeath: roleGameOptions.areRevealedOnDeath ?? faker.datatype.boolean(),
    doSkipCallIfNoTarget: roleGameOptions.doSkipCallIfNoTarget ?? faker.datatype.boolean(),
    actor: createFakeActorGameOptionsFactory(roleGameOptions.actor),
    bearTamer: createFakeBearTamerGameOptions(roleGameOptions.bearTamer),
    bigBadWolf: createFakeBigBadWolfGameOptions(roleGameOptions.bigBadWolf),
    cupid: createFakeCupidGameOptions(roleGameOptions.cupid),
    defender: createFakeDefenderGameOptions(roleGameOptions.defender),
    elder: createFakeElderGameOptions(roleGameOptions.elder),
    fox: createFakeFoxGameOptions(roleGameOptions.fox),
    idiot: createFakeIdiotGameOptions(roleGameOptions.idiot),
    littleGirl: createFakeLittleGirlGameOptions(roleGameOptions.littleGirl),
    piedPiper: createFakePiedPiperGameOptions(roleGameOptions.piedPiper),
    prejudicedManipulator: createFakePrejudicedManipulatorGameOptions(roleGameOptions.prejudicedManipulator),
    scandalmonger: createFakeScandalmongerGameOptions(roleGameOptions.scandalmonger),
    seer: createFakeSeerGameOptions(roleGameOptions.seer),
    sheriff: createFakeSheriffGameOptions(roleGameOptions.sheriff),
    stutteringJudge: createFakeStutteringJudgeGameOptions(roleGameOptions.stutteringJudge),
    thief: createFakeThiefGameOptions(roleGameOptions.thief),
    threeBrothers: createFakeThreeBrothersGameOptions(roleGameOptions.threeBrothers),
    twoSisters: createFakeTwoSistersGameOptions(roleGameOptions.twoSisters),
    whiteWerewolf: createFakeWhiteWerewolfGameOptions(roleGameOptions.whiteWerewolf),
    wildChild: createFakeWildChildGameOptions(roleGameOptions.wildChild),
    witch: createFakeWitchGameOptions(roleGameOptions.witch),
    wolfHound: createFakeWolfHoundGameOptions(roleGameOptions.wolfHound),
  });
}

export { createFakeRolesGameOptions };