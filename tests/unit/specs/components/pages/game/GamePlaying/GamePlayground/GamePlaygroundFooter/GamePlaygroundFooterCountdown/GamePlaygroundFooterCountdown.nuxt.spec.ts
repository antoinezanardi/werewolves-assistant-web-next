import type VueCountdown from "@chenfengyuan/vue-countdown";
import { createTestingPinia } from "@pinia/testing";
import { createFakeGamePlayLoversMeetEachOther, createFakeGamePlaySurvivorsElectSheriff, createFakeGamePlaySurvivorsVote, createFakeGamePlayWerewolvesEat } from "@tests/unit/utils/factories/composables/api/game/game-play/game-play.factory";
import { createFakeGame } from "@tests/unit/utils/factories/composables/api/game/game.factory";
import type { VueVm } from "@tests/unit/utils/types/vue-test-utils.types";
import type { mount } from "@vue/test-utils";

import { mountSuspendedComponent } from "@tests/unit/utils/helpers/mount.helpers";
import type { ComponentMountingOptions } from "@vue/test-utils/dist/mount";
import GamePlaygroundFooterCountdown from "~/components/pages/game/GamePlaying/GamePlayground/GamePlaygroundFooter/GamePlaygroundFooterCountdown/GamePlaygroundFooterCountdown.vue";
import type GamePlaygroundFooterCountdownEllipseProgress from "~/components/pages/game/GamePlaying/GamePlayground/GamePlaygroundFooter/GamePlaygroundFooterCountdown/GamePlaygroundFooterCountdownEllipseProgress/GamePlaygroundFooterCountdownEllipseProgress.vue";
import type GamePlaygroundFooterCountdownRemainingTime from "~/components/pages/game/GamePlaying/GamePlayground/GamePlaygroundFooter/GamePlaygroundFooterCountdown/GamePlaygroundFooterCountdownRemainingTime/GamePlaygroundFooterCountdownRemainingTime.vue";
import { DEFAULT_GAME_OPTIONS } from "~/composables/api/game/constants/game-options/game-options.constants";
import type { Game } from "~/composables/api/game/types/game.class";
import { useAudioStore } from "~/stores/audio/useAudioStore";
import { StoreIds } from "~/stores/enums/store.enum";
import { useGameStore } from "~/stores/game/useGameStore";

describe("Game Playground Footer Countdown Component", () => {
  const defaultGame = createFakeGame({
    currentPlay: createFakeGamePlaySurvivorsVote(),
    options: DEFAULT_GAME_OPTIONS,
  });
  const initialState = { [StoreIds.GAME]: { game: createFakeGame(defaultGame) } };
  let wrapper: ReturnType<typeof mount<typeof GamePlaygroundFooterCountdown>>;

  async function mountGamePlaygroundFooterCountdownComponent(options: ComponentMountingOptions<typeof GamePlaygroundFooterCountdown> = {}):
  Promise<ReturnType<typeof mount<typeof GamePlaygroundFooterCountdown>>> {
    return mountSuspendedComponent(GamePlaygroundFooterCountdown, {
      global: { plugins: [createTestingPinia({ initialState })] },
      ...options,
    });
  }

  beforeEach(async() => {
    wrapper = await mountGamePlaygroundFooterCountdownComponent();
    const gameStore = useGameStore();
    gameStore.game = createFakeGame(defaultGame);
  });

  it("should match snapshot when rendered.", () => {
    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });

  describe("Countdown is Over", () => {
    it.each<{
      test: string;
      game: Game;
      expectedText: string;
    }>([
      {
        test: "should translate countdown over for meet each other action when current game play is meet each other.",
        game: createFakeGame({
          currentPlay: createFakeGamePlayLoversMeetEachOther(),
          options: DEFAULT_GAME_OPTIONS,
        }),
        expectedText: "components.GamePlaygroundFooterCountdown.meetEachOtherTimeIsOver",
      },
      {
        test: "should translate countdown over for survivors vote action when current game play is survivors vote.",
        game: createFakeGame({
          currentPlay: createFakeGamePlaySurvivorsVote(),
          options: DEFAULT_GAME_OPTIONS,
        }),
        expectedText: "components.GamePlaygroundFooterCountdown.voteTimeIsOver",
      },
      {
        test: "should translate countdown over for sheriff election action when current game play is sheriff election.",
        game: createFakeGame({
          currentPlay: createFakeGamePlaySurvivorsElectSheriff(),
          options: DEFAULT_GAME_OPTIONS,
        }),
        expectedText: "components.GamePlaygroundFooterCountdown.electSheriffTimeIsOver",
      },
      {
        test: "should set empty text when current game play is not meet each other, survivors vote or sheriff election.",
        game: createFakeGame({
          currentPlay: createFakeGamePlayWerewolvesEat(),
          options: DEFAULT_GAME_OPTIONS,
        }),
        expectedText: "",
      },
      {
        test: "should set empty text when current game play is null.",
        game: createFakeGame({
          currentPlay: null,
          options: DEFAULT_GAME_OPTIONS,
        }),
        expectedText: "",
      },
    ])("$test", async({ game, expectedText }) => {
      const countdown = wrapper.findComponent<typeof VueCountdown>("#game-playground-footer-countdown-component");
      (countdown.vm as VueVm).$emit("end");
      const gameStore = useGameStore();
      gameStore.game = createFakeGame(game);
      await nextTick();
      const countdownOverText = wrapper.find<HTMLSpanElement>("#countdown-over-text");

      expect(countdownOverText.text()).toBe(expectedText);
    });

    it("should play time is up sound effect when countdown is over.", async() => {
      const audioStore = useAudioStore();
      const countdown = wrapper.findComponent<typeof VueCountdown>("#game-playground-footer-countdown-component");
      (countdown.vm as VueVm).$emit("end");
      await nextTick();

      expect(audioStore.playSoundEffect).toHaveBeenCalledExactlyOnceWith("time-is-up");
    });

    it("should not render countdown over text when countdown is not over.", async() => {
      const gameStore = useGameStore();
      gameStore.game = createFakeGame({
        currentPlay: createFakeGamePlaySurvivorsVote(),
        options: DEFAULT_GAME_OPTIONS,
      });
      await nextTick();
      const countdownOverText = wrapper.find<HTMLSpanElement>("#countdown-over-text");

      expect(countdownOverText.exists()).toBeFalsy();
    });
  });

  describe("Countdown is Running", () => {
    describe("Countdown running title", () => {
      it.each<{
        test: string;
        game: Game;
        expectedTitle: string;
      }>([
        {
          test: "should translate countdown running title for meet each other action when current game play is meet each other.",
          game: createFakeGame({
            currentPlay: createFakeGamePlayLoversMeetEachOther(),
            options: DEFAULT_GAME_OPTIONS,
          }),
          expectedTitle: "components.GamePlaygroundFooterCountdown.remainingTimeToMeetEachOther",
        },
        {
          test: "should translate countdown running title for survivors vote action when current game play is survivors vote.",
          game: createFakeGame({
            currentPlay: createFakeGamePlaySurvivorsVote(),
            options: DEFAULT_GAME_OPTIONS,
          }),
          expectedTitle: "components.GamePlaygroundFooterCountdown.remainingTimeToVote",
        },
        {
          test: "should translate countdown running title for sheriff election action when current game play is sheriff election.",
          game: createFakeGame({
            currentPlay: createFakeGamePlaySurvivorsElectSheriff(),
            options: DEFAULT_GAME_OPTIONS,
          }),
          expectedTitle: "components.GamePlaygroundFooterCountdown.remainingTimeToElectSheriff",
        },
        {
          test: "should set empty title when current game play is not meet each other, survivors vote or sheriff election.",
          game: createFakeGame({
            currentPlay: createFakeGamePlayWerewolvesEat(),
            options: DEFAULT_GAME_OPTIONS,
          }),
          expectedTitle: "",
        },
        {
          test: "should set empty title when current game play is null.",
          game: createFakeGame({
            currentPlay: null,
            options: DEFAULT_GAME_OPTIONS,
          }),
          expectedTitle: "",
        },
      ])("$test", async({ game, expectedTitle }) => {
        const gameStore = useGameStore();
        gameStore.game = createFakeGame(game);
        await nextTick();
        const countdownTitle = wrapper.find<HTMLSpanElement>("#countdown-remaining-time-title");

        expect(countdownTitle.text()).toBe(expectedTitle);
      });
    });

    describe("Countdown component", () => {
      it.each <{
        test: string;
        game: Game;
        expectedTime: number;
      }>([
        {
          test: "should pass remaining time in milliseconds for meet each other action when current game play is meet each other.",
          game: createFakeGame({
            currentPlay: createFakeGamePlayLoversMeetEachOther(),
            options: DEFAULT_GAME_OPTIONS,
          }),
          expectedTime: 20000,
        },
        {
          test: "should pass remaining time in milliseconds for survivors vote action when current game play is survivors vote.",
          game: createFakeGame({
            currentPlay: createFakeGamePlaySurvivorsVote(),
            options: DEFAULT_GAME_OPTIONS,
          }),
          expectedTime: 180000,
        },
        {
          test: "should pass remaining time in milliseconds for sheriff election action when current game play is sheriff election.",
          game: createFakeGame({
            currentPlay: createFakeGamePlaySurvivorsElectSheriff(),
            options: DEFAULT_GAME_OPTIONS,
          }),
          expectedTime: 180000,
        },
        {
          test: "should pass 0 remaining time in milliseconds when current game play is not meet each other, survivors vote or sheriff election.",
          game: createFakeGame({
            currentPlay: createFakeGamePlayWerewolvesEat(),
            options: DEFAULT_GAME_OPTIONS,
          }),
          expectedTime: 0,
        },
        {
          test: "should pass 0 remaining time in milliseconds when current game play is null.",
          game: createFakeGame({
            currentPlay: null,
            options: DEFAULT_GAME_OPTIONS,
          }),
          expectedTime: 0,
        },
      ])(`$test`, async({ game, expectedTime }) => {
        const countdown = wrapper.findComponent<typeof VueCountdown>("#game-playground-footer-countdown-component");
        const gameStore = useGameStore();
        gameStore.game = createFakeGame(game);
        await nextTick();

        expect(countdown.props("time")).toBe(expectedTime);
      });

      describe("Countdown Ellipse Progress", () => {
        it("should pass total and remaining seconds to ellipse progress when rendered.", async() => {
          wrapper = await mountGamePlaygroundFooterCountdownComponent({
            shallow: false,
            global: {
              plugins: [createTestingPinia({ initialState })],
              stubs: {
                Ve: true,
              },
            },
          });
          const countdownEllipseProgress = wrapper.findComponent<typeof GamePlaygroundFooterCountdownEllipseProgress>("#game-playground-footer-countdown-ellipse-progress");

          expect(countdownEllipseProgress.props("totalSeconds")).toBe(180);
          expect(countdownEllipseProgress.props("remainingSeconds")).toBe(180);
        });
      });

      describe("Countdown Remaining Time", () => {
        it("should pass minutes and seconds to countdown remaining time when rendered.", async() => {
          wrapper = await mountGamePlaygroundFooterCountdownComponent({
            shallow: false,
            global: {
              plugins: [createTestingPinia({ initialState })],
              stubs: {
                Ve: true,
              },
            },
          });
          const countdownRemainingTime = wrapper.findComponent<typeof GamePlaygroundFooterCountdownRemainingTime>("#game-playground-footer-countdown-remaining-time");

          expect(countdownRemainingTime.props("minutes")).toBe(3);
          expect(countdownRemainingTime.props("seconds")).toBe(0);
        });
      });
    });
  });
});