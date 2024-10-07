import { createTestingPinia } from "@pinia/testing";
import type { mount } from "@vue/test-utils";
import type { ComponentMountingOptions } from "@vue/test-utils/dist/mount";

import GameCupidTurnStartsEvent from "~/components/pages/game/GamePlaying/GameEventsMonitor/GameEventsMonitorCurrentEvent/GameTurnStartsEvent/GameCupidTurnStartsEvent/GameCupidTurnStartsEvent.vue";
import { DEFAULT_GAME_OPTIONS } from "~/composables/api/game/constants/game-options/game-options.constants";
import { useAudioStore } from "~/stores/audio/useAudioStore";
import { StoreIds } from "~/stores/enums/store.enum";
import { useGameStore } from "~/stores/game/useGameStore";
import { createFakeGame } from "@tests/unit/utils/factories/composables/api/game/game.factory";
import { mountSuspendedComponent } from "@tests/unit/utils/helpers/mount.helpers";

describe("Game Cupid Turn Starts Event Component", () => {
  let wrapper: ReturnType<typeof mount<typeof GameCupidTurnStartsEvent>>;
  const defaultGame = createFakeGame({ options: DEFAULT_GAME_OPTIONS });
  const testingPinia = { initialState: { [StoreIds.GAME]: { game: createFakeGame(defaultGame) } } };

  async function mountGameCupidTurnStartsEventComponent(options: ComponentMountingOptions<typeof GameCupidTurnStartsEvent> = {}):
  Promise<ReturnType<typeof mount<typeof GameCupidTurnStartsEvent>>> {
    return mountSuspendedComponent(GameCupidTurnStartsEvent, {
      global: { plugins: [createTestingPinia(testingPinia)] },
      ...options,
    });
  }

  beforeEach(async() => {
    testingPinia.initialState[StoreIds.GAME].game = createFakeGame(defaultGame);
    wrapper = await mountGameCupidTurnStartsEventComponent();
  });

  it("should match snapshot when rendered.", () => {
    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });

  it("should match snapshot when rendered without shallow rendering.", async() => {
    wrapper = await mountGameCupidTurnStartsEventComponent({ shallow: false });

    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });

  it("should play love arrow shot sound effect when rendered.", () => {
    const audioStore = useAudioStore();

    expect(audioStore.playSoundEffect).toHaveBeenCalledExactlyOnceWith("love-arrow-shot");
  });

  describe("Game Event Texts", () => {
    it("should pass event texts with cupid must win with lovers text when the options is activated.", async() => {
      const gameStore = useGameStore();
      gameStore.game.options.roles.cupid.mustWinWithLovers = true;
      await nextTick();
      const gameEventWithTextsComponent = wrapper.findComponent<typeof GameCupidTurnStartsEvent>("#game-cupid-turn-starts-event");
      const expectedTexts: string[] = [
        "components.GameCupidTurnStartsEvent.cupidChoosesTwoPlayersToBeLovers",
        "components.GameCupidTurnStartsEvent.cupidMustWinWithLovers",
      ];
      const expectedTextsAsString = expectedTexts.join(",");

      expect(gameEventWithTextsComponent.attributes("texts")).toBe(expectedTextsAsString);
    });

    it("should pass event texts when rendered.", () => {
      const gameEventWithTextsComponent = wrapper.findComponent<typeof GameCupidTurnStartsEvent>("#game-cupid-turn-starts-event");
      const expectedTexts: string[] = [
        "components.GameCupidTurnStartsEvent.cupidChoosesTwoPlayersToBeLovers",
        "components.GameCupidTurnStartsEvent.cupidCanChooseHimself",
      ];
      const expectedTextsAsString = expectedTexts.join(",");

      expect(gameEventWithTextsComponent.attributes("texts")).toBe(expectedTextsAsString);
    });
  });
});