import { Expose, plainToInstance, Type } from "class-transformer";
import { ActorGameOptions } from "~/composables/api/game/types/game-options/roles-game-options/actor-game-options/actor-game-options.class";
import { BearTamerGameOptions } from "~/composables/api/game/types/game-options/roles-game-options/bear-tamer-game-options/bear-tamer-game-options.class";
import { BigBadWolfGameOptions } from "~/composables/api/game/types/game-options/roles-game-options/big-bad-wolf-options/big-bad-wolf-options.class";
import { CupidGameOptions } from "~/composables/api/game/types/game-options/roles-game-options/cupid-game-options/cupid-game-options.class";
import { DefenderGameOptions } from "~/composables/api/game/types/game-options/roles-game-options/defender-game-options/defender-game-options.class";
import { ElderGameOptions } from "~/composables/api/game/types/game-options/roles-game-options/elder-game-options/elder-game-options.class";
import { FoxGameOptions } from "~/composables/api/game/types/game-options/roles-game-options/fox-game-options/fox-game-options.class";
import { IdiotGameOptions } from "~/composables/api/game/types/game-options/roles-game-options/idiot-game-options/idiot-game-options.class";
import { LittleGirlGameOptions } from "~/composables/api/game/types/game-options/roles-game-options/little-girl-game-options/little-girl-game-options.class";
import { PiedPiperGameOptions } from "~/composables/api/game/types/game-options/roles-game-options/pied-piper-game-options/pied-piper-game-options.class";
import { PrejudicedManipulatorGameOptions } from "~/composables/api/game/types/game-options/roles-game-options/prejudiced-manipulator-game-options/prejudiced-manipulator-game-options.class";
import { ScandalmongerGameOptions } from "~/composables/api/game/types/game-options/roles-game-options/scandalmonger-game-options/scandalmongonger-game-options.class";
import { SeerGameOptions } from "~/composables/api/game/types/game-options/roles-game-options/seer-game-options/seer-game-options.class";
import { SheriffGameOptions } from "~/composables/api/game/types/game-options/roles-game-options/sheriff-game-options/sheriff-game-options.class";
import { StutteringJudgeGameOptions } from "~/composables/api/game/types/game-options/roles-game-options/stuttering-judge-game-options/stuttering-judge-game-options.class";
import { ThiefGameOptions } from "~/composables/api/game/types/game-options/roles-game-options/thief-game-options/thief-game-options.class";
import { ThreeBrothersGameOptions } from "~/composables/api/game/types/game-options/roles-game-options/three-brothers-game-options/three-brothers-game-options.class";
import { TwoSistersGameOptions } from "~/composables/api/game/types/game-options/roles-game-options/two-sisters-game-options/two-sisters-game-options.class";
import { WerewolfGameOptions } from "~/composables/api/game/types/game-options/roles-game-options/werewolf-game-options/werewolf-game-options.class";
import { WhiteWerewolfGameOptions } from "~/composables/api/game/types/game-options/roles-game-options/white-werewolf-options/white-werewolf-game-options.class";
import { WildChildGameOptions } from "~/composables/api/game/types/game-options/roles-game-options/wild-child-game-options/wild-child-game-options.class";
import { WitchGameOptions } from "~/composables/api/game/types/game-options/roles-game-options/witch-game-options/witch-game-options.class";
import { WolfHoundGameOptions } from "~/composables/api/game/types/game-options/roles-game-options/wolf-hound-game-options/wolf-hound-game-options.class";
import { DEFAULT_PLAIN_TO_INSTANCE_OPTIONS } from "~/utils/constants/class-transformer.constants";

class RolesGameOptions {
  @Expose()
  public doSkipCallIfNoTarget: boolean;

  @Expose()
  public areRevealedOnDeath: boolean;

  @Type(() => SheriffGameOptions)
  @Expose()
  public sheriff: SheriffGameOptions;

  @Type(() => WerewolfGameOptions)
  @Expose()
  public werewolf: WerewolfGameOptions;

  @Type(() => BigBadWolfGameOptions)
  @Expose()
  public bigBadWolf: BigBadWolfGameOptions;

  @Type(() => WhiteWerewolfGameOptions)
  @Expose()
  public whiteWerewolf: WhiteWerewolfGameOptions;

  @Type(() => SeerGameOptions)
  @Expose()
  public seer: SeerGameOptions;

  @Type(() => CupidGameOptions)
  @Expose()
  public cupid: CupidGameOptions;

  @Type(() => LittleGirlGameOptions)
  @Expose()
  public littleGirl: LittleGirlGameOptions;

  @Type(() => DefenderGameOptions)
  @Expose()
  public defender: DefenderGameOptions;

  @Type(() => ElderGameOptions)
  @Expose()
  public elder: ElderGameOptions;

  @Type(() => IdiotGameOptions)
  @Expose()
  public idiot: IdiotGameOptions;

  @Type(() => TwoSistersGameOptions)
  @Expose()
  public twoSisters: TwoSistersGameOptions;

  @Type(() => ThreeBrothersGameOptions)
  @Expose()
  public threeBrothers: ThreeBrothersGameOptions;

  @Type(() => FoxGameOptions)
  @Expose()
  public fox: FoxGameOptions;

  @Type(() => BearTamerGameOptions)
  @Expose()
  public bearTamer: BearTamerGameOptions;

  @Type(() => StutteringJudgeGameOptions)
  @Expose()
  public stutteringJudge: StutteringJudgeGameOptions;

  @Type(() => WildChildGameOptions)
  @Expose()
  public wildChild: WildChildGameOptions;

  @Type(() => WolfHoundGameOptions)
  @Expose()
  public wolfHound: WolfHoundGameOptions;

  @Type(() => ThiefGameOptions)
  @Expose()
  public thief: ThiefGameOptions;

  @Type(() => PiedPiperGameOptions)
  @Expose()
  public piedPiper: PiedPiperGameOptions;

  @Type(() => ScandalmongerGameOptions)
  @Expose()
  public scandalmonger: ScandalmongerGameOptions;

  @Type(() => WitchGameOptions)
  @Expose()
  public witch: WitchGameOptions;

  @Type(() => PrejudicedManipulatorGameOptions)
  @Expose()
  public prejudicedManipulator: PrejudicedManipulatorGameOptions;

  @Type(() => ActorGameOptions)
  @Expose()
  public actor: ActorGameOptions;

  public static create(rolesGameOptions: RolesGameOptions): RolesGameOptions {
    return plainToInstance(RolesGameOptions, rolesGameOptions, DEFAULT_PLAIN_TO_INSTANCE_OPTIONS);
  }
}

export { RolesGameOptions };