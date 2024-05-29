import { createTestingPinia } from "@pinia/testing";
import type { mount } from "@vue/test-utils";
import type { ComponentMountingOptions } from "@vue/test-utils/dist/mount";
import GamePiedPiperTurnStartsEvent from "~/components/pages/game/GamePlaying/GameEventsMonitor/GameEventsMonitorCurrentEvent/GameTurnStartsEvent/GamePiedPiperTurnStartsEvent/GamePiedPiperTurnStartsEvent.vue";
import { DEFAULT_GAME_OPTIONS } from "~/composables/api/game/constants/game-options/game-options.constants";
import { StoreIds } from "~/stores/enums/store.enum";
import { createFakeGame } from "~/tests/unit/utils/factories/composables/api/game/game.factory";

import { mountSuspendedComponent } from "~/tests/unit/utils/helpers/mount.helpers";

describe("Game Pied Piper Turn Starts Event Component", () => {
  let wrapper: ReturnType<typeof mount<typeof GamePiedPiperTurnStartsEvent>>;
  const testingPinia = { initialState: { [StoreIds.GAME]: { game: createFakeGame({ options: DEFAULT_GAME_OPTIONS }) } } };

  async function mountGamePiedPiperTurnStartsEventComponent(options: ComponentMountingOptions<typeof GamePiedPiperTurnStartsEvent> = {}):
  Promise<ReturnType<typeof mount<typeof GamePiedPiperTurnStartsEvent>>> {
    return mountSuspendedComponent(GamePiedPiperTurnStartsEvent, {
      global: { plugins: [createTestingPinia(testingPinia)] },
      ...options,
    });
  }

  beforeEach(async() => {
    wrapper = await mountGamePiedPiperTurnStartsEventComponent();
  });

  it("should match snapshot when rendered.", () => {
    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });

  it("should match snapshot when rendered without shallow rendering.", async() => {
    wrapper = await mountGamePiedPiperTurnStartsEventComponent({ shallow: false });

    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });

  describe("Game Event Texts", () => {
    it("should pass event texts when rendered.", () => {
      const gameEventWithTextsComponent = wrapper.findComponent<typeof GamePiedPiperTurnStartsEvent>("#game-pied-piper-turn-starts-event");
      const expectedTexts: string[] = ["components.GamePiedPiperTurnStartsEvent.piedPiperCharmsPeople, {\"count\":2}, 2"];
      const expectedTextsAsString = expectedTexts.join(",");

      expect(gameEventWithTextsComponent.attributes("texts")).toBe(expectedTextsAsString);
    });
  });
});