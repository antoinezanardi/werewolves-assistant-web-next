import { createTestingPinia } from "@pinia/testing";
import type { mount } from "@vue/test-utils";
import type { ComponentMountingOptions } from "@vue/test-utils/dist/mount";
import GameWerewolvesTurnStartsEvent from "~/components/pages/game/GamePlaying/GameEventsMonitor/GameEventsMonitorCurrentEvent/GameTurnStartsEvent/GameWerewolvesTurnStartsEvent/GameWerewolvesTurnStartsEvent.vue";
import { useAudioStore } from "~/stores/audio/useAudioStore";
import { StoreIds } from "~/stores/enums/store.enum";
import { useGameStore } from "~/stores/game/useGameStore";
import { createFakeGame } from "@tests/unit/utils/factories/composables/api/game/game.factory";

import { mountSuspendedComponent } from "@tests/unit/utils/helpers/mount.helpers";

describe("Game Werewolves Turn Starts Event Component", () => {
  let wrapper: ReturnType<typeof mount<typeof GameWerewolvesTurnStartsEvent>>;
  const testingPinia = { initialState: { [StoreIds.GAME]: { game: createFakeGame({ turn: 1 }) } } };

  async function mountGameWerewolvesTurnStartsEventComponent(options: ComponentMountingOptions<typeof GameWerewolvesTurnStartsEvent> = {}):
  Promise<ReturnType<typeof mount<typeof GameWerewolvesTurnStartsEvent>>> {
    return mountSuspendedComponent(GameWerewolvesTurnStartsEvent, {
      global: { plugins: [createTestingPinia(testingPinia)] },
      ...options,
    });
  }

  beforeEach(async() => {
    wrapper = await mountGameWerewolvesTurnStartsEventComponent();
  });

  it("should match snapshot when rendered.", () => {
    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });

  it("should match snapshot when rendered without shallow rendering.", async() => {
    wrapper = await mountGameWerewolvesTurnStartsEventComponent({ shallow: false });

    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });

  it("should play werewolf howling sound effect when rendered.", () => {
    const audioStore = useAudioStore();

    expect(audioStore.playSoundEffect).toHaveBeenCalledExactlyOnceWith("werewolf-howling");
  });

  describe("Game Event Texts", () => {
    it("should pass event texts when it's the first night.", () => {
      const gameEventWithTextsComponent = wrapper.findComponent<typeof GameWerewolvesTurnStartsEvent>("#game-werewolves-turn-starts-event");
      const expectedTexts: string[] = [
        "components.GameWerewolvesTurnStartsEvent.werewolvesMeetEachOtherForFirstTime",
        "components.GameWerewolvesTurnStartsEvent.whenMeetOverWerewolvesEat",
      ];
      const expectedTextsAsString = expectedTexts.join(",");

      expect(gameEventWithTextsComponent.attributes("texts")).toBe(expectedTextsAsString);
    });

    it("should pass event texts when it's not the first night.", async() => {
      const gameStore = useGameStore();
      gameStore.game.turn = 2;
      await nextTick();
      const gameEventWithTextsComponent = wrapper.findComponent<typeof GameWerewolvesTurnStartsEvent>("#game-werewolves-turn-starts-event");
      const expectedTexts: string[] = ["components.GameWerewolvesTurnStartsEvent.werewolvesEat"];
      const expectedTextsAsString = expectedTexts.join(",");

      expect(gameEventWithTextsComponent.attributes("texts")).toBe(expectedTextsAsString);
    });
  });
});