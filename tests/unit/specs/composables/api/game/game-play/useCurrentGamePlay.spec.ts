import { useCurrentGamePlay } from "~/composables/api/game/game-play/useCurrentGamePlay";
import type { GamePlayCause } from "~/composables/api/game/types/game-play/game-play.types";
import type { Game } from "~/composables/api/game/types/game.class";
import type { PlayerInteractionType } from "~/composables/api/game/types/players/player-interaction/player-interaction.types";
import type { Player } from "~/composables/api/game/types/players/player.class";
import { createFakeGamePlaySourceInteraction } from "@tests/unit/utils/factories/composables/api/game/game-play/game-play-source/game-play-source-interaction/game-play-source-interaction.factory";
import { createFakeGamePlaySource } from "@tests/unit/utils/factories/composables/api/game/game-play/game-play-source/game-play-source.factory";
import { createFakeGamePlaySheriffDelegates, createFakeGamePlaySurvivorsBuryDeadBodies } from "@tests/unit/utils/factories/composables/api/game/game-play/game-play.factory";
import { createFakeGame } from "@tests/unit/utils/factories/composables/api/game/game.factory";
import { createFakePlayer } from "@tests/unit/utils/factories/composables/api/game/player/player.factory";

describe("Use Current Game Play Composable", () => {
  describe("mustCurrentGamePlayBeSkipped", () => {
    it.each<{
      game: Game;
      expectedBoolean: boolean;
      test: string;
    }>([
      {
        game: createFakeGame(),
        expectedBoolean: false,
        test: "should return false when game current play is null.",
      },
      {
        game: createFakeGame({
          currentPlay: createFakeGamePlaySurvivorsBuryDeadBodies({
            source: createFakeGamePlaySource({
              interactions: [
                createFakeGamePlaySourceInteraction({
                  type: "steal-role",
                  eligibleTargets: [createFakePlayer()],
                }),
              ],
            }),
          }),
        }),
        expectedBoolean: false,
        test: "should return false when there are no steal role interaction.",
      },
      {
        game: createFakeGame({
          currentPlay: createFakeGamePlaySheriffDelegates({
            source: createFakeGamePlaySource({
              interactions: [
                createFakeGamePlaySourceInteraction({
                  type: "steal-role",
                  eligibleTargets: [createFakePlayer()],
                }),
              ],
            }),
          }),
        }),
        expectedBoolean: false,
        test: "should return false when game play action is not bury dead bodies.",
      },
      {
        game: createFakeGame({ currentPlay: createFakeGamePlaySurvivorsBuryDeadBodies({ source: createFakeGamePlaySource({ interactions: [] }) }) }),
        expectedBoolean: true,
        test: "should return true when action is bury dead bodies and there are no steal role eligible targets",
      },
    ])("$test", ({ game, expectedBoolean }) => {
      const { mustCurrentGamePlayBeSkipped } = useCurrentGamePlay(ref(game));

      expect(mustCurrentGamePlayBeSkipped.value).toBe(expectedBoolean);
    });
  });

  describe("priorityCauseInCurrentGamePlay", () => {
    it.each<{
      game: Game;
      expectedCause: GamePlayCause | undefined;
      test: string;
    }>([
      {
        game: createFakeGame(),
        expectedCause: undefined,
        test: "should return undefined when game current play is null.",
      },
      {
        game: createFakeGame({ currentPlay: createFakeGamePlaySurvivorsBuryDeadBodies() }),
        expectedCause: undefined,
        test: "should return undefined when game current play causes are undefined.",
      },
      {
        game: createFakeGame({ currentPlay: createFakeGamePlaySurvivorsBuryDeadBodies({ causes: [] }) }),
        expectedCause: undefined,
        test: "should return undefined when game current play causes are empty.",
      },
      {
        game: createFakeGame({ currentPlay: createFakeGamePlaySurvivorsBuryDeadBodies({ causes: ["stuttering-judge-request", "angel-presence"] }) }),
        expectedCause: "angel-presence",
        test: "should return angel presence when game current play causes includes angel presence.",
      },
      {
        game: createFakeGame({ currentPlay: createFakeGamePlaySurvivorsBuryDeadBodies({ causes: ["stuttering-judge-request"] }) }),
        expectedCause: "stuttering-judge-request",
        test: "should return stuttering judge request when game current play causes includes stuttering judge request.",
      },
      {
        game: createFakeGame({ currentPlay: createFakeGamePlaySurvivorsBuryDeadBodies({ causes: ["previous-votes-were-in-ties", "angel-presence", "stuttering-judge-request"] }) }),
        expectedCause: "previous-votes-were-in-ties",
        test: "should return previous votes were in ties when game current play causes includes previous votes were in ties.",
      },
    ])("$test", ({ game, expectedCause }) => {
      const { priorityCauseInCurrentGamePlay } = useCurrentGamePlay(ref(game));

      expect(priorityCauseInCurrentGamePlay.value).toBe(expectedCause);
    });
  });

  describe("getEligibleTargetsWithInteractionInCurrentGamePlay", () => {
    const foundPlayersWithInteraction = [
      createFakePlayer(),
      createFakePlayer(),
      createFakePlayer(),
    ];

    it.each<{
      game: Game;
      interaction: PlayerInteractionType;
      expectedPlayers: Player[];
      test: string;
    }>([
      {
        game: createFakeGame(),
        interaction: "steal-role",
        expectedPlayers: [],
        test: "should return empty array when game current play is null.",
      },
      {
        game: createFakeGame({ currentPlay: createFakeGamePlaySurvivorsBuryDeadBodies() }),
        interaction: "steal-role",
        expectedPlayers: [],
        test: "should return empty array when game current play source interactions are undefined.",
      },
      {
        game: createFakeGame({
          currentPlay: createFakeGamePlaySurvivorsBuryDeadBodies({
            source: createFakeGamePlaySource({
              interactions: [
                createFakeGamePlaySourceInteraction({
                  type: "charm",
                  eligibleTargets: [createFakePlayer()],
                }),
              ],
            }),
          }),
        }),
        interaction: "steal-role",
        expectedPlayers: [],
        test: "should return empty array when game current play interaction is not found among interactions.",
      },
      {
        game: createFakeGame({
          currentPlay: createFakeGamePlaySurvivorsBuryDeadBodies({
            source: createFakeGamePlaySource({
              interactions: [
                createFakeGamePlaySourceInteraction({
                  type: "charm",
                  eligibleTargets: [
                    createFakePlayer(),
                    createFakePlayer(),
                  ],
                }),
                createFakeGamePlaySourceInteraction({
                  type: "steal-role",
                  eligibleTargets: foundPlayersWithInteraction,
                }),
              ],
            }),
          }),
        }),
        interaction: "steal-role",
        expectedPlayers: foundPlayersWithInteraction,
        test: "should return player when game current play interaction is found among interactable players.",
      },
    ])("$test", ({ game, interaction, expectedPlayers }) => {
      const { getEligibleTargetsWithInteractionInCurrentGamePlay } = useCurrentGamePlay(ref(game));

      expect(getEligibleTargetsWithInteractionInCurrentGamePlay(interaction)).toStrictEqual<Player[] | undefined>(expectedPlayers);
    });
  });
});