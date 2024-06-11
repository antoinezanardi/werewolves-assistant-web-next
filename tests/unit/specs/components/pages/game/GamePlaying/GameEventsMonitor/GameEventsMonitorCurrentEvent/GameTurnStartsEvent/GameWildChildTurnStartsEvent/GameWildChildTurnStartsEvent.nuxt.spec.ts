import type { mount } from "@vue/test-utils";
import type { ComponentMountingOptions } from "@vue/test-utils/dist/mount";
import GameWildChildTurnStartsEvent from "~/components/pages/game/GamePlaying/GameEventsMonitor/GameEventsMonitorCurrentEvent/GameTurnStartsEvent/GameWildChildTurnStartsEvent/GameWildChildTurnStartsEvent.vue";
import { useAudioStore } from "~/stores/audio/useAudioStore";

import { mountSuspendedComponent } from "~/tests/unit/utils/helpers/mount.helpers";

describe("Game Wild Child Turn Starts Event Component", () => {
  let wrapper: ReturnType<typeof mount<typeof GameWildChildTurnStartsEvent>>;

  async function mountGameWildChildTurnStartsEventComponent(options: ComponentMountingOptions<typeof GameWildChildTurnStartsEvent> = {}):
  Promise<ReturnType<typeof mount<typeof GameWildChildTurnStartsEvent>>> {
    return mountSuspendedComponent(GameWildChildTurnStartsEvent, { ...options });
  }

  beforeEach(async() => {
    wrapper = await mountGameWildChildTurnStartsEventComponent();
  });

  it("should match snapshot when rendered.", () => {
    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });

  it("should match snapshot when rendered without shallow rendering.", async() => {
    wrapper = await mountGameWildChildTurnStartsEventComponent({ shallow: false });

    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });

  it("should play monkey cry sound effect when rendered.", () => {
    const audioStore = useAudioStore();

    expect(audioStore.playSoundEffect).toHaveBeenCalledExactlyOnceWith("monkey-cry");
  });

  describe("Game Event Texts", () => {
    it("should pass event texts when rendered.", () => {
      const gameEventWithTextsComponent = wrapper.findComponent<typeof GameWildChildTurnStartsEvent>("#game-wild-child-turn-starts-event");
      const expectedTexts: string[] = [
        "components.GameWildChildTurnStartsEvent.wildChildChoosesModel",
        "components.GameWildChildTurnStartsEvent.ifModelDiesWildChildBecomesWolf",
      ];
      const expectedTextsAsString = expectedTexts.join(",");

      expect(gameEventWithTextsComponent.attributes("texts")).toBe(expectedTextsAsString);
    });
  });
});