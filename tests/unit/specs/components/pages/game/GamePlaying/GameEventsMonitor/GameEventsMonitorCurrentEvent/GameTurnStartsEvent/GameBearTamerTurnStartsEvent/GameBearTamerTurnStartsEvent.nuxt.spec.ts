import type { mount } from "@vue/test-utils";
import type { ComponentMountingOptions } from "@vue/test-utils/dist/mount";
import GameBearTamerTurnStartsEvent from "~/components/pages/game/GamePlaying/GameEventsMonitor/GameEventsMonitorCurrentEvent/GameTurnStartsEvent/GameBearTamerTurnStartsEvent/GameBearTamerTurnStartsEvent.vue";
import { useAudioStore } from "~/stores/audio/useAudioStore";

import { mountSuspendedComponent } from "~/tests/unit/utils/helpers/mount.helpers";

describe("Game Bear Tamer Turn Starts Event Component", () => {
  let wrapper: ReturnType<typeof mount<typeof GameBearTamerTurnStartsEvent>>;

  async function mountGameBearTamerTurnStartsEventComponent(options: ComponentMountingOptions<typeof GameBearTamerTurnStartsEvent> = {}):
  Promise<ReturnType<typeof mount<typeof GameBearTamerTurnStartsEvent>>> {
    return mountSuspendedComponent(GameBearTamerTurnStartsEvent, { ...options });
  }

  beforeEach(async() => {
    wrapper = await mountGameBearTamerTurnStartsEventComponent();
  });

  it("should match snapshot when rendered.", () => {
    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });

  it("should match snapshot when rendered without shallow rendering.", async() => {
    wrapper = await mountGameBearTamerTurnStartsEventComponent({ shallow: false });

    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });

  it("should play bear growling sound effect when rendered.", () => {
    const audioStore = useAudioStore();

    expect(audioStore.playSoundEffect).toHaveBeenCalledExactlyOnceWith("bear-growling");
  });

  describe("Game Starts Event Texts", () => {
    it("should pass event texts when rendered.", () => {
      const gameEventWithTextsComponent = wrapper.findComponent<typeof GameBearTamerTurnStartsEvent>("#game-bear-tamer-turn-starts-event");
      const expectedTexts: string[] = ["components.GameBearTamerTurnStartsEvent.bearTamerGrowls"];
      const expectedTextsAsString = expectedTexts.join(",");

      expect(gameEventWithTextsComponent.attributes("texts")).toBe(expectedTextsAsString);
    });
  });
});