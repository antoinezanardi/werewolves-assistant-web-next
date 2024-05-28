import { createTestingPinia } from "@pinia/testing";
import type { mount } from "@vue/test-utils";
import type { ComponentMountingOptions } from "@vue/test-utils/dist/mount";
import GamePhaseStartsEvent from "~/components/pages/game/GamePlaying/GameEventsMonitor/GameEventsMonitorCurrentEvent/GamePhaseStartsEvent/GamePhaseStartsEvent.vue";
import type GameEventWithTexts from "~/components/shared/game/game-event/GameEventWithTexts/GameEventWithTexts.vue";
import GameDayPhaseLottie from "~/components/shared/game/game-phase/GamePhaseLottie/GameDayPhaseLottie/GameDayPhaseLottie.vue";
import GameNightPhaseLottie from "~/components/shared/game/game-phase/GamePhaseLottie/GameNightPhaseLottie/GameNightPhaseLottie.vue";
import type { GamePhaseName } from "~/composables/api/game/types/game-phase/game-phase.types";
import { StoreIds } from "~/stores/enums/store.enum";
import { useGameStore } from "~/stores/game/useGameStore";
import { createFakeGamePhase } from "~/tests/unit/utils/factories/composables/api/game/game-phase/game-phase.factory";
import { createFakeGame } from "~/tests/unit/utils/factories/composables/api/game/game.factory";

import { mountSuspendedComponent } from "~/tests/unit/utils/helpers/mount.helpers";

describe("Game Phase Starts Event Component", () => {
  let wrapper: ReturnType<typeof mount<typeof GamePhaseStartsEvent>>;
  const testingPinia = {
    initialState: {
      [StoreIds.GAME]: {
        game: createFakeGame({
          phase: createFakeGamePhase({
            tick: 1,
            name: "night",
          }),
        }),
      },
    },
  };

  async function mountGamePhaseStartsEventComponent(options: ComponentMountingOptions<typeof GamePhaseStartsEvent> = {}):
  Promise<ReturnType<typeof mount<typeof GamePhaseStartsEvent>>> {
    return mountSuspendedComponent(GamePhaseStartsEvent, {
      global: { plugins: [createTestingPinia(testingPinia)] },
      ...options,
    });
  }

  beforeEach(async() => {
    wrapper = await mountGamePhaseStartsEventComponent();
  });

  it("should match snapshot when rendered.", () => {
    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });

  it("should match snapshot without shallow rendering when rendered for night falling.", async() => {
    wrapper = await mountGamePhaseStartsEventComponent({ shallow: false });

    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });

  it("should match snapshot without shallow rendering when rendered for day rising.", async() => {
    wrapper = await mountGamePhaseStartsEventComponent({
      shallow: false,
      global: {
        plugins: [
          createTestingPinia({
            initialState: {
              [StoreIds.GAME]: {
                game: createFakeGame({
                  phase: createFakeGamePhase({
                    tick: 1,
                    name: "day",
                  }),
                }),
              },
            },
          }),
        ],
      },
    });

    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });

  describe("Game Phase Event Texts", () => {
    it("should pass day rises texts when new game phase is day.", async() => {
      const gameStore = useGameStore();
      gameStore.game.phase.name = "day";
      await nextTick();
      const expectedTexts: string[] = ["components.GamePhaseStartsEvent.dayRises"];
      const expectedTextsAsString = expectedTexts.join(",");
      const gameEventWithTextsComponent = wrapper.findComponent<typeof GameEventWithTexts>("#game-phase-starts-event");

      expect(gameEventWithTextsComponent.attributes("texts")).toBe(expectedTextsAsString);
    });

    it("should pass night falls texts when new game phase is night.", async() => {
      const gameStore = useGameStore();
      gameStore.game.phase.name = "night";
      await nextTick();
      const expectedTexts: string[] = ["components.GamePhaseStartsEvent.nightFalls"];
      const expectedTextsAsString = expectedTexts.join(",");
      const gameEventWithTextsComponent = wrapper.findComponent<typeof GameEventWithTexts>("#game-phase-starts-event");

      expect(gameEventWithTextsComponent.attributes("texts")).toBe(expectedTextsAsString);
    });
  });

  describe("Phase transition", () => {
    describe("Day to Night Transition", () => {
      beforeEach(async() => {
        wrapper = await mountGamePhaseStartsEventComponent({
          global: {
            plugins: [createTestingPinia(testingPinia)],
            stubs: { GameEventWithTexts: false },
          },
        });
      });

      it("should initially render day lottie when new game phase is night.", () => {
        const gameDayPhaseLottieComponent = wrapper.findComponent<typeof GameDayPhaseLottie>(GameDayPhaseLottie);

        expect(gameDayPhaseLottieComponent.exists()).toBeTruthy();
      });

      it("should initially set day lottie height and width when new game phase is night.", () => {
        const gameDayPhaseLottieComponent = wrapper.findComponent<typeof GameDayPhaseLottie>(GameDayPhaseLottie);

        expect(gameDayPhaseLottieComponent.props("height")).toBe("250px");
        expect(gameDayPhaseLottieComponent.props("width")).toBe("250px");
      });

      it("should transition to night lottie when new game phase is night.", async() => {
        (wrapper.vm as unknown as { triggerPhaseTransition: () => void }).triggerPhaseTransition();
        await nextTick();
        const gameNightPhaseLottieComponent = wrapper.findComponent<typeof GameNightPhaseLottie>(GameNightPhaseLottie);

        expect(gameNightPhaseLottieComponent.exists()).toBeTruthy();
      });
    });

    describe("Night to Day Transition", () => {
      beforeEach(async() => {
        wrapper = await mountGamePhaseStartsEventComponent({
          global: {
            plugins: [
              createTestingPinia({
                initialState: {
                  [StoreIds.GAME]: {
                    game: createFakeGame({
                      phase: createFakeGamePhase({
                        tick: 1,
                        name: "day",
                      }),
                    }),
                  },
                },
              }),
            ],
            stubs: { GameEventWithTexts: false },
          },
        });
      });

      it("should initially render night lottie when new game phase is day.", () => {
        const gameNightPhaseLottieComponent = wrapper.findComponent<typeof GameNightPhaseLottie>(GameNightPhaseLottie);

        expect(gameNightPhaseLottieComponent.exists()).toBeTruthy();
      });

      it("should initially set night lottie height and width when new game phase is day.", () => {
        const gameNightPhaseLottieComponent = wrapper.findComponent<typeof GameNightPhaseLottie>(GameNightPhaseLottie);

        expect(gameNightPhaseLottieComponent.props("height")).toBe("200px");
        expect(gameNightPhaseLottieComponent.props("width")).toBe("200px");
      });

      it("should transition to day lottie when new game phase is day.", async() => {
        (wrapper.vm as unknown as { triggerPhaseTransition: () => void }).triggerPhaseTransition();
        await nextTick();
        const gameDayPhaseLottieComponent = wrapper.findComponent<typeof GameDayPhaseLottie>(GameDayPhaseLottie);

        expect(gameDayPhaseLottieComponent.exists()).toBeTruthy();
      });
    });

    it("should set timeout to transition phase when rendered.", async() => {
      const setTimeoutSpy = vi.spyOn(window, "setTimeout");
      wrapper = await mountGamePhaseStartsEventComponent();
      await nextTick();

      expect(setTimeoutSpy).toHaveBeenCalledExactlyOnceWith(expect.any(Function), 1000);
    });

    it("should render any phase lottie when new game phase is not day or night.", async() => {
      const gameStore = useGameStore();
      gameStore.game.phase.name = "twilight" as GamePhaseName;
      await nextTick();
      const gameDayPhaseLottieComponent = wrapper.findComponent<typeof GameDayPhaseLottie>(GameDayPhaseLottie);
      const gameNightPhaseLottieComponent = wrapper.findComponent<typeof GameNightPhaseLottie>(GameNightPhaseLottie);

      expect(gameDayPhaseLottieComponent.exists()).toBeFalsy();
      expect(gameNightPhaseLottieComponent.exists()).toBeFalsy();
    });
  });
});