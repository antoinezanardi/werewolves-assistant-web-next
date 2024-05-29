import { createTestingPinia } from "@pinia/testing";
import type { mount } from "@vue/test-utils";
import type { ComponentMountingOptions } from "@vue/test-utils/dist/mount";
import GameLoversTurnStartsEvent from "~/components/pages/game/GamePlaying/GameEventsMonitor/GameEventsMonitorCurrentEvent/GameTurnStartsEvent/GameLoversTurnStartsEvent/GameLoversTurnStartsEvent.vue";
import { DEFAULT_GAME_OPTIONS } from "~/composables/api/game/constants/game-options/game-options.constants";
import { StoreIds } from "~/stores/enums/store.enum";
import { useGameStore } from "~/stores/game/useGameStore";
import { createFakeGame } from "~/tests/unit/utils/factories/composables/api/game/game.factory";

import { mountSuspendedComponent } from "~/tests/unit/utils/helpers/mount.helpers";

describe("Game Lovers Turn Starts Event Component", () => {
  let wrapper: ReturnType<typeof mount<typeof GameLoversTurnStartsEvent>>;
  const testingPinia = { initialState: { [StoreIds.GAME]: { game: createFakeGame({ options: DEFAULT_GAME_OPTIONS }) } } };

  async function mountGameLoversTurnStartsEventComponent(options: ComponentMountingOptions<typeof GameLoversTurnStartsEvent> = {}):
  Promise<ReturnType<typeof mount<typeof GameLoversTurnStartsEvent>>> {
    return mountSuspendedComponent(GameLoversTurnStartsEvent, {
      global: { plugins: [createTestingPinia(testingPinia)] },
      ...options,
    });
  }

  beforeEach(async() => {
    wrapper = await mountGameLoversTurnStartsEventComponent();
  });

  it("should match snapshot when rendered.", () => {
    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });

  it("should match snapshot when rendered without shallow rendering.", async() => {
    wrapper = await mountGameLoversTurnStartsEventComponent({ shallow: false });

    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });

  describe("Game Event Texts", () => {
    it("should pass event texts when rendered.", () => {
      const gameEventWithTextsComponent = wrapper.findComponent<typeof GameLoversTurnStartsEvent>("#game-lovers-turn-starts-event");
      const expectedTexts: string[] = [
        "components.GameLoversTurnStartsEvent.loversMeetEachOther",
        "components.GameLoversTurnStartsEvent.ifOneLoveDiesOtherDiesToo",
      ];
      const expectedTextsAsString = expectedTexts.join(",");

      expect(gameEventWithTextsComponent.attributes("texts")).toBe(expectedTextsAsString);
    });

    it("should pass event texts with lovers reveal each other roles when option is activated.", async() => {
      const gameStore = useGameStore();
      gameStore.game.options.roles.cupid.lovers.doRevealRoleToEachOther = true;
      await nextTick();
      const gameEventWithTextsComponent = wrapper.findComponent<typeof GameLoversTurnStartsEvent>("#game-lovers-turn-starts-event");
      const expectedTexts: string[] = [
        "components.GameLoversTurnStartsEvent.loversMeetEachOther",
        "components.GameLoversTurnStartsEvent.ifOneLoveDiesOtherDiesToo",
        "components.GameLoversTurnStartsEvent.loversRevealEachOtherRoles",
      ];
      const expectedTextsAsString = expectedTexts.join(",");

      expect(gameEventWithTextsComponent.attributes("texts")).toBe(expectedTextsAsString);
    });
  });
});