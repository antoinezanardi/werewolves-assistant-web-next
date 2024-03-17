import type { MakeGamePlayDto } from "~/composables/api/game/dto/make-game-play/make-game-play.dto";
import type { Game } from "~/composables/api/game/types/game.class";
import { useMakeGamePlayDtoValidation } from "~/composables/api/game/useMakeGamePlayDtoValidation";
import { createFakeMakeGamePlayTargetDto } from "~/tests/unit/utils/factories/composables/api/game/dto/make-game-play/make-game-play-target/make-game-play-target.dto.factory";
import { createFakeMakeGamePlayVoteDto } from "~/tests/unit/utils/factories/composables/api/game/dto/make-game-play/make-game-play-vote/make-game-play-vote.dto.factory";
import { createFakeMakeGamePlayDto } from "~/tests/unit/utils/factories/composables/api/game/dto/make-game-play/make-game-play.dto.factory";
import { createFakeGamePlaySourceInteractionBoundaries } from "~/tests/unit/utils/factories/composables/api/game/game-play/game-play-source/game-play-source-interaction/game-play-source-interaction-boundaries/game-play-source-interaction-boundaries.factory";
import { createFakeGamePlaySourceInteraction } from "~/tests/unit/utils/factories/composables/api/game/game-play/game-play-source/game-play-source-interaction/game-play-source-interaction.factory";
import { createFakeGamePlaySource } from "~/tests/unit/utils/factories/composables/api/game/game-play/game-play-source/game-play-source.factory";
import { createFakeGamePlay, createFakeGamePlayActorChoosesCard, createFakeGamePlaySurvivorsVote, createFakeGamePlayThiefChoosesCard, createFakeGamePlayWerewolvesEat, createFakeGamePlayWolfHoundChoosesSide } from "~/tests/unit/utils/factories/composables/api/game/game-play/game-play.factory";
import { createFakeGame } from "~/tests/unit/utils/factories/composables/api/game/game.factory";

describe("Use Make Game Play Dto Validation Composable", () => {
  describe("isCurrentGamePlayVoteTypeAndValid", () => {
    it.each<{
      game: Game;
      makeGamePlayDto: MakeGamePlayDto;
      expected: boolean;
      test: string;
    }>([
      {
        game: createFakeGame({ currentPlay: null }),
        makeGamePlayDto: createFakeMakeGamePlayDto({ votes: [createFakeMakeGamePlayVoteDto()] }),
        expected: false,
        test: "should return false when current play is null.",
      },
      {
        game: createFakeGame({ currentPlay: createFakeGamePlayWerewolvesEat() }),
        makeGamePlayDto: createFakeMakeGamePlayDto({ votes: [createFakeMakeGamePlayVoteDto()] }),
        expected: false,
        test: "should return false when current play type is 'target'.",
      },
      {
        game: createFakeGame({ currentPlay: createFakeGamePlaySurvivorsVote({ source: createFakeGamePlaySource({ interactions: [] }) }) }),
        makeGamePlayDto: createFakeMakeGamePlayDto({ votes: [] }),
        expected: false,
        test: "should return false when interactions are empty.",
      },
      {
        game: createFakeGame({
          currentPlay: createFakeGamePlaySurvivorsVote({
            source: createFakeGamePlaySource({
              interactions: [
                createFakeGamePlaySourceInteraction({
                  boundaries: createFakeGamePlaySourceInteractionBoundaries({
                    min: 1,
                    max: 2,
                  }),
                }),
              ],
            }),
          }),
        }),
        makeGamePlayDto: createFakeMakeGamePlayDto(),
        expected: false,
        test: "should return false when votes are undefined in make game play dto.",
      },
      {
        game: createFakeGame({
          currentPlay: createFakeGamePlaySurvivorsVote({
            source: createFakeGamePlaySource({
              interactions: [
                createFakeGamePlaySourceInteraction({
                  boundaries: createFakeGamePlaySourceInteractionBoundaries({
                    min: 1,
                    max: 2,
                  }),
                }),
              ],
            }),
          }),
        }),
        makeGamePlayDto: createFakeMakeGamePlayDto({ votes: [] }),
        expected: false,
        test: "should return false when votes don't reach the minimum boundary.",
      },
      {
        game: createFakeGame({
          currentPlay: createFakeGamePlaySurvivorsVote({
            source: createFakeGamePlaySource({
              interactions: [
                createFakeGamePlaySourceInteraction({
                  boundaries: createFakeGamePlaySourceInteractionBoundaries({
                    min: 1,
                    max: 2,
                  }),
                }),
              ],
            }),
          }),
        }),
        makeGamePlayDto: createFakeMakeGamePlayDto({ votes: [createFakeMakeGamePlayVoteDto()] }),
        expected: true,
        test: "should return true when votes are equal to eligible targets boundaries min.",
      },
      {
        game: createFakeGame({
          currentPlay: createFakeGamePlaySurvivorsVote({
            source: createFakeGamePlaySource({
              interactions: [
                createFakeGamePlaySourceInteraction({
                  boundaries: createFakeGamePlaySourceInteractionBoundaries({
                    min: 1,
                    max: 2,
                  }),
                }),
              ],
            }),
          }),
        }),
        makeGamePlayDto: createFakeMakeGamePlayDto({
          votes: [
            createFakeMakeGamePlayVoteDto(),
            createFakeMakeGamePlayVoteDto(),
          ],
        }),
        expected: true,
        test: "should return true when votes are greater than eligible targets boundaries min.",
      },
    ])("$test", ({ game, makeGamePlayDto, expected }) => {
      const { isCurrentGamePlayVoteTypeAndValid } = useMakeGamePlayDtoValidation(ref(makeGamePlayDto), ref(game));

      expect(isCurrentGamePlayVoteTypeAndValid.value).toBe(expected);
    });
  });

  describe("isCurrentGamePlayTargetTypeAndValid", () => {
    it.each<{
      game: Game;
      makeGamePlayDto: MakeGamePlayDto;
      expected: boolean;
      test: string;
    }>([
      {
        game: createFakeGame({ currentPlay: null }),
        makeGamePlayDto: createFakeMakeGamePlayDto({ targets: [createFakeMakeGamePlayTargetDto()] }),
        expected: false,
        test: "should return false when current play is null.",
      },
      {
        game: createFakeGame({
          currentPlay: createFakeGamePlaySurvivorsVote({
            source: createFakeGamePlaySource({
              interactions: [
                createFakeGamePlaySourceInteraction({
                  boundaries: createFakeGamePlaySourceInteractionBoundaries({
                    min: 1,
                    max: 2,
                  }),
                }),
              ],
            }),
          }),
        }),
        makeGamePlayDto: createFakeMakeGamePlayDto({ targets: [createFakeMakeGamePlayTargetDto()] }),
        expected: false,
        test: "should return false when current play type is 'vote'.",
      },
      {
        game: createFakeGame({ currentPlay: createFakeGamePlayWerewolvesEat() }),
        makeGamePlayDto: createFakeMakeGamePlayDto({ targets: [createFakeMakeGamePlayTargetDto()] }),
        expected: false,
        test: "should return false when eligible targets are undefined.",
      },
      {
        game: createFakeGame({
          currentPlay: createFakeGamePlayWerewolvesEat({
            source: createFakeGamePlaySource({
              interactions: [
                createFakeGamePlaySourceInteraction({
                  boundaries: createFakeGamePlaySourceInteractionBoundaries({
                    min: 1,
                    max: 2,
                  }),
                }),
              ],
            }),
          }),
        }),
        makeGamePlayDto: createFakeMakeGamePlayDto(),
        expected: false,
        test: "should return false when targets are undefined in make game play dto.",
      },
      {
        game: createFakeGame({
          currentPlay: createFakeGamePlayWerewolvesEat({
            source: createFakeGamePlaySource({
              interactions: [
                createFakeGamePlaySourceInteraction({
                  boundaries: createFakeGamePlaySourceInteractionBoundaries({
                    min: 1,
                    max: 2,
                  }),
                }),
              ],
            }),
          }),
        }),
        makeGamePlayDto: createFakeMakeGamePlayDto({ targets: [] }),
        expected: false,
        test: "should return false when targets don't reach the minimum boundary.",
      },
      {
        game: createFakeGame({
          currentPlay: createFakeGamePlayWerewolvesEat({
            source: createFakeGamePlaySource({
              interactions: [
                createFakeGamePlaySourceInteraction({
                  boundaries: createFakeGamePlaySourceInteractionBoundaries({
                    min: 1,
                    max: 2,
                  }),
                }),
              ],
            }),
          }),
        }),
        makeGamePlayDto: createFakeMakeGamePlayDto({ targets: [createFakeMakeGamePlayTargetDto()] }),
        expected: true,
        test: "should return true when targets are equal to eligible targets boundaries min.",
      },
      {
        game: createFakeGame({
          currentPlay: createFakeGamePlayWerewolvesEat({
            source: createFakeGamePlaySource({
              interactions: [
                createFakeGamePlaySourceInteraction({
                  boundaries: createFakeGamePlaySourceInteractionBoundaries({
                    min: 1,
                    max: 2,
                  }),
                }),
              ],
            }),
          }),
        }),
        makeGamePlayDto: createFakeMakeGamePlayDto({
          targets: [
            createFakeMakeGamePlayTargetDto(),
            createFakeMakeGamePlayTargetDto(),
          ],
        }),
        expected: true,
        test: "should return true when targets are greater than eligible targets boundaries min.",
      },
    ])("$test", ({ game, makeGamePlayDto, expected }) => {
      const { isCurrentGamePlayTargetTypeAndValid } = useMakeGamePlayDtoValidation(ref(makeGamePlayDto), ref(game));

      expect(isCurrentGamePlayTargetTypeAndValid.value).toBe(expected);
    });
  });

  describe("isCurrentGamePlayChooseCardTypeAndValid", () => {
    it.each<{
      game: Game;
      makeGamePlayDto: MakeGamePlayDto;
      expected: boolean;
      test: string;
    }>([
      {
        game: createFakeGame({ currentPlay: createFakeGamePlaySurvivorsVote() }),
        makeGamePlayDto: createFakeMakeGamePlayDto({ chosenCardId: "1" }),
        expected: false,
        test: "should return false when current play type is 'vote'.",
      },
      {
        game: createFakeGame({ currentPlay: null }),
        makeGamePlayDto: createFakeMakeGamePlayDto({ chosenCardId: "1" }),
        expected: false,
        test: "should return false when current play is null.",
      },
      {
        game: createFakeGame({ currentPlay: createFakeGamePlayThiefChoosesCard() }),
        makeGamePlayDto: createFakeMakeGamePlayDto(),
        expected: false,
        test: "should return false when chosen card id is undefined.",
      },
      {
        game: createFakeGame({ currentPlay: createFakeGamePlayThiefChoosesCard() }),
        makeGamePlayDto: createFakeMakeGamePlayDto({ chosenCardId: "1" }),
        expected: true,
        test: "should return true when chosen card id is defined.",
      },
    ])("$test", ({ game, makeGamePlayDto, expected }) => {
      const { isCurrentGamePlayChooseCardTypeAndValid } = useMakeGamePlayDtoValidation(ref(makeGamePlayDto), ref(game));

      expect(isCurrentGamePlayChooseCardTypeAndValid.value).toBe(expected);
    });
  });

  describe("isCurrentGamePlayChooseSideTypeAndValid", () => {
    it.each<{
      game: Game;
      makeGamePlayDto: MakeGamePlayDto;
      expected: boolean;
      test: string;
    }>([
      {
        game: createFakeGame({ currentPlay: createFakeGamePlaySurvivorsVote() }),
        makeGamePlayDto: createFakeMakeGamePlayDto({ chosenSide: "villagers" }),
        expected: false,
        test: "should return false when current play type is 'vote'.",
      },
      {
        game: createFakeGame({ currentPlay: null }),
        makeGamePlayDto: createFakeMakeGamePlayDto({ chosenSide: "villagers" }),
        expected: false,
        test: "should return false when current play is null.",
      },
      {
        game: createFakeGame({ currentPlay: createFakeGamePlayWolfHoundChoosesSide() }),
        makeGamePlayDto: createFakeMakeGamePlayDto(),
        expected: false,
        test: "should return false when chosen side is undefined.",
      },
      {
        game: createFakeGame({ currentPlay: createFakeGamePlayWolfHoundChoosesSide() }),
        makeGamePlayDto: createFakeMakeGamePlayDto({ chosenSide: "villagers" }),
        expected: true,
        test: "should return true when chosen side is defined.",
      },
    ])("$test", ({ game, makeGamePlayDto, expected }) => {
      const { isCurrentGamePlayChooseSideTypeAndValid } = useMakeGamePlayDtoValidation(ref(makeGamePlayDto), ref(game));

      expect(isCurrentGamePlayChooseSideTypeAndValid.value).toBe(expected);
    });
  });

  describe("canCurrentPlayBeSkipped", () => {
    it("should return false when current play can't be skipped.", () => {
      const game = ref(createFakeGame({ currentPlay: createFakeGamePlay({ canBeSkipped: false }) }));
      const makeGamePlayDto = ref(createFakeMakeGamePlayDto());
      const { canCurrentPlayBeSkipped } = useMakeGamePlayDtoValidation(makeGamePlayDto, game);

      expect(canCurrentPlayBeSkipped.value).toBeFalsy();
    });

    it("should return true when current play can be skipped.", () => {
      const game = ref(createFakeGame({ currentPlay: createFakeGamePlay({ canBeSkipped: true }) }));
      const makeGamePlayDto = ref(createFakeMakeGamePlayDto());
      const { canCurrentPlayBeSkipped } = useMakeGamePlayDtoValidation(makeGamePlayDto, game);

      expect(canCurrentPlayBeSkipped.value).toBeTruthy();
    });
  });

  describe("canMakeGamePlay", () => {
    it.each<{
      game: Game;
      makeGamePlayDto: MakeGamePlayDto;
      expected: boolean;
      test: string;
    }>([
      {
        test: "should return true when current play can be skipped.",
        game: createFakeGame({ currentPlay: createFakeGamePlay({ canBeSkipped: true }) }),
        makeGamePlayDto: createFakeMakeGamePlayDto(),
        expected: true,
      },
      {
        game: createFakeGame({
          currentPlay: createFakeGamePlaySurvivorsVote({
            source: createFakeGamePlaySource({
              interactions: [
                createFakeGamePlaySourceInteraction({
                  boundaries: createFakeGamePlaySourceInteractionBoundaries({
                    min: 1,
                    max: 2,
                  }),
                }),
              ],
            }),
          }),
        }),
        makeGamePlayDto: createFakeMakeGamePlayDto({
          votes: [
            createFakeMakeGamePlayVoteDto(),
            createFakeMakeGamePlayVoteDto(),
          ],
        }),
        expected: true,
        test: "should return true when current game play type is vote and votes are greater than eligible targets boundaries min.",
      },
      {
        game: createFakeGame({
          currentPlay: createFakeGamePlayWerewolvesEat({
            source: createFakeGamePlaySource({
              interactions: [
                createFakeGamePlaySourceInteraction({
                  boundaries: createFakeGamePlaySourceInteractionBoundaries({
                    min: 1,
                    max: 2,
                  }),
                }),
              ],
            }),
          }),
        }),
        makeGamePlayDto: createFakeMakeGamePlayDto({
          targets: [
            createFakeMakeGamePlayTargetDto(),
            createFakeMakeGamePlayTargetDto(),
          ],
        }),
        expected: true,
        test: "should return true when current game play type is target and targets are greater than eligible targets boundaries min.",
      },
      {
        game: createFakeGame({ currentPlay: createFakeGamePlayActorChoosesCard({ action: "choose-card" }) }),
        makeGamePlayDto: createFakeMakeGamePlayDto({ chosenCardId: "1" }),
        expected: true,
        test: "should return true when current game play type is choose card and chosen card id is defined.",
      },
      {
        game: createFakeGame({ currentPlay: createFakeGamePlayWolfHoundChoosesSide({ action: "choose-side" }) }),
        makeGamePlayDto: createFakeMakeGamePlayDto({ chosenSide: "villagers" }),
        expected: true,
        test: "should return true when current game play type is choose side and chosen side is defined.",
      },
      {
        game: createFakeGame({ currentPlay: createFakeGamePlayWolfHoundChoosesSide({ action: "choose-side" }) }),
        makeGamePlayDto: createFakeMakeGamePlayDto(),
        expected: false,
        test: "should return false when make game play dto is not valid in any case.",
      },
    ])("$test", ({ game, makeGamePlayDto, expected }) => {
      const { canMakeGamePlay } = useMakeGamePlayDtoValidation(ref(makeGamePlayDto), ref(game));

      expect(canMakeGamePlay.value).toBe(expected);
    });
  });
});