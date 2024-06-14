import { createTestingPinia } from "@pinia/testing";
import type { mount } from "@vue/test-utils";
import type { ComponentMountingOptions } from "@vue/test-utils/dist/mount";
import type GameEventsMonitor from "~/components/pages/game/GamePlaying/GameEventsMonitor/GameEventsMonitor.vue";

import GamePlaying from "~/components/pages/game/GamePlaying/GamePlaying.vue";
import { useAudioStore } from "~/stores/audio/useAudioStore";
import { StoreIds } from "~/stores/enums/store.enum";
import { useGameEventsStore } from "~/stores/game/game-event/useGameEventsStore";
import { createFakeGamePhase } from "@tests/unit/utils/factories/composables/api/game/game-phase/game-phase.factory";
import { createFakeGame } from "@tests/unit/utils/factories/composables/api/game/game.factory";
import { createFakeGameEvent } from "@tests/unit/utils/factories/stores/game/game-event/game-event.factory";
import { mountSuspendedComponent } from "@tests/unit/utils/helpers/mount.helpers";

describe("Game Playing Component", () => {
  let wrapper: ReturnType<typeof mount<typeof GamePlaying>>;
  const defaultGamePhase = createFakeGamePhase({ name: "night" });
  const defaultGame = createFakeGame({ phase: defaultGamePhase });
  const testingPinia = { initialState: { [StoreIds.GAME]: { game: defaultGame } } };

  async function mountGamePlayingComponent(options: ComponentMountingOptions<typeof GamePlaying> = {}):
  Promise<ReturnType<typeof mount<typeof GamePlaying>>> {
    return mountSuspendedComponent(GamePlaying, {
      global: { plugins: [createTestingPinia(testingPinia)] },
      ...options,
    });
  }

  beforeEach(async() => {
    wrapper = await mountGamePlayingComponent();
  });

  it("should match snapshot when rendered.", () => {
    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });

  it("should play random game phase background audio when rendered.", () => {
    const { playRandomGamePhaseBackgroundAudio } = useAudioStore();

    expect(playRandomGamePhaseBackgroundAudio).toHaveBeenCalledExactlyOnceWith(defaultGamePhase.name);
  });

  describe("Game Events Monitor", () => {
    it("should not render game events monitor when there is no current game event.", () => {
      expect(wrapper.findComponent<typeof GameEventsMonitor>("#game-events-monitor").exists()).toBeFalsy();
    });

    it("should render game events monitor when there is a current game event.", async() => {
      const gameEventsStore = useGameEventsStore();
      gameEventsStore.gameEvents = [
        createFakeGameEvent(),
        createFakeGameEvent(),
        createFakeGameEvent(),
      ];
      await nextTick();

      expect(wrapper.findComponent<typeof GameEventsMonitor>("#game-events-monitor").exists()).toBeTruthy();
    });
  });
});