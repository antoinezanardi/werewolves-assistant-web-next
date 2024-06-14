import type { mount } from "@vue/test-utils";
import type { ComponentMountingOptions } from "@vue/test-utils/dist/mount";
import GameBigBadWolfTurnStartsEvent from "~/components/pages/game/GamePlaying/GameEventsMonitor/GameEventsMonitorCurrentEvent/GameTurnStartsEvent/GameBigBadWolfTurnStartsEvent/GameBigBadWolfTurnStartsEvent.vue";
import { useAudioStore } from "~/stores/audio/useAudioStore";

import { mountSuspendedComponent } from "@tests/unit/utils/helpers/mount.helpers";

describe("Game Big Bad Wolf Turn Starts Event Component", () => {
  let wrapper: ReturnType<typeof mount<typeof GameBigBadWolfTurnStartsEvent>>;

  async function mountGameBigBadWolfTurnStartsEventComponent(options: ComponentMountingOptions<typeof GameBigBadWolfTurnStartsEvent> = {}):
  Promise<ReturnType<typeof mount<typeof GameBigBadWolfTurnStartsEvent>>> {
    return mountSuspendedComponent(GameBigBadWolfTurnStartsEvent, { ...options });
  }

  beforeEach(async() => {
    wrapper = await mountGameBigBadWolfTurnStartsEventComponent();
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
  });
});