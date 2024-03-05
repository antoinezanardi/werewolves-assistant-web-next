import { useGamePlay } from "~/composables/api/game/game-play/useGamePlay";
import type { GamePlayAction } from "~/composables/api/game/types/game-play/game-play.types";
import { createFakeGamePlay } from "~/tests/unit/utils/factories/composables/api/game/game-play/game-play.factory";
import { createFakeGame } from "~/tests/unit/utils/factories/composables/api/game/game.factory";

describe("Use Game Play Composable", () => {
  describe("currentPlayType", () => {
    it("should return undefined when game current play is null.", () => {
      const game = ref(createFakeGame({ currentPlay: null }));
      const { currentPlayType } = useGamePlay(game);

      expect(currentPlayType.value).toBeUndefined();
    });

    it("should return 'no-action' when game current play action is 'meet-each-other'.", () => {
      const game = ref(createFakeGame({ currentPlay: createFakeGamePlay({ action: "meet-each-other" }) }));
      const { currentPlayType } = useGamePlay(game);

      expect(currentPlayType.value).toBe("no-action");
    });

    it("should return 'request-another-vote' when game current play action is 'request-another-vote'.", () => {
      const game = ref(createFakeGame({ currentPlay: createFakeGamePlay({ action: "request-another-vote" }) }));
      const { currentPlayType } = useGamePlay(game);

      expect(currentPlayType.value).toBe("request-another-vote");
    });

    it("should return undefined when game current play action is not categorized.", () => {
      const game = ref(createFakeGame({ currentPlay: createFakeGamePlay({ action: "unknown" as GamePlayAction }) }));
      const { currentPlayType } = useGamePlay(game);

      expect(currentPlayType.value).toBeUndefined();
    });
  });
});