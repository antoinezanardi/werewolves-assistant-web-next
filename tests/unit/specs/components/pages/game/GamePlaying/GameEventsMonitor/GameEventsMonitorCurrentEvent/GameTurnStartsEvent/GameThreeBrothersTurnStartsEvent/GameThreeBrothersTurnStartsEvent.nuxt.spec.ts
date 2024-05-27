import { createTestingPinia } from "@pinia/testing";
import type { mount } from "@vue/test-utils";
import type { ComponentMountingOptions } from "@vue/test-utils/dist/mount";
import GameThreeBrothersTurnStartsEvent from "~/components/pages/game/GamePlaying/GameEventsMonitor/GameEventsMonitorCurrentEvent/GameTurnStartsEvent/GameThreeBrothersTurnStartsEvent/GameThreeBrothersTurnStartsEvent.vue";
import { DEFAULT_GAME_OPTIONS } from "~/composables/api/game/constants/game-options/game-options.constants";
import { StoreIds } from "~/stores/enums/store.enum";
import { useGameStore } from "~/stores/game/useGameStore";
import { createFakeGame } from "~/tests/unit/utils/factories/composables/api/game/game.factory";

import { mountSuspendedComponent } from "~/tests/unit/utils/helpers/mount.helpers";

describe("Game Three Brothers Turn Starts Event Component", () => {
  let wrapper: ReturnType<typeof mount<typeof GameThreeBrothersTurnStartsEvent>>;
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

  async function mountGameThreeBrothersTurnStartsEventComponent(options: ComponentMountingOptions<typeof GameThreeBrothersTurnStartsEvent> = {}):
  Promise<ReturnType<typeof mount<typeof GameThreeBrothersTurnStartsEvent>>> {
    return mountSuspendedComponent(GameThreeBrothersTurnStartsEvent, {
      global: { plugins: [createTestingPinia(testingPinia)] },
      ...options,
    });
  }

  beforeEach(async() => {
    wrapper = await mountGameThreeBrothersTurnStartsEventComponent();
  });

  it("should match snapshot when rendered.", () => {
    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });

  it("should match snapshot when rendered without shallow rendering.", async() => {
    wrapper = await mountGameThreeBrothersTurnStartsEventComponent({ shallow: false });

    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });

  describe("Game Event Texts", () => {
    it("should pass event texts when it's the first night.", () => {
      const gameEventWithTextsComponent = wrapper.findComponent<typeof GameThreeBrothersTurnStartsEvent>("#game-three-brothers-turn-starts-event");
      const expectedTexts: string[] = ["components.GameThreeBrothersTurnStartsEvent.threeBrothersMeetEachOtherForFirstTime"];
      const expectedTextsAsString = expectedTexts.join(",");

      expect(gameEventWithTextsComponent.attributes("texts")).toBe(expectedTextsAsString);
    });

    it("should pass event texts when it's not the first night.", async() => {
      const gameStore = useGameStore();
      gameStore.game.turn = 2;
      await nextTick();
      const gameEventWithTextsComponent = wrapper.findComponent<typeof GameThreeBrothersTurnStartsEvent>("#game-three-brothers-turn-starts-event");
      const expectedTexts: string[] = ["components.GameThreeBrothersTurnStartsEvent.threeBrothersMeetEachOther"];
      const expectedTextsAsString = expectedTexts.join(",");

      expect(gameEventWithTextsComponent.attributes("texts")).toBe(expectedTextsAsString);
    });
  });
});