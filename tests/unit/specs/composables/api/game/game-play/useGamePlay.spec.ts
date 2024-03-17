import { useGamePlay } from "~/composables/api/game/game-play/useGamePlay";
import type { GamePlayAction } from "~/composables/api/game/types/game-play/game-play.types";
import type { Game } from "~/composables/api/game/types/game.class";
import type { Player } from "~/composables/api/game/types/players/player.class";
import { createFakeGamePlay } from "~/tests/unit/utils/factories/composables/api/game/game-play/game-play.factory";
import { createFakeGame } from "~/tests/unit/utils/factories/composables/api/game/game.factory";
import { createFakePlayer } from "~/tests/unit/utils/factories/composables/api/game/player/player.factory";

import { createFakeGamePlayEligibleTargets } from "~/tests/unit/utils/factories/composables/api/game/game-play/game-play-eligible-targets/game-play-eligible-targets.factory";
import { createFakeInteractablePlayer } from "~/tests/unit/utils/factories/composables/api/game/game-play/game-play-eligible-targets/interactable-player/interactable-player.factory";
import { createFakePlayerInteraction } from "~/tests/unit/utils/factories/composables/api/game/game-play/game-play-eligible-targets/interactable-player/player-interaction/player-interaction.factory";
import type { PlayerInteraction } from "~/composables/api/game/types/game-play/game-play-eligible-targets/interactable-player/player-interaction/player-interaction.class";

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

  describe("getEligibleTargetsWithInteractionInCurrentGamePlay", () => {
    const foundPlayerWithInteraction = createFakePlayer();

    it.each<{
      game: Game;
      interaction: PlayerInteraction;
      expectedPlayer: Player | undefined;
      test: string;
    }>([
      {
        game: createFakeGame(),
        interaction: createFakePlayerInteraction({ source: "devoted-servant", type: "steal-role" }),
        expectedPlayer: undefined,
        test: "should return undefined when game current play is null.",
      },
      {
        game: createFakeGame({ currentPlay: createFakeGamePlay() }),
        interaction: createFakePlayerInteraction({ source: "devoted-servant", type: "steal-role" }),
        expectedPlayer: undefined,
        test: "should return undefined when game current play eligible targets are undefined.",
      },
      {
        game: createFakeGame({ currentPlay: createFakeGamePlay({ eligibleTargets: createFakeGamePlayEligibleTargets() }) }),
        interaction: createFakePlayerInteraction({ source: "devoted-servant", type: "steal-role" }),
        expectedPlayer: undefined,
        test: "should return undefined when game current play interactable players are undefined.",
      },
      {
        game: createFakeGame({
          currentPlay: createFakeGamePlay({
            eligibleTargets: createFakeGamePlayEligibleTargets({
              interactablePlayers: [
                createFakeInteractablePlayer({
                  player: createFakePlayer(),
                  interactions: [
                    createFakePlayerInteraction({
                      source: "devoted-servant",
                      type: "eat",
                    }),
                    createFakePlayerInteraction({
                      source: "hunter",
                      type: "steal-role",
                    }),
                  ],
                }),
                createFakeInteractablePlayer({ player: createFakePlayer() }),
              ],
            }),
          }),
        }),
        interaction: createFakePlayerInteraction({ source: "devoted-servant", type: "steal-role" }),
        expectedPlayer: undefined,
        test: "should return undefined when game current play interaction is not found among interactable players.",
      },
      {
        game: createFakeGame({
          currentPlay: createFakeGamePlay({
            eligibleTargets: createFakeGamePlayEligibleTargets({
              interactablePlayers: [
                createFakeInteractablePlayer({
                  player: foundPlayerWithInteraction,
                  interactions: [
                    createFakePlayerInteraction({
                      source: "devoted-servant",
                      type: "steal-role",
                    }),
                  ],
                }),
              ],
            }),
          }),
        }),
        interaction: createFakePlayerInteraction({ source: "devoted-servant", type: "steal-role" }),
        expectedPlayer: foundPlayerWithInteraction,
        test: "should return player when game current play interaction is found among interactable players.",
      },
    ])("$test", ({ game, interaction, expectedPlayer }) => {
      const { getEligibleTargetsWithInteractionInCurrentGamePlay } = useGamePlay(ref(game));

      expect(getEligibleTargetsWithInteractionInCurrentGamePlay(interaction)).toStrictEqual<Player | undefined>(expectedPlayer);
    });
  });
});