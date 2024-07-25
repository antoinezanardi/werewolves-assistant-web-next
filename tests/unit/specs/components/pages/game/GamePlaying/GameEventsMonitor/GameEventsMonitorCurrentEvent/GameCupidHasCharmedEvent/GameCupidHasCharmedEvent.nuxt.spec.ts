import { createFakeGameEvent } from "@tests/unit/utils/factories/composables/api/game/game-event/game-event.factory";
import { createFakeSeerAlivePlayer } from "@tests/unit/utils/factories/composables/api/game/player/player-with-role.factory";
import type { mount } from "@vue/test-utils";

import { mountSuspendedComponent } from "@tests/unit/utils/helpers/mount.helpers";
import type { ComponentMountingOptions } from "@vue/test-utils/dist/mount";
import type { CurrentGameEventProps } from "~/components/pages/game/GamePlaying/GameEventsMonitor/GameEventsMonitorCurrentEvent/game-events-monitor-current-event.types";
import GameCupidHasCharmedEvent from "~/components/pages/game/GamePlaying/GameEventsMonitor/GameEventsMonitorCurrentEvent/GameCupidHasCharmedEvent/GameCupidHasCharmedEvent.vue";
import { useAudioStore } from "~/stores/audio/useAudioStore";

describe("Game Cupid Has Charmed Event Component", () => {
  const defaultInLovePlayers = [
    createFakeSeerAlivePlayer({ name: "Antoine" }),
    createFakeSeerAlivePlayer({ name: "Baptiste" }),
  ];
  const defaultProps: CurrentGameEventProps = {
    event: createFakeGameEvent({
      type: "cupid-has-charmed",
      players: defaultInLovePlayers,
    }),
  };
  let wrapper: ReturnType<typeof mount<typeof GameCupidHasCharmedEvent>>;

  async function mountGameCupidHasCharmedEventComponent(options: ComponentMountingOptions<typeof GameCupidHasCharmedEvent> = {}):
  Promise<ReturnType<typeof mount<typeof GameCupidHasCharmedEvent>>> {
    return mountSuspendedComponent(GameCupidHasCharmedEvent, {
      props: defaultProps,
      ...options,
    });
  }

  beforeEach(async() => {
    wrapper = await mountGameCupidHasCharmedEventComponent();
  });

  it("should match snapshot when rendered.", () => {
    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });

  it("should match snapshot when rendered without shallow rendering.", async() => {
    wrapper = await mountGameCupidHasCharmedEventComponent({ shallow: false });

    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });

  describe("Game Event Texts", () => {
    it("should pass event texts when rendered.", () => {
      const gameEventWithTextsComponent = wrapper.findComponent<typeof GameCupidHasCharmedEvent>("#game-cupid-has-charmed-event");
      const expectedTexts: string[] = [
        "components.GameCupidHasCharmedEvent.cupidHasCharmedPlayers",
        "components.GameCupidHasCharmedEvent.gameMasterWillTapInLovePlayers",
      ];
      const expectedTextsAsString = expectedTexts.join(",");

      expect(gameEventWithTextsComponent.attributes("texts")).toBe(expectedTextsAsString);
    });
  });

  describe("Sound Effect", () => {
    it("should play love arrow shot sound effect when rendered.", () => {
      const audioStore = useAudioStore();

      expect(audioStore.playSoundEffect).toHaveBeenCalledExactlyOnceWith("love-arrow-shot");
    });
  });
});