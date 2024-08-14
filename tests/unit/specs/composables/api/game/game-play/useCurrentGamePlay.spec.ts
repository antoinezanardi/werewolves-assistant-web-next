import { createFakeGameAdditionalCard } from "@tests/unit/utils/factories/composables/api/game/game-additional-card/game-additional-card.factory";
import { useCurrentGamePlay } from "~/composables/api/game/game-play/useCurrentGamePlay";
import type { GameAdditionalCard } from "~/composables/api/game/types/game-additional-card/game-additional-card.class";
import type { GamePlayCause } from "~/composables/api/game/types/game-play/game-play.types";
import type { Game } from "~/composables/api/game/types/game.class";
import type { PlayerInteractionType } from "~/composables/api/game/types/players/player-interaction/player-interaction.types";
import type { Player } from "~/composables/api/game/types/players/player.class";
import { createFakeGamePlaySourceInteraction } from "@tests/unit/utils/factories/composables/api/game/game-play/game-play-source/game-play-source-interaction/game-play-source-interaction.factory";
import { createFakeGamePlaySource } from "@tests/unit/utils/factories/composables/api/game/game-play/game-play-source/game-play-source.factory";
import { createFakeGamePlaySheriffDelegates, createFakeGamePlaySurvivorsBuryDeadBodies, createFakeGamePlayThiefChoosesCard } from "@tests/unit/utils/factories/composables/api/game/game-play/game-play.factory";
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

  describe("getEligibleAdditionalCardsToChooseInCurrentGamePlay", () => {
    it.each<{
      game: Game;
      expectedCards: GameAdditionalCard[];
      test: string;
    }>([
      {
        test: "should return empty array when game additional cards are not set.",
        game: createFakeGame(),
        expectedCards: [],
      },
      {
        test: "should return empty array when game current play action is null.",
        game: createFakeGame({
          additionalCards: [
            createFakeGameAdditionalCard(),
            createFakeGameAdditionalCard(),
            createFakeGameAdditionalCard(),
          ],
        }),
        expectedCards: [],
      },
      {
        test: "should return empty array when game current play action is not choose card.",
        game: createFakeGame({
          additionalCards: [
            createFakeGameAdditionalCard(),
            createFakeGameAdditionalCard(),
            createFakeGameAdditionalCard(),
          ],
          currentPlay: createFakeGamePlaySurvivorsBuryDeadBodies(),
        }),
        expectedCards: [],
      },
      {
        test: "should return cards for recipient which are not used yet.",
        game: createFakeGame({
          additionalCards: [
            createFakeGameAdditionalCard({
              _id: "1",
              recipient: "thief",
              isUsed: false,
              roleName: "villager",
            }),
            createFakeGameAdditionalCard({
              _id: "2",
              recipient: "actor",
              isUsed: true,
              roleName: "villager",
            }),
            createFakeGameAdditionalCard({
              _id: "3",
              recipient: "actor",
              isUsed: false,
              roleName: "villager",
            }),
            createFakeGameAdditionalCard({
              _id: "4",
              recipient: "thief",
              isUsed: true,
              roleName: "villager",
            }),
          ],
          currentPlay: createFakeGamePlayThiefChoosesCard(),
        }),
        expectedCards: [
          createFakeGameAdditionalCard({
            recipient: "thief",
            isUsed: false,
            _id: "1",
            roleName: "villager",
          }),
        ],
      },
    ])("$test", ({ game, expectedCards }) => {
      const { getEligibleAdditionalCardsToChooseInCurrentGamePlay } = useCurrentGamePlay(ref(game));

      expect(getEligibleAdditionalCardsToChooseInCurrentGamePlay()).toStrictEqual<GameAdditionalCard[] | undefined>(expectedCards);
    });

    it("should return empty array when game current play action is not choose card with game not a ref.", () => {
      const game = createFakeGame({
        additionalCards: [
          createFakeGameAdditionalCard(),
          createFakeGameAdditionalCard(),
          createFakeGameAdditionalCard(),
        ],
        currentPlay: createFakeGamePlaySurvivorsBuryDeadBodies(),
      });
      const { getEligibleAdditionalCardsToChooseInCurrentGamePlay } = useCurrentGamePlay(game);

      expect(getEligibleAdditionalCardsToChooseInCurrentGamePlay()).toStrictEqual<GameAdditionalCard[]>([]);
    });

    it("should return cards for recipient which are not used yet when game is not a ref.", () => {
      const game = createFakeGame({
        additionalCards: [
          createFakeGameAdditionalCard({
            _id: "1",
            recipient: "thief",
            isUsed: false,
            roleName: "villager",
          }),
          createFakeGameAdditionalCard({
            _id: "2",
            recipient: "actor",
            isUsed: true,
            roleName: "villager",
          }),
          createFakeGameAdditionalCard({
            _id: "3",
            recipient: "actor",
            isUsed: false,
            roleName: "villager",
          }),
          createFakeGameAdditionalCard({
            _id: "4",
            recipient: "thief",
            isUsed: true,
            roleName: "villager",
          }),
        ],
        currentPlay: createFakeGamePlayThiefChoosesCard(),
      });
      const { getEligibleAdditionalCardsToChooseInCurrentGamePlay } = useCurrentGamePlay(game);

      expect(getEligibleAdditionalCardsToChooseInCurrentGamePlay()).toStrictEqual<GameAdditionalCard[]>([
        createFakeGameAdditionalCard({
          recipient: "thief",
          isUsed: false,
          _id: "1",
          roleName: "villager",
        }),
      ]);
    });
  });
});