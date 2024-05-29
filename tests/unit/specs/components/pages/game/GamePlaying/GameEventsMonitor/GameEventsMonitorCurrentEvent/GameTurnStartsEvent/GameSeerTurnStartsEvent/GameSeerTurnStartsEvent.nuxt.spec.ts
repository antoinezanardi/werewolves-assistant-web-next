import { createTestingPinia } from "@pinia/testing";
import type { mount } from "@vue/test-utils";
import type { ComponentMountingOptions } from "@vue/test-utils/dist/mount";
import GameSeerTurnStartsEvent from "~/components/pages/game/GamePlaying/GameEventsMonitor/GameEventsMonitorCurrentEvent/GameTurnStartsEvent/GameSeerTurnStartsEvent/GameSeerTurnStartsEvent.vue";
import { DEFAULT_GAME_OPTIONS } from "~/composables/api/game/constants/game-options/game-options.constants";
import { StoreIds } from "~/stores/enums/store.enum";
import { useGameStore } from "~/stores/game/useGameStore";
import { createFakeGame } from "~/tests/unit/utils/factories/composables/api/game/game.factory";

import { mountSuspendedComponent } from "~/tests/unit/utils/helpers/mount.helpers";

describe("Game Seer Turn Starts Event Component", () => {
  let wrapper: ReturnType<typeof mount<typeof GameSeerTurnStartsEvent>>;
  const testingPinia = { initialState: { [StoreIds.GAME]: { game: createFakeGame({ options: DEFAULT_GAME_OPTIONS }) } } };

  async function mountGameSeerTurnStartsEventComponent(options: ComponentMountingOptions<typeof GameSeerTurnStartsEvent> = {}):
  Promise<ReturnType<typeof mount<typeof GameSeerTurnStartsEvent>>> {
    return mountSuspendedComponent(GameSeerTurnStartsEvent, {
      global: { plugins: [createTestingPinia(testingPinia)] },
      ...options,
    });
  }

  beforeEach(async() => {
    wrapper = await mountGameSeerTurnStartsEventComponent();
  });

  it("should match snapshot when rendered.", () => {
    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });

  it("should match snapshot when rendered without shallow rendering.", async() => {
    wrapper = await mountGameSeerTurnStartsEventComponent({ shallow: false });

    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });

  describe("Game Event Texts", () => {
    it("should pass event texts when rendered.", () => {
      const gameEventWithTextsComponent = wrapper.findComponent<typeof GameSeerTurnStartsEvent>("#game-seer-turn-starts-event");
      const expectedTexts: string[] = ["components.GameSeerTurnStartsEvent.seerSeesRoles"];
      const expectedTextsAsString = expectedTexts.join(",");

      expect(gameEventWithTextsComponent.attributes("texts")).toBe(expectedTextsAsString);
    });

    it("should pass event texts with seer can see side of the player when the option is activated.", async() => {
      const gameStore = useGameStore();
      gameStore.game.options.roles.seer.canSeeRoles = false;
      await nextTick();
      const gameEventWithTextsComponent = wrapper.findComponent<typeof GameSeerTurnStartsEvent>("#game-seer-turn-starts-event");
      const expectedTexts: string[] = ["components.GameSeerTurnStartsEvent.seerSeesSides"];
      const expectedTextsAsString = expectedTexts.join(",");

      expect(gameEventWithTextsComponent.attributes("texts")).toBe(expectedTextsAsString);
    });
  });
});