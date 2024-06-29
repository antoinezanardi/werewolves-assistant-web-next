import { createTestingPinia } from "@pinia/testing";
import { createFakeGame } from "@tests/unit/utils/factories/composables/api/game/game.factory";

import { mountSuspendedComponent } from "@tests/unit/utils/helpers/mount.helpers";
import type { mount } from "@vue/test-utils";
import type { ComponentMountingOptions } from "@vue/test-utils/dist/mount";
import GameWitchTurnStartsEvent from "~/components/pages/game/GamePlaying/GameEventsMonitor/GameEventsMonitorCurrentEvent/GameTurnStartsEvent/GameWitchTurnStartsEvent/GameWitchTurnStartsEvent.vue";
import { useAudioStore } from "~/stores/audio/useAudioStore";
import { StoreIds } from "~/stores/enums/store.enum";
import { useGameStore } from "~/stores/game/useGameStore";

describe("Game Witch Turn Starts Event Component", () => {
  const defaultGame = createFakeGame({
    turn: 1,
  });
  let wrapper: ReturnType<typeof mount<typeof GameWitchTurnStartsEvent>>;
  const testingPinia = { initialState: { [StoreIds.GAME]: { game: defaultGame } } };

  async function mountGameWitchTurnStartsEventComponent(options: ComponentMountingOptions<typeof GameWitchTurnStartsEvent> = {}):
  Promise<ReturnType<typeof mount<typeof GameWitchTurnStartsEvent>>> {
    return mountSuspendedComponent(GameWitchTurnStartsEvent, {
      global: {
        plugins: [createTestingPinia(testingPinia)],
      },
      ...options,
    });
  }

  beforeEach(async() => {
    wrapper = await mountGameWitchTurnStartsEventComponent();
  });

  it("should match snapshot when rendered.", () => {
    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });

  it("should match snapshot when rendered without shallow rendering.", async() => {
    wrapper = await mountGameWitchTurnStartsEventComponent({ shallow: false });

    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });

  it("should play witch laughing sound effect when rendered.", () => {
    const audioStore = useAudioStore();

    expect(audioStore.playSoundEffect).toHaveBeenCalledExactlyOnceWith("witch-laughing");
  });

  describe("Game Event Texts", () => {
    it("should pass event texts when rendered.", () => {
      const gameEventWithTextsComponent = wrapper.findComponent<typeof GameWitchTurnStartsEvent>("#game-witch-turn-starts-event");
      const expectedTexts: string[] = ["components.GameWitchTurnStartsEvent.witchCanUsePotions"];
      const expectedTextsAsString = expectedTexts.join(",");

      expect(gameEventWithTextsComponent.attributes("texts")).toBe(expectedTextsAsString);
    });

    it("should pass event texts with game master disclaimer when game's turn is not 1.", async() => {
      const gameStore = useGameStore();
      gameStore.game = createFakeGame({
        turn: 2,
      });
      await nextTick();
      const gameEventWithTextsComponent = wrapper.findComponent<typeof GameWitchTurnStartsEvent>("#game-witch-turn-starts-event");
      const expectedTexts: string[] = [
        "components.GameWitchTurnStartsEvent.witchCanUsePotions",
        "components.GameWitchTurnStartsEvent.gameMasterWillAskHerEventIfUsedPotions",
      ];
      const expectedTextsAsString = expectedTexts.join(",");

      expect(gameEventWithTextsComponent.attributes("texts")).toBe(expectedTextsAsString);
    });
  });
});