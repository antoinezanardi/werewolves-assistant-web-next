import { Expose, plainToInstance, Type } from "class-transformer";
import { DEFAULT_PLAIN_TO_INSTANCE_OPTIONS } from "~/utils/constants/class-transformer.constants";

class RolesGameOptions {
  @Expose()
  public doSkipCallIfNoTarget: boolean;

  @Expose()
  public areRevealedOnDeath: boolean;

  @Type(() => SheriffGameOptions)
  @Expose()
  public sheriff: SheriffGameOptions;

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