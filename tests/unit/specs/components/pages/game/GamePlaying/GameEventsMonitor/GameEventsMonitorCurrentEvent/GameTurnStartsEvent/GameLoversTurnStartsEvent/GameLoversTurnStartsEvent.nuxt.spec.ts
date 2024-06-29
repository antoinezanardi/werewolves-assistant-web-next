import { createTestingPinia } from "@pinia/testing";
import type { mount } from "@vue/test-utils";
import type { ComponentMountingOptions } from "@vue/test-utils/dist/mount";
import GameLoversTurnStartsEvent from "~/components/pages/game/GamePlaying/GameEventsMonitor/GameEventsMonitorCurrentEvent/GameTurnStartsEvent/GameLoversTurnStartsEvent/GameLoversTurnStartsEvent.vue";
import { DEFAULT_GAME_OPTIONS } from "~/composables/api/game/constants/game-options/game-options.constants";
import { useAudioStore } from "~/stores/audio/useAudioStore";
import { StoreIds } from "~/stores/enums/store.enum";
import { useGameStore } from "~/stores/game/useGameStore";
import { createFakeGame } from "@tests/unit/utils/factories/composables/api/game/game.factory";

import { mountSuspendedComponent } from "@tests/unit/utils/helpers/mount.helpers";

describe("Game Lovers Turn Starts Event Component", () => {
  let wrapper: ReturnType<typeof mount<typeof GameLoversTurnStartsEvent>>;
  const defaultGame = createFakeGame({ options: DEFAULT_GAME_OPTIONS });
  const testingPinia = { initialState: { [StoreIds.GAME]: { game: createFakeGame(defaultGame) } } };

  async function mountGameLoversTurnStartsEventComponent(options: ComponentMountingOptions<typeof GameLoversTurnStartsEvent> = {}):
  Promise<ReturnType<typeof mount<typeof GameLoversTurnStartsEvent>>> {
    return mountSuspendedComponent(GameLoversTurnStartsEvent, {
      global: { plugins: [createTestingPinia(testingPinia)] },
      ...options,
    });
  }

  beforeEach(async() => {
    testingPinia.initialState[StoreIds.GAME].game = createFakeGame(defaultGame);
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

  it("should play heartbeat sound effect when rendered.", () => {
    const audioStore = useAudioStore();

    expect(audioStore.playSoundEffect).toHaveBeenCalledExactlyOnceWith("heartbeat");
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

    it("should pass event texts with cupid when game option is activated.", async() => {
      const gameStore = useGameStore();
      gameStore.game.options.roles.cupid.mustWinWithLovers = true;
      await nextTick();
      const gameEventWithTextsComponent = wrapper.findComponent<typeof GameLoversTurnStartsEvent>("#game-lovers-turn-starts-event");
      const expectedTexts: string[] = [
        "components.GameLoversTurnStartsEvent.loversAndCupidMeetEachOther",
        "components.GameLoversTurnStartsEvent.ifOneLoveDiesOtherDiesTooButNotCupid",
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