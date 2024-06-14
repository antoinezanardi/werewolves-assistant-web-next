import { createTestingPinia } from "@pinia/testing";
import type { mount } from "@vue/test-utils";
import type { ComponentMountingOptions } from "@vue/test-utils/dist/mount";
import GameCharmedTurnStartsEvent from "~/components/pages/game/GamePlaying/GameEventsMonitor/GameEventsMonitorCurrentEvent/GameTurnStartsEvent/GameCharmedTurnStartsEvent/GameCharmedTurnStartsEvent.vue";
import { useAudioStore } from "~/stores/audio/useAudioStore";
import { StoreIds } from "~/stores/enums/store.enum";
import { useGameStore } from "~/stores/game/useGameStore";
import { createFakeGame } from "@tests/unit/utils/factories/composables/api/game/game.factory";

import { mountSuspendedComponent } from "@tests/unit/utils/helpers/mount.helpers";

describe("Game Charmed Turn Starts Event Component", () => {
  let wrapper: ReturnType<typeof mount<typeof GameCharmedTurnStartsEvent>>;
  const testingPinia = { initialState: { [StoreIds.GAME]: { game: createFakeGame({ turn: 2 }) } } };

  async function mountGameCharmedTurnStartsEventComponent(options: ComponentMountingOptions<typeof GameCharmedTurnStartsEvent> = {}):
  Promise<ReturnType<typeof mount<typeof GameCharmedTurnStartsEvent>>> {
    return mountSuspendedComponent(GameCharmedTurnStartsEvent, {
      global: { plugins: [createTestingPinia(testingPinia)] },
      ...options,
    });
  }

  beforeEach(async() => {
    wrapper = await mountGameCharmedTurnStartsEventComponent();
  });

  it("should match snapshot when rendered.", () => {
    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });

  it("should match snapshot when rendered without shallow rendering.", async() => {
    wrapper = await mountGameCharmedTurnStartsEventComponent({ shallow: false });

    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });

  it("should play magic mood sound effect when rendered.", () => {
    const audioStore = useAudioStore();

    expect(audioStore.playSoundEffect).toHaveBeenCalledExactlyOnceWith("magic-mood");
  });

  describe("Game Event Texts", () => {
    it("should pass event texts when rendered.", () => {
      const gameEventWithTextsComponent = wrapper.findComponent<typeof GameCharmedTurnStartsEvent>("#game-charmed-turn-starts-event");
      const expectedTexts: string[] = ["components.GameCharmedTurnStartsEvent.charmedPeopleMeetEachOtherWithOldOnes"];
      const expectedTextsAsString = expectedTexts.join(",");

      expect(gameEventWithTextsComponent.attributes("texts")).toBe(expectedTextsAsString);
    });

    it("should pass event texts with first meeting of charmed people text when it's the first turn of the game.", async() => {
      const gameStore = useGameStore();
      gameStore.game = createFakeGame({ turn: 1 });
      await nextTick();
      const gameEventWithTextsComponent = wrapper.findComponent<typeof GameCharmedTurnStartsEvent>("#game-charmed-turn-starts-event");
      const expectedTexts: string[] = ["components.GameCharmedTurnStartsEvent.charmedPeopleMeetEachOther"];
      const expectedTextsAsString = expectedTexts.join(",");

      expect(gameEventWithTextsComponent.attributes("texts")).toBe(expectedTextsAsString);
    });
  });
});