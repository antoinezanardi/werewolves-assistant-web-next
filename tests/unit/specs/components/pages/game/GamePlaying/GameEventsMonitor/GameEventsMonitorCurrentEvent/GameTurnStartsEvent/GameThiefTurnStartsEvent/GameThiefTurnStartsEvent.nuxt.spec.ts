import { createTestingPinia } from "@pinia/testing";
import type { mount } from "@vue/test-utils";
import type { ComponentMountingOptions } from "@vue/test-utils/dist/mount";
import GameThiefTurnStartsEvent from "~/components/pages/game/GamePlaying/GameEventsMonitor/GameEventsMonitorCurrentEvent/GameTurnStartsEvent/GameThiefTurnStartsEvent/GameThiefTurnStartsEvent.vue";
import { DEFAULT_GAME_OPTIONS } from "~/composables/api/game/constants/game-options/game-options.constants";
import { useAudioStore } from "~/stores/audio/useAudioStore";
import { StoreIds } from "~/stores/enums/store.enum";
import { createFakeGame } from "~/tests/unit/utils/factories/composables/api/game/game.factory";

import { mountSuspendedComponent } from "~/tests/unit/utils/helpers/mount.helpers";

describe("Game Thief Turn Starts Event Component", () => {
  let wrapper: ReturnType<typeof mount<typeof GameThiefTurnStartsEvent>>;
  const testingPinia = { initialState: { [StoreIds.GAME]: { game: createFakeGame({ options: DEFAULT_GAME_OPTIONS }) } } };

  async function mountGameThiefTurnStartsEventComponent(options: ComponentMountingOptions<typeof GameThiefTurnStartsEvent> = {}):
  Promise<ReturnType<typeof mount<typeof GameThiefTurnStartsEvent>>> {
    return mountSuspendedComponent(GameThiefTurnStartsEvent, {
      global: { plugins: [createTestingPinia(testingPinia)] },
      ...options,
    });
  }

  beforeEach(async() => {
    wrapper = await mountGameThiefTurnStartsEventComponent();
  });

  it("should match snapshot when rendered.", () => {
    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });

  it("should match snapshot when rendered without shallow rendering.", async() => {
    wrapper = await mountGameThiefTurnStartsEventComponent({ shallow: false });

    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });

  it("should play evil laugh sound effect when rendered.", () => {
    const audioStore = useAudioStore();

    expect(audioStore.playSoundEffect).toHaveBeenCalledExactlyOnceWith("evil-laugh");
  });

  describe("Game Event Texts", () => {
    it("should pass event texts when rendered.", () => {
      const gameEventWithTextsComponent = wrapper.findComponent<typeof GameThiefTurnStartsEvent>("#game-thief-turn-starts-event");
      const expectedTexts: string[] = [
        "components.GameThiefTurnStartsEvent.thiefCanStealCard, {\"count\":2}, 2",
        "components.GameThiefTurnStartsEvent.gameMasterWillFlipThiefCards, {\"count\":2}, 2",
      ];
      const expectedTextsAsString = expectedTexts.join(",");

      expect(gameEventWithTextsComponent.attributes("texts")).toBe(expectedTextsAsString);
    });
  });
});