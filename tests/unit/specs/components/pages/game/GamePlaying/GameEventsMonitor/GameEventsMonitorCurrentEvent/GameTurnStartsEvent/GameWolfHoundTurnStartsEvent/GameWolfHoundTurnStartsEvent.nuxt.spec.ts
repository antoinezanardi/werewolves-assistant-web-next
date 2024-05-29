import { createTestingPinia } from "@pinia/testing";
import type { mount } from "@vue/test-utils";
import type { ComponentMountingOptions } from "@vue/test-utils/dist/mount";
import GameWolfHoundTurnStartsEvent from "~/components/pages/game/GamePlaying/GameEventsMonitor/GameEventsMonitorCurrentEvent/GameTurnStartsEvent/GameWolfHoundTurnStartsEvent/GameWolfHoundTurnStartsEvent.vue";
import { DEFAULT_GAME_OPTIONS } from "~/composables/api/game/constants/game-options/game-options.constants";
import { StoreIds } from "~/stores/enums/store.enum";
import { useGameStore } from "~/stores/game/useGameStore";
import { createFakeGame } from "~/tests/unit/utils/factories/composables/api/game/game.factory";

import { mountSuspendedComponent } from "~/tests/unit/utils/helpers/mount.helpers";

describe("Game Wolf Hound Turn Starts Event Component", () => {
  let wrapper: ReturnType<typeof mount<typeof GameWolfHoundTurnStartsEvent>>;
  const testingPinia = { initialState: { [StoreIds.GAME]: { game: createFakeGame({ options: DEFAULT_GAME_OPTIONS }) } } };

  async function mountGameWolfHoundTurnStartsEventComponent(options: ComponentMountingOptions<typeof GameWolfHoundTurnStartsEvent> = {}):
  Promise<ReturnType<typeof mount<typeof GameWolfHoundTurnStartsEvent>>> {
    return mountSuspendedComponent(GameWolfHoundTurnStartsEvent, {
      global: { plugins: [createTestingPinia(testingPinia)] },
      ...options,
    });
  }

  beforeEach(async() => {
    wrapper = await mountGameWolfHoundTurnStartsEventComponent();
  });

  it("should match snapshot when rendered.", () => {
    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });

  it("should match snapshot when rendered without shallow rendering.", async() => {
    wrapper = await mountGameWolfHoundTurnStartsEventComponent({ shallow: false });

    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });

  describe("Game Event Texts", () => {
    it("should pass event texts when rendered.", () => {
      const gameEventWithTextsComponent = wrapper.findComponent<typeof GameWolfHoundTurnStartsEvent>("#game-wolf-hound-turn-starts-event");
      const expectedTexts: string[] = ["components.GameWolfHoundTurnStartsEvent.wolfHoundChoosesSide"];
      const expectedTextsAsString = expectedTexts.join(",");

      expect(gameEventWithTextsComponent.attributes("texts")).toBe(expectedTextsAsString);
    });

    it("should pass event texts with random side when rendered when game option is active.", async() => {
      const gameStore = useGameStore();
      gameStore.game.options.roles.wolfHound.isSideRandomlyChosen = true;
      await nextTick();
      const gameEventWithTextsComponent = wrapper.findComponent<typeof GameWolfHoundTurnStartsEvent>("#game-wolf-hound-turn-starts-event");
      const expectedTexts: string[] = ["components.GameWolfHoundTurnStartsEvent.wolfHoundSideRandomlyChosen"];
      const expectedTextsAsString = expectedTexts.join(",");

      expect(gameEventWithTextsComponent.attributes("texts")).toBe(expectedTextsAsString);
    });
  });
});