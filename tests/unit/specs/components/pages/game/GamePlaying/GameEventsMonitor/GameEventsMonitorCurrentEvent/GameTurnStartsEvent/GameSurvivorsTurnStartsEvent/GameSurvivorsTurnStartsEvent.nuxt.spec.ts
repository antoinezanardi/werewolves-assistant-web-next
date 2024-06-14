import { createTestingPinia } from "@pinia/testing";
import type { mount } from "@vue/test-utils";
import type { ComponentMountingOptions } from "@vue/test-utils/dist/mount";
import GameSurvivorsTurnStartsEvent from "~/components/pages/game/GamePlaying/GameEventsMonitor/GameEventsMonitorCurrentEvent/GameTurnStartsEvent/GameSurvivorsTurnStartsEvent/GameSurvivorsTurnStartsEvent.vue";
import type { Game } from "~/composables/api/game/types/game.class";
import type { SoundEffectName } from "~/stores/audio/types/audio.types";
import { useAudioStore } from "~/stores/audio/useAudioStore";
import { StoreIds } from "~/stores/enums/store.enum";
import { useGameStore } from "~/stores/game/useGameStore";
import { createFakeGamePlaySourceInteraction } from "@tests/unit/utils/factories/composables/api/game/game-play/game-play-source/game-play-source-interaction/game-play-source-interaction.factory";
import { createFakeGamePlaySource } from "@tests/unit/utils/factories/composables/api/game/game-play/game-play-source/game-play-source.factory";
import { createFakeGamePlayCupidCharms, createFakeGamePlaySurvivorsBuryDeadBodies, createFakeGamePlaySurvivorsElectSheriff, createFakeGamePlaySurvivorsVote } from "@tests/unit/utils/factories/composables/api/game/game-play/game-play.factory";
import { createFakeGame } from "@tests/unit/utils/factories/composables/api/game/game.factory";
import { createFakePlayer } from "@tests/unit/utils/factories/composables/api/game/player/player.factory";

import { mountSuspendedComponent } from "@tests/unit/utils/helpers/mount.helpers";

describe("Game Survivors Turn Starts Event Component", () => {
  let wrapper: ReturnType<typeof mount<typeof GameSurvivorsTurnStartsEvent>>;
  const testingPinia = { initialState: { [StoreIds.GAME]: { game: createFakeGame({ currentPlay: createFakeGamePlaySurvivorsVote() }) } } };

  async function mountGameSurvivorsTurnStartsEventComponent(options: ComponentMountingOptions<typeof GameSurvivorsTurnStartsEvent> = {}):
  Promise<ReturnType<typeof mount<typeof GameSurvivorsTurnStartsEvent>>> {
    return mountSuspendedComponent(GameSurvivorsTurnStartsEvent, {
      global: { plugins: [createTestingPinia(testingPinia)] },
      ...options,
    });
  }

  beforeEach(async() => {
    wrapper = await mountGameSurvivorsTurnStartsEventComponent();
  });

  it("should match snapshot when rendered.", () => {
    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });

  it("should match snapshot when rendered without shallow rendering.", async() => {
    wrapper = await mountGameSurvivorsTurnStartsEventComponent({ shallow: false });

    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });

  describe("Game Event Texts", () => {
    it.each<{
      game: Game;
      expectedTexts: string[];
      test: string;
    }>([
      {
        game: createFakeGame({ currentPlay: null }),
        expectedTexts: [],
        test: "should not display any texts when there is no current play.",
      },
      {
        game: createFakeGame({ currentPlay: createFakeGamePlayCupidCharms() }),
        expectedTexts: [],
        test: "should not display any texts when the current play source is not a survivors.",
      },
      {
        game: createFakeGame({ currentPlay: createFakeGamePlaySurvivorsElectSheriff() }),
        expectedTexts: ["components.GameSurvivorsTurnStartsEvent.survivorsElectSheriff"],
        test: "should display sheriff election texts when the current play is a sheriff election.",
      },
      {
        game: createFakeGame({
          currentPlay: createFakeGamePlaySurvivorsElectSheriff({
            source: createFakeGamePlaySource({
              interactions: [
                createFakeGamePlaySourceInteraction({
                  type: "choose-as-sheriff",
                  eligibleTargets: [
                    createFakePlayer({ name: "Antoine" }),
                    createFakePlayer({ name: "Benoit" }),
                  ],
                }),
              ],
            }),
            causes: ["previous-votes-were-in-ties"],
          }),
        }),
        expectedTexts: [
          "components.GameSurvivorsTurnStartsEvent.sheriffElectionBecauseOfPreviousTies",
          "components.GameSurvivorsTurnStartsEvent.survivorsMustElectBetween, {\"players\":\"Antoine shared.and Benoit\"}",
        ],
        test: "should display sheriff election with previous tie texts when the current play is a sheriff election and cause is votes in tie.",
      },
      {
        game: createFakeGame({ currentPlay: createFakeGamePlaySurvivorsVote() }),
        expectedTexts: ["components.GameSurvivorsTurnStartsEvent.survivorsVote"],
        test: "should display voting texts for classic vote when there is no particular voting cause.",
      },
      {
        game: createFakeGame({ currentPlay: createFakeGamePlaySurvivorsVote({ causes: ["angel-presence"] }) }),
        expectedTexts: [
          "components.GameSurvivorsTurnStartsEvent.gameStartsWithVoteBecauseOfAngelPresence",
          "components.GameSurvivorsTurnStartsEvent.watchOutForAngelOrHeWins",
        ],
        test: "should display voting texts for angel presence vote when there is a voting cause is angel presence.",
      },
      {
        game: createFakeGame({ currentPlay: createFakeGamePlaySurvivorsVote({ causes: ["stuttering-judge-request"] }) }),
        expectedTexts: ["components.GameSurvivorsTurnStartsEvent.voteBecauseOfStutteringJudge"],
        test: "should display voting texts for stuttering judge vote when there is a voting cause is stuttering judge request.",
      },
      {
        game: createFakeGame({
          currentPlay: createFakeGamePlaySurvivorsVote({
            source: createFakeGamePlaySource({
              interactions: [
                createFakeGamePlaySourceInteraction({
                  type: "vote",
                  eligibleTargets: [
                    createFakePlayer({ name: "Antoine" }),
                    createFakePlayer({ name: "Benoit" }),
                  ],
                }),
              ],
            }),
            causes: ["previous-votes-were-in-ties"],
          }),
        }),
        expectedTexts: [
          "components.GameSurvivorsTurnStartsEvent.voteBecauseOfPreviousTies",
          "components.GameSurvivorsTurnStartsEvent.survivorsMustVoteBetween, {\"players\":\"Antoine shared.and Benoit\"}",
        ],
        test: "should display voting texts when there is a voting cause is previous votes were in tie.",
      },
      {
        game: createFakeGame({ currentPlay: createFakeGamePlaySurvivorsBuryDeadBodies() }),
        expectedTexts: ["components.GameSurvivorsTurnStartsEvent.survivorsBuryDeadBodies"],
        test: "should display bury dead bodies texts when the current play is bury dead bodies.",
      },
    ])("$test", async({ game, expectedTexts }) => {
      const gameStore = useGameStore();
      gameStore.game = game;
      await nextTick();
      const textsAsString = expectedTexts.join(",");

      expect(wrapper.attributes("texts")).toBe(textsAsString);
    });
  });

  describe("Sound Effect", () => {
    it.each<{
      game: Game;
      expectedSoundEffects: SoundEffectName[];
      test: string;
    }>([
      {
        test: "should play dramatic drums sound effect only when there is no current play.",
        game: createFakeGame({ currentPlay: null }),
        expectedSoundEffects: ["dramatic-drums"],
      },
      {
        test: "should play dramatic drums sound effect only when there is no causes.",
        game: createFakeGame({ currentPlay: createFakeGamePlaySurvivorsVote() }),
        expectedSoundEffects: ["dramatic-drums"],
      },
      {
        test: "should play dramatic drums and angelic intervention sound effects when the cause is angelic presence.",
        game: createFakeGame({ currentPlay: createFakeGamePlaySurvivorsVote({ causes: ["angel-presence"] }) }),
        expectedSoundEffects: ["dramatic-drums", "angelic-intervention"],
      },
      {
        test: "should play dramatic drums and gavel hitting sound effects when the cause is stuttering judge request.",
        game: createFakeGame({ currentPlay: createFakeGamePlaySurvivorsVote({ causes: ["stuttering-judge-request"] }) }),
        expectedSoundEffects: ["dramatic-drums", "gavel-hitting"],
      },
    ])("$test", async({ game, expectedSoundEffects }) => {
      const initialState = { [StoreIds.GAME]: { game } };
      wrapper = await mountGameSurvivorsTurnStartsEventComponent({ global: { plugins: [createTestingPinia({ initialState })] } });
      const audioStore = useAudioStore();

      expect(audioStore.playSoundEffect).toHaveBeenCalledTimes(expectedSoundEffects.length);
      for (let i = 0; i < expectedSoundEffects.length; i++) {
        expect(audioStore.playSoundEffect).toHaveBeenNthCalledWith(i + 1, expectedSoundEffects[i]);
      }
    });
  });
});