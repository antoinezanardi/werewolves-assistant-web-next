import { faker } from "@faker-js/faker";
import { ScandalmongerGameOptions } from "~/composables/api/game/types/game-options/roles-game-options/scandalmonger-game-options/scandalmongonger-game-options.class";

function createFakeScandalmongerGameOptions(scandalmongerGameOptions: Partial<ScandalmongerGameOptions> = {}): ScandalmongerGameOptions {
  return ScandalmongerGameOptions.create({ markPenalty: scandalmongerGameOptions.markPenalty ?? faker.number.int({ min: 1, max: 5 }) });
}

export { createFakeScandalmongerGameOptions };