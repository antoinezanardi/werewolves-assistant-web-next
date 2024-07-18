import { createTestingPinia } from "@pinia/testing";
import { createFakeGame } from "@tests/unit/utils/factories/composables/api/game/game.factory";
import type { mount } from "@vue/test-utils";
import type { ComponentMountingOptions } from "@vue/test-utils/dist/mount";
import GameBigBadWolfTurnStartsEvent from "~/components/pages/game/GamePlaying/GameEventsMonitor/GameEventsMonitorCurrentEvent/GameTurnStartsEvent/GameBigBadWolfTurnStartsEvent/GameBigBadWolfTurnStartsEvent.vue";
import { DEFAULT_GAME_OPTIONS } from "~/composables/api/game/constants/game-options/game-options.constants";
import { useAudioStore } from "~/stores/audio/useAudioStore";

import { mountSuspendedComponent } from "@tests/unit/utils/helpers/mount.helpers";
import { StoreIds } from "~/stores/enums/store.enum";
import { useGameStore } from "~/stores/game/useGameStore";

describe("Game Big Bad Wolf Turn Starts Event Component", () => {
  const defaultGame = createFakeGame({
    options: DEFAULT_GAME_OPTIONS,
  });
  let wrapper: ReturnType<typeof mount<typeof GameBigBadWolfTurnStartsEvent>>;
  const testingPinia = { initialState: { [StoreIds.GAME]: { game: createFakeGame(defaultGame) } } };

  async function mountGameBigBadWolfTurnStartsEventComponent(options: ComponentMountingOptions<typeof GameBigBadWolfTurnStartsEvent> = {}):
  Promise<ReturnType<typeof mount<typeof GameBigBadWolfTurnStartsEvent>>> {
    return mountSuspendedComponent(GameBigBadWolfTurnStartsEvent, {
      ...options,
      global: { plugins: [createTestingPinia(testingPinia)] },
    });
  }

  beforeEach(async() => {
    wrapper = await mountGameBigBadWolfTurnStartsEventComponent();
    const gameStore = useGameStore();
    gameStore.game = createFakeGame(defaultGame);
  });

  it("should match snapshot when rendered.", () => {
    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });

  it("should match snapshot when rendered without shallow rendering.", async() => {
    wrapper = await mountGameBigBadWolfTurnStartsEventComponent({ shallow: false });

    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });

  it("should play werewolf growling sound effect when rendered.", () => {
    const audioStore = useAudioStore();

    expect(audioStore.playSoundEffect).toHaveBeenCalledExactlyOnceWith("werewolf-growling-2");
  });

  describe("Game Event Texts", () => {
    it("should pass event texts when rendered.", () => {
      const gameEventWithTextsComponent = wrapper.findComponent<typeof GameBigBadWolfTurnStartsEvent>("#game-big-bad-wolf-turn-starts-event");
      const expectedTexts: string[] = ["components.GameBigBadWolfTurnStartsEvent.bigBadWolfEatsVillager"];
      const expectedTextsAsString = expectedTexts.join(",");

      expect(gameEventWithTextsComponent.attributes("texts")).toBe(expectedTextsAsString);
    });

    it("should pass event texts with cannibal big bad wolf when game option is enabled.", async() => {
      const gameStore = useGameStore();
      gameStore.game.options.roles.werewolf.canEatEachOther = true;
      await wrapper.vm.$nextTick();

      const gameEventWithTextsComponent = wrapper.findComponent<typeof GameBigBadWolfTurnStartsEvent>("#game-big-bad-wolf-turn-starts-event");
      const expectedTexts: string[] = [
        "components.GameBigBadWolfTurnStartsEvent.bigBadWolfEatsVillager",
        "components.GameBigBadWolfTurnStartsEvent.bigBadWolfCanEatWerewolves",
      ];
      const expectedTextsAsString = expectedTexts.join(",");

      expect(gameEventWithTextsComponent.attributes("texts")).toBe(expectedTextsAsString);
    });
  });
});