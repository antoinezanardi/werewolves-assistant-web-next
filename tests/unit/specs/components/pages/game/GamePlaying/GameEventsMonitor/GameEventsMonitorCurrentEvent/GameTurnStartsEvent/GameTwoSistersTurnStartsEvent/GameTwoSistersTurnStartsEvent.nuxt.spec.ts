import { createTestingPinia } from "@pinia/testing";
import type { mount } from "@vue/test-utils";
import type { ComponentMountingOptions } from "@vue/test-utils/dist/mount";
import GameTwoSistersTurnStartsEvent from "~/components/pages/game/GamePlaying/GameEventsMonitor/GameEventsMonitorCurrentEvent/GameTurnStartsEvent/GameTwoSistersTurnStartsEvent/GameTwoSistersTurnStartsEvent.vue";
import { DEFAULT_GAME_OPTIONS } from "~/composables/api/game/constants/game-options/game-options.constants";
import { useAudioStore } from "~/stores/audio/useAudioStore";
import { StoreIds } from "~/stores/enums/store.enum";
import { useGameStore } from "~/stores/game/useGameStore";
import { createFakeGame } from "@tests/unit/utils/factories/composables/api/game/game.factory";

import { mountSuspendedComponent } from "@tests/unit/utils/helpers/mount.helpers";

describe("Game Two Sisters Turn Starts Event Component", () => {
  let wrapper: ReturnType<typeof mount<typeof GameTwoSistersTurnStartsEvent>>;
  const testingPinia = {
    initialState: {
      [StoreIds.GAME]: {
        game: createFakeGame({
          turn: 1,
          options: DEFAULT_GAME_OPTIONS,
        }),
      },
    },
  };

  async function mountGameTwoSistersTurnStartsEventComponent(options: ComponentMountingOptions<typeof GameTwoSistersTurnStartsEvent> = {}):
  Promise<ReturnType<typeof mount<typeof GameTwoSistersTurnStartsEvent>>> {
    return mountSuspendedComponent(GameTwoSistersTurnStartsEvent, {
      global: { plugins: [createTestingPinia(testingPinia)] },
      ...options,
    });
  }

  beforeEach(async() => {
    wrapper = await mountGameTwoSistersTurnStartsEventComponent();
  });

  it("should match snapshot when rendered.", () => {
    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });

  it("should match snapshot when rendered without shallow rendering.", async() => {
    wrapper = await mountGameTwoSistersTurnStartsEventComponent({ shallow: false });

    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });

  it("should play girls playing sound effect when rendered.", () => {
    const audioStore = useAudioStore();

    expect(audioStore.playSoundEffect).toHaveBeenCalledExactlyOnceWith("girls-playing");
  });

  describe("Game Event Texts", () => {
    it("should pass event texts when it's the first night.", () => {
      const gameEventWithTextsComponent = wrapper.findComponent<typeof GameTwoSistersTurnStartsEvent>("#game-two-sisters-turn-starts-event");
      const expectedTexts: string[] = ["components.GameTwoSistersTurnStartsEvent.twoSistersMeetEachOtherForFirstTime"];
      const expectedTextsAsString = expectedTexts.join(",");

      expect(gameEventWithTextsComponent.attributes("texts")).toBe(expectedTextsAsString);
    });

    it("should pass event texts when it's not the first night.", async() => {
      const gameStore = useGameStore();
      gameStore.game.turn = 2;
      await nextTick();
      const gameEventWithTextsComponent = wrapper.findComponent<typeof GameTwoSistersTurnStartsEvent>("#game-two-sisters-turn-starts-event");
      const expectedTexts: string[] = ["components.GameTwoSistersTurnStartsEvent.twoSistersMeetEachOther"];
      const expectedTextsAsString = expectedTexts.join(",");

      expect(gameEventWithTextsComponent.attributes("texts")).toBe(expectedTextsAsString);
    });
  });
});