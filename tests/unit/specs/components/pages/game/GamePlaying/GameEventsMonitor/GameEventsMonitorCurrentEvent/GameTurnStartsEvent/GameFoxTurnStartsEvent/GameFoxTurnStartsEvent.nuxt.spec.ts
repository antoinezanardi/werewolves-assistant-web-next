import type { mount } from "@vue/test-utils";
import type { ComponentMountingOptions } from "@vue/test-utils/dist/mount";
import GameFoxTurnStartsEvent from "~/components/pages/game/GamePlaying/GameEventsMonitor/GameEventsMonitorCurrentEvent/GameTurnStartsEvent/GameFoxTurnStartsEvent/GameFoxTurnStartsEvent.vue";
import { useAudioStore } from "~/stores/audio/useAudioStore";

import { mountSuspendedComponent } from "~/tests/unit/utils/helpers/mount.helpers";

describe("Game Fox Turn Starts Event Component", () => {
  let wrapper: ReturnType<typeof mount<typeof GameFoxTurnStartsEvent>>;

  async function mountGameFoxTurnStartsEventComponent(options: ComponentMountingOptions<typeof GameFoxTurnStartsEvent> = {}):
  Promise<ReturnType<typeof mount<typeof GameFoxTurnStartsEvent>>> {
    return mountSuspendedComponent(GameFoxTurnStartsEvent, { ...options });
  }

  beforeEach(async() => {
    wrapper = await mountGameFoxTurnStartsEventComponent();
  });

  it("should match snapshot when rendered.", () => {
    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });

  it("should match snapshot when rendered without shallow rendering.", async() => {
    wrapper = await mountGameFoxTurnStartsEventComponent({ shallow: false });

    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });

  it("should play fox sniffing sound effect when rendered.", () => {
    const audioStore = useAudioStore();

    expect(audioStore.playSoundEffect).toHaveBeenCalledExactlyOnceWith("fox-sniffing");
  });

  describe("Game Event Texts", () => {
    it("should pass event texts when rendered.", () => {
      const gameEventWithTextsComponent = wrapper.findComponent<typeof GameFoxTurnStartsEvent>("#game-fox-turn-starts-event");
      const expectedTexts: string[] = ["components.GameFoxTurnStartsEvent.foxSniffesGroupOfPlayers"];
      const expectedTextsAsString = expectedTexts.join(",");

      expect(gameEventWithTextsComponent.attributes("texts")).toBe(expectedTextsAsString);
    });
  });
});