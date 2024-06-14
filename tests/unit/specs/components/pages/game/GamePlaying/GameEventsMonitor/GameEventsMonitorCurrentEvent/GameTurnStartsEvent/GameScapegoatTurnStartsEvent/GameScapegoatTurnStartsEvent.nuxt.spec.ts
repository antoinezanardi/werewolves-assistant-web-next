import type { mount } from "@vue/test-utils";
import type { ComponentMountingOptions } from "@vue/test-utils/dist/mount";
import GameScapegoatTurnStartsEvent from "~/components/pages/game/GamePlaying/GameEventsMonitor/GameEventsMonitorCurrentEvent/GameTurnStartsEvent/GameScapegoatTurnStartsEvent/GameScapegoatTurnStartsEvent.vue";
import { useAudioStore } from "~/stores/audio/useAudioStore";

import { mountSuspendedComponent } from "@tests/unit/utils/helpers/mount.helpers";

describe("Game Scapegoat Turn Starts Event Component", () => {
  let wrapper: ReturnType<typeof mount<typeof GameScapegoatTurnStartsEvent>>;

  async function mountGameScapegoatTurnStartsEventComponent(options: ComponentMountingOptions<typeof GameScapegoatTurnStartsEvent> = {}):
  Promise<ReturnType<typeof mount<typeof GameScapegoatTurnStartsEvent>>> {
    return mountSuspendedComponent(GameScapegoatTurnStartsEvent, { ...options });
  }

  beforeEach(async() => {
    wrapper = await mountGameScapegoatTurnStartsEventComponent();
  });

  it("should match snapshot when rendered.", () => {
    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });

  it("should match snapshot when rendered without shallow rendering.", async() => {
    wrapper = await mountGameScapegoatTurnStartsEventComponent({ shallow: false });

    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });

  it("should play goat cry sound effect when rendered.", () => {
    const audioStore = useAudioStore();

    expect(audioStore.playSoundEffect).toHaveBeenCalledExactlyOnceWith("goat-cry");
  });

  describe("Game Starts Event Texts", () => {
    it("should pass event texts when rendered.", () => {
      const gameEventWithTextsComponent = wrapper.findComponent<typeof GameScapegoatTurnStartsEvent>("#game-scapegoat-turn-starts-event");
      const expectedTexts: string[] = ["components.GameScapegoatTurnStartsEvent.scapegoatCanBanPlayerFromVoting"];
      const expectedTextsAsString = expectedTexts.join(",");

      expect(gameEventWithTextsComponent.attributes("texts")).toBe(expectedTextsAsString);
    });
  });
});