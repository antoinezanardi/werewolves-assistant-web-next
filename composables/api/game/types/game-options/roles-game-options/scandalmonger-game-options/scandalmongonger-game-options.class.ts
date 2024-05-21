import { Expose, plainToInstance } from "class-transformer";
import { DEFAULT_PLAIN_TO_INSTANCE_OPTIONS } from "~/utils/constants/class-transformer.constants";

class ScandalmongerGameOptions {
  @Expose()
  public markPenalty: number;

  public static create(scandalmongerGameOptions: ScandalmongerGameOptions): ScandalmongerGameOptions {
    return plainToInstance(ScandalmongerGameOptions, scandalmongerGameOptions, DEFAULT_PLAIN_TO_INSTANCE_OPTIONS);
  }
}

export { ScandalmongerGameOptions };