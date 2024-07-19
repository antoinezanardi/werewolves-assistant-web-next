import { createFakeGameHistoryRecordPlayerAttributeAlteration } from "@tests/unit/utils/factories/composables/api/game/game-history-record/game-history-record-player-attribute-alteration/game-history-record-player-attribute-alteration.factory";
import { useGameLastHistoryRecord } from "~/composables/api/game/game-history-record/useGameLastHistoryRecord";
import type { GameHistoryRecordPlayerAttributeAlterationStatus } from "~/composables/api/game/types/game-history-record/game-history-record-player-attribute-alteration/game-history-record-player-attribute-alteration.types";
import type { Game } from "~/composables/api/game/types/game.class";
import type { GameSource } from "~/composables/api/game/types/game.types";
import type { PlayerAttributeName } from "~/composables/api/game/types/players/player-attribute/player-attribute.types";
import type { Player } from "~/composables/api/game/types/players/player.class";
import { createFakeGameHistoryRecordPlayTarget } from "@tests/unit/utils/factories/composables/api/game/game-history-record/game-history-record-play/game-history-record-play-target/game-history-record-play-target.factory";
import { createFakeGameHistoryRecordPlay } from "@tests/unit/utils/factories/composables/api/game/game-history-record/game-history-record-play/game-history-record-play.factory";
import { createFakeGameHistoryRecord } from "@tests/unit/utils/factories/composables/api/game/game-history-record/game-history-record.factory";
import { createFakeGame } from "@tests/unit/utils/factories/composables/api/game/game.factory";
import { createFakePlayer } from "@tests/unit/utils/factories/composables/api/game/player/player.factory";

describe("Use Game Last History Record Composable", () => {
  describe("lastTargetedPlayers", () => {
    const expectedPlayers = [
      createFakePlayer(),
      createFakePlayer(),
    ];

    it.each<{
      test: string;
      game: Game;
      expected: Player[];
    }>([
      {
        game: createFakeGame({
          lastGameHistoryRecord: createFakeGameHistoryRecord({
            play: createFakeGameHistoryRecordPlay({
              type: "target",
              targets: undefined,
            }),
          }),
        }),
        expected: [],
        test: "should return empty array when called with target type and targets undefined.",
      },
      {
        game: createFakeGame({
          lastGameHistoryRecord: createFakeGameHistoryRecord({
            play: createFakeGameHistoryRecordPlay({
              type: "target",
              targets: [
                createFakeGameHistoryRecordPlayTarget({ player: expectedPlayers[0] }),
                createFakeGameHistoryRecordPlayTarget({ player: expectedPlayers[1] }),
              ],
            }),
          }),
        }),
        expected: expectedPlayers,
        test: "should return array with two players when called with target type and targets are not empty.",
      },
    ])("$test", ({ game, expected }) => {
      const { lastTargetedPlayers } = useGameLastHistoryRecord(game);

      expect(lastTargetedPlayers.value).toStrictEqual<Player[]>(expected);
    });
  });

  describe("doesHavePlayerAttributeAlteration", () => {
    it.each<{
      test: string;
      game: Game;
      attributeName: PlayerAttributeName;
      source: GameSource;
      status: GameHistoryRecordPlayerAttributeAlterationStatus;
      expected: boolean;
    }>([
      {
        test: "should return true when there is a player attribute alteration with the given attribute name, source and status.",
        game: createFakeGame({
          lastGameHistoryRecord: createFakeGameHistoryRecord({
            playerAttributeAlterations: [
              createFakeGameHistoryRecordPlayerAttributeAlteration({
                playerName: "Antoine",
                name: "drank-death-potion",
                source: "witch",
                status: "attached",
              }),
              createFakeGameHistoryRecordPlayerAttributeAlteration({
                playerName: "Antoine",
                name: "drank-life-potion",
                source: "witch",
                status: "detached",
              }),
            ],
          }),
        }),
        attributeName: "drank-death-potion",
        source: "witch",
        status: "attached",
        expected: true,
      },
      {
        test: "should return false when there is no player attribute alteration with the given attribute name, source and status.",
        game: createFakeGame({
          lastGameHistoryRecord: createFakeGameHistoryRecord({
            playerAttributeAlterations: [
              createFakeGameHistoryRecordPlayerAttributeAlteration({
                playerName: "Antoine",
                name: "drank-death-potion",
                source: "witch",
                status: "attached",
              }),
              createFakeGameHistoryRecordPlayerAttributeAlteration({
                playerName: "Antoine",
                name: "drank-life-potion",
                source: "witch",
                status: "detached",
              }),
              createFakeGameHistoryRecordPlayerAttributeAlteration({
                playerName: "Antoine",
                name: "drank-death-potion",
                source: "sheriff",
                status: "detached",
              }),
            ],
          }),
        }),
        attributeName: "drank-death-potion",
        source: "witch",
        status: "detached",
        expected: false,
      },
      {
        test: "should return false when there is no player attribute alteration.",
        game: createFakeGame({
          lastGameHistoryRecord: createFakeGameHistoryRecord(),
        }),
        attributeName: "drank-death-potion",
        source: "witch",
        status: "attached",
        expected: false,
      },
      {
        test: "should return false when there is no last game history record",
        game: createFakeGame(),
        attributeName: "drank-death-potion",
        source: "witch",
        status: "attached",
        expected: false,
      },
    ])("$test", ({ game, attributeName, source, status, expected }) => {
      const { doesHavePlayerAttributeAlteration } = useGameLastHistoryRecord(game);

      expect(doesHavePlayerAttributeAlteration(attributeName, source, status)).toBe(expected);
    });
  });
});