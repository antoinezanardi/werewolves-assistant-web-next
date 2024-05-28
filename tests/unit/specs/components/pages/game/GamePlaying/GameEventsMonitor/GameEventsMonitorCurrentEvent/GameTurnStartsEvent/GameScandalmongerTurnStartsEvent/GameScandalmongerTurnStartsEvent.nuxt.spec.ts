import { createTestingPinia } from "@pinia/testing";
import type { mount } from "@vue/test-utils";
import type { ComponentMountingOptions } from "@vue/test-utils/dist/mount";
import GameScandalmongerTurnStartsEvent from "~/components/pages/game/GamePlaying/GameEventsMonitor/GameEventsMonitorCurrentEvent/GameTurnStartsEvent/GameScandalmongerTurnStartsEvent/GameScandalmongerTurnStartsEvent.vue";
import { DEFAULT_GAME_OPTIONS } from "~/composables/api/game/constants/game-options/game-options.constants";
import { StoreIds } from "~/stores/enums/store.enum";
import { createFakeGame } from "~/tests/unit/utils/factories/composables/api/game/game.factory";

import { mountSuspendedComponent } from "~/tests/unit/utils/helpers/mount.helpers";

describe("Game Scandalmonger Turn Starts Event Component", () => {
  let wrapper: ReturnType<typeof mount<typeof GameScandalmongerTurnStartsEvent>>;
  const testingPinia = { initialState: { [StoreIds.GAME]: { game: createFakeGame({ options: DEFAULT_GAME_OPTIONS }) } } };

  async function mountGameScandalmongerTurnStartsEventComponent(options: ComponentMountingOptions<typeof GameScandalmongerTurnStartsEvent> = {}):
  Promise<ReturnType<typeof mount<typeof GameScandalmongerTurnStartsEvent>>> {
    return mountSuspendedComponent(GameScandalmongerTurnStartsEvent, {
      global: { plugins: [createTestingPinia(testingPinia)] },
      ...options,
    });
  }

  beforeEach(async() => {
    wrapper = await mountGameScandalmongerTurnStartsEventComponent();
  });

  it("should match snapshot when rendered.", () => {
    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });

  it("should match snapshot when rendered without shallow rendering.", async() => {
    wrapper = await mountGameScandalmongerTurnStartsEventComponent({ shallow: false });

    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });

  describe("Game Event Texts", () => {
    it("should pass event texts when rendered.", () => {
      const gameEventWithTextsComponent = wrapper.findComponent<typeof GameScandalmongerTurnStartsEvent>("#game-scandalmonger-turn-starts-event");
      const expectedTexts: string[] = [
        "components.GameScandalmongerTurnStartsEvent.scandalmongerCanMarkPlayer",
        `components.GameScandalmongerTurnStartsEvent.playerWillHavePenaltyForNextVotes, {"penalty":2}, 2`,
      ];
      const expectedTextsAsString = expectedTexts.join(",");

      expect(gameEventWithTextsComponent.attributes("texts")).toBe(expectedTextsAsString);
    });
  });
});