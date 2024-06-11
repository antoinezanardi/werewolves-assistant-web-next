import type { mount } from "@vue/test-utils";
import type { ComponentMountingOptions } from "@vue/test-utils/dist/mount";
import GameHunterTurnStartsEvent from "~/components/pages/game/GamePlaying/GameEventsMonitor/GameEventsMonitorCurrentEvent/GameTurnStartsEvent/GameHunterTurnStartsEvent/GameHunterTurnStartsEvent.vue";
import { useAudioStore } from "~/stores/audio/useAudioStore";

import { mountSuspendedComponent } from "~/tests/unit/utils/helpers/mount.helpers";

describe("Game Hunter Turn Starts Event Component", () => {
  let wrapper: ReturnType<typeof mount<typeof GameHunterTurnStartsEvent>>;

  async function mountGameHunterTurnStartsEventComponent(options: ComponentMountingOptions<typeof GameHunterTurnStartsEvent> = {}):
  Promise<ReturnType<typeof mount<typeof GameHunterTurnStartsEvent>>> {
    return mountSuspendedComponent(GameHunterTurnStartsEvent, { ...options });
  }

  beforeEach(async() => {
    wrapper = await mountGameHunterTurnStartsEventComponent();
  });

  it("should match snapshot when rendered.", () => {
    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });

  it("should match snapshot when rendered without shallow rendering.", async() => {
    wrapper = await mountGameHunterTurnStartsEventComponent({ shallow: false });

    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });

  it("should play gun shot sound effect when rendered.", () => {
    const audioStore = useAudioStore();

    expect(audioStore.playSoundEffect).toHaveBeenCalledExactlyOnceWith("gun-shot");
  });

  describe("Game Event Texts", () => {
    it("should pass event texts when rendered.", () => {
      const gameEventWithTextsComponent = wrapper.findComponent<typeof GameHunterTurnStartsEvent>("#game-hunter-turn-starts-event");
      const expectedTexts: string[] = ["components.GameHunterTurnStartsEvent.hunterShootsAtPlayer"];
      const expectedTextsAsString = expectedTexts.join(",");

      expect(gameEventWithTextsComponent.attributes("texts")).toBe(expectedTextsAsString);
    });
  });
});