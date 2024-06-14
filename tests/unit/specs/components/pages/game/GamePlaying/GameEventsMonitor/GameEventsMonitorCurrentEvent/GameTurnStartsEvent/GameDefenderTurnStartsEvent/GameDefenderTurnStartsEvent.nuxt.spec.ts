import { createTestingPinia } from "@pinia/testing";
import type { mount } from "@vue/test-utils";
import type { ComponentMountingOptions } from "@vue/test-utils/dist/mount";
import GameDefenderTurnStartsEvent from "~/components/pages/game/GamePlaying/GameEventsMonitor/GameEventsMonitorCurrentEvent/GameTurnStartsEvent/GameDefenderTurnStartsEvent/GameDefenderTurnStartsEvent.vue";
import { DEFAULT_GAME_OPTIONS } from "~/composables/api/game/constants/game-options/game-options.constants";
import { useAudioStore } from "~/stores/audio/useAudioStore";
import { StoreIds } from "~/stores/enums/store.enum";
import { useGameStore } from "~/stores/game/useGameStore";
import { createFakeGame } from "@tests/unit/utils/factories/composables/api/game/game.factory";

import { mountSuspendedComponent } from "@tests/unit/utils/helpers/mount.helpers";

describe("Game Defender Turn Starts Event Component", () => {
  let wrapper: ReturnType<typeof mount<typeof GameDefenderTurnStartsEvent>>;
  const testingPinia = {
    initialState: {
      [StoreIds.GAME]: {
        game: createFakeGame({
          turn: 1,
          options: DEFAULT_GAME_OPTIONS,
        }),
      },
    },
  };

  async function mountGameDefenderTurnStartsEventComponent(options: ComponentMountingOptions<typeof GameDefenderTurnStartsEvent> = {}):
  Promise<ReturnType<typeof mount<typeof GameDefenderTurnStartsEvent>>> {
    return mountSuspendedComponent(GameDefenderTurnStartsEvent, {
      global: { plugins: [createTestingPinia(testingPinia)] },
      ...options,
    });
  }

  beforeEach(async() => {
    wrapper = await mountGameDefenderTurnStartsEventComponent();
  });

  it("should match snapshot when rendered.", () => {
    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });

  it("should match snapshot when rendered without shallow rendering.", async() => {
    wrapper = await mountGameDefenderTurnStartsEventComponent({ shallow: false });

    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });

  it("should play sword sound effect when rendered.", () => {
    const audioStore = useAudioStore();

    expect(audioStore.playSoundEffect).toHaveBeenCalledExactlyOnceWith("sword");
  });

  describe("Game Event Texts", () => {
    it("should pass event texts when rendered.", () => {
      const gameEventWithTextsComponent = wrapper.findComponent<typeof GameDefenderTurnStartsEvent>("#game-defender-turn-starts-event");
      const expectedTexts: string[] = ["components.GameDefenderTurnStartsEvent.defenderProtectsAnyone"];
      const expectedTextsAsString = expectedTexts.join(",");

      expect(gameEventWithTextsComponent.attributes("texts")).toBe(expectedTextsAsString);
    });

    it("should pass event texts with defender protects anyone text when the option is activated even if it's not first turn.", async() => {
      const gameStore = useGameStore();
      gameStore.game.options.roles.defender.canProtectTwice = true;
      gameStore.game.turn = 2;
      await nextTick();
      const gameEventWithTextsComponent = wrapper.findComponent<typeof GameDefenderTurnStartsEvent>("#game-defender-turn-starts-event");
      const expectedTexts: string[] = ["components.GameDefenderTurnStartsEvent.defenderProtectsAnyone"];
      const expectedTextsAsString = expectedTexts.join(",");

      expect(gameEventWithTextsComponent.attributes("texts")).toBe(expectedTextsAsString);
    });

    it("should pass event texts with defender can protect anyone but the last protected player text when it's second turn.", async() => {
      const gameStore = useGameStore();
      gameStore.game.turn = 2;
      gameStore.game.options.roles.defender.canProtectTwice = false;
      await nextTick();
      const gameEventWithTextsComponent = wrapper.findComponent<typeof GameDefenderTurnStartsEvent>("#game-defender-turn-starts-event");
      const expectedTexts: string[] = ["components.GameDefenderTurnStartsEvent.defenderProtectsAnyoneExceptLastProtectedPlayer"];
      const expectedTextsAsString = expectedTexts.join(",");

      expect(gameEventWithTextsComponent.attributes("texts")).toBe(expectedTextsAsString);
    });
  });
});