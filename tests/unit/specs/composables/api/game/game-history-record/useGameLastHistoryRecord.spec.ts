import { useGameLastHistoryRecord } from "~/composables/api/game/game-history-record/useGameLastHistoryRecord";
import type { Game } from "~/composables/api/game/types/game.class";
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
      const { lastTargetedPlayers } = useGameLastHistoryRecord(ref(game));

      expect(lastTargetedPlayers.value).toStrictEqual<Player[]>(expected);
    });
  });
});