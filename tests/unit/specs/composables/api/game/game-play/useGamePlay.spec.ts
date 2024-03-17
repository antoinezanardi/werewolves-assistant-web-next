import { useGamePlay } from "~/composables/api/game/game-play/useGamePlay";
import type { Game } from "~/composables/api/game/types/game.class";
import type { PlayerInteractionType } from "~/composables/api/game/types/players/player-interaction/player-interaction.types";
import type { Player } from "~/composables/api/game/types/players/player.class";
import { createFakeGamePlaySourceInteraction } from "~/tests/unit/utils/factories/composables/api/game/game-play/game-play-source/game-play-source-interaction/game-play-source-interaction.factory";
import { createFakeGamePlaySource } from "~/tests/unit/utils/factories/composables/api/game/game-play/game-play-source/game-play-source.factory";
import { createFakeGamePlaySurvivorsBuryDeadBodies } from "~/tests/unit/utils/factories/composables/api/game/game-play/game-play.factory";
import { createFakeGame } from "~/tests/unit/utils/factories/composables/api/game/game.factory";
import { createFakePlayer } from "~/tests/unit/utils/factories/composables/api/game/player/player.factory";

describe("Use Game Play Composable", () => {
  describe("getEligibleTargetsWithInteractionInCurrentGamePlay", () => {
    const foundPlayersWithInteraction = [
      createFakePlayer(),
      createFakePlayer(),
      createFakePlayer(),
    ];

    it.each<{
      game: Game;
      interaction: PlayerInteractionType;
      expectedPlayers: Player[] | undefined;
      test: string;
    }>([
      {
        game: createFakeGame(),
        interaction: "steal-role",
        expectedPlayers: undefined,
        test: "should return undefined when game current play is null.",
      },
      {
        game: createFakeGame({ currentPlay: createFakeGamePlaySurvivorsBuryDeadBodies() }),
        interaction: "steal-role",
        expectedPlayers: undefined,
        test: "should return undefined when game current play source interactions are undefined.",
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
        expectedPlayers: undefined,
        test: "should return undefined when game current play interaction is not found among interactions.",
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
      const { getEligibleTargetsWithInteractionInCurrentGamePlay } = useGamePlay(ref(game));

      expect(getEligibleTargetsWithInteractionInCurrentGamePlay(interaction)).toStrictEqual<Player[] | undefined>(expectedPlayers);
    });
  });
});