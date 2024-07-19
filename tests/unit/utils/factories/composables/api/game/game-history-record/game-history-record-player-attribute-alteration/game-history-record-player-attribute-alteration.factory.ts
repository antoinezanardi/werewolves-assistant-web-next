import { faker } from "@faker-js/faker";
import { GAME_HISTORY_RECORD_PLAYER_ATTRIBUTE_ALTERATION_STATUSES } from "~/composables/api/game/constants/game-history-record/game-history-record.constants";
import { GAME_SOURCES } from "~/composables/api/game/constants/game.constants";
import { PLAYER_ATTRIBUTE_NAMES } from "~/composables/api/game/constants/player/player-attribute/player-attribute.constants";
import { GameHistoryRecordPlayerAttributeAlteration } from "~/composables/api/game/types/game-history-record/game-history-record-player-attribute-alteration/game-history-record-player-attribute-alteration.class";

function createFakeGameHistoryRecordPlayerAttributeAlteration(gameHistoryRecordPlayerAttributeAlteration: Partial<GameHistoryRecordPlayerAttributeAlteration> = {}):
GameHistoryRecordPlayerAttributeAlteration {
  return GameHistoryRecordPlayerAttributeAlteration.create({
    name: gameHistoryRecordPlayerAttributeAlteration.name ?? faker.helpers.arrayElement(PLAYER_ATTRIBUTE_NAMES),
    source: gameHistoryRecordPlayerAttributeAlteration.source ?? faker.helpers.arrayElement(GAME_SOURCES),
    playerName: gameHistoryRecordPlayerAttributeAlteration.playerName ?? faker.person.firstName(),
    status: gameHistoryRecordPlayerAttributeAlteration.status ?? faker.helpers.arrayElement(GAME_HISTORY_RECORD_PLAYER_ATTRIBUTE_ALTERATION_STATUSES),
  });
}

export { createFakeGameHistoryRecordPlayerAttributeAlteration };