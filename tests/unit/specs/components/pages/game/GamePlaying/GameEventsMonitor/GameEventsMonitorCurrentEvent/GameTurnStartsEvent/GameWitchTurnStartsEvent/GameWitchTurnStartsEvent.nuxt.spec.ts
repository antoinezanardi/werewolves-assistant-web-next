import type { mount } from "@vue/test-utils";
import type { ComponentMountingOptions } from "@vue/test-utils/dist/mount";
import GameWitchTurnStartsEvent from "~/components/pages/game/GamePlaying/GameEventsMonitor/GameEventsMonitorCurrentEvent/GameTurnStartsEvent/GameWitchTurnStartsEvent/GameWitchTurnStartsEvent.vue";
import { useAudioStore } from "~/stores/audio/useAudioStore";

import { mountSuspendedComponent } from "~/tests/unit/utils/helpers/mount.helpers";

describe("Game Witch Turn Starts Event Component", () => {
  let wrapper: ReturnType<typeof mount<typeof GameWitchTurnStartsEvent>>;

  async function mountGameWitchTurnStartsEventComponent(options: ComponentMountingOptions<typeof GameWitchTurnStartsEvent> = {}):
  Promise<ReturnType<typeof mount<typeof GameWitchTurnStartsEvent>>> {
    return mountSuspendedComponent(GameWitchTurnStartsEvent, { ...options });
  }

  beforeEach(async() => {
    wrapper = await mountGameWitchTurnStartsEventComponent();
  });

  it("should match snapshot when rendered.", () => {
    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });

  it("should match snapshot when rendered without shallow rendering.", async() => {
    wrapper = await mountGameWitchTurnStartsEventComponent({ shallow: false });

    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });

  it("should play witch laughing sound effect when rendered.", () => {
    const audioStore = useAudioStore();

    expect(audioStore.playSoundEffect).toHaveBeenCalledExactlyOnceWith("witch-laughing");
  });

  describe("Game Event Texts", () => {
    it("should pass event texts when rendered.", () => {
      const gameEventWithTextsComponent = wrapper.findComponent<typeof GameWitchTurnStartsEvent>("#game-witch-turn-starts-event");
      const expectedTexts: string[] = ["components.GameWitchTurnStartsEvent.witchCanUsePotions"];
      const expectedTextsAsString = expectedTexts.join(",");

      expect(gameEventWithTextsComponent.attributes("texts")).toBe(expectedTextsAsString);
    });
  });
});