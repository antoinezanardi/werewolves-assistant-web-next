import type { mount } from "@vue/test-utils";
import type GameEventsMonitor from "~/components/pages/game/GamePlaying/GameEventsMonitor/GameEventsMonitor.vue";

import GamePlaying from "~/components/pages/game/GamePlaying/GamePlaying.vue";
import { useGameEventsStore } from "~/stores/game/game-event/useGameEventsStore";
import { createFakeGameEvent } from "~/tests/unit/utils/factories/stores/game/game-event/game-event.factory";
import { mountSuspendedComponent } from "~/tests/unit/utils/helpers/mount.helpers";

describe("Game Playing Component", () => {
  let wrapper: ReturnType<typeof mount<typeof GamePlaying>>;

  beforeEach(async() => {
    wrapper = await mountSuspendedComponent(GamePlaying);
  });

  it("should match snapshot when rendered.", () => {
    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
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