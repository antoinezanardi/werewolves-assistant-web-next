import type { mount } from "@vue/test-utils";
import type { ComponentMountingOptions } from "@vue/test-utils/dist/mount";
import GameWhiteWerewolfTurnStartsEvent from "~/components/pages/game/GamePlaying/GameEventsMonitor/GameEventsMonitorCurrentEvent/GameTurnStartsEvent/GameWhiteWerewolfTurnStartsEvent/GameWhiteWerewolfTurnStartsEvent.vue";
import { useAudioStore } from "~/stores/audio/useAudioStore";

import { mountSuspendedComponent } from "~/tests/unit/utils/helpers/mount.helpers";

describe("Game White Werewolf Turn Starts Event Component", () => {
  let wrapper: ReturnType<typeof mount<typeof GameWhiteWerewolfTurnStartsEvent>>;

  async function mountGameWhiteWerewolfTurnStartsEventComponent(options: ComponentMountingOptions<typeof GameWhiteWerewolfTurnStartsEvent> = {}):
  Promise<ReturnType<typeof mount<typeof GameWhiteWerewolfTurnStartsEvent>>> {
    return mountSuspendedComponent(GameWhiteWerewolfTurnStartsEvent, { ...options });
  }

  beforeEach(async() => {
    wrapper = await mountGameWhiteWerewolfTurnStartsEventComponent();
  });

  it("should match snapshot when rendered.", () => {
    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });

  it("should match snapshot when rendered without shallow rendering.", async() => {
    wrapper = await mountGameWhiteWerewolfTurnStartsEventComponent({ shallow: false });

    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });

  it("should play werewolf growling sound effect when rendered.", () => {
    const audioStore = useAudioStore();

    expect(audioStore.playSoundEffect).toHaveBeenCalledExactlyOnceWith("werewolf-growling-1");
  });

  describe("Game Event Texts", () => {
    it("should pass event texts when rendered.", () => {
      const gameEventWithTextsComponent = wrapper.findComponent<typeof GameWhiteWerewolfTurnStartsEvent>("#game-white-werewolf-turn-starts-event");
      const expectedTexts: string[] = ["components.GameWhiteWerewolfTurnStartsEvent.whiteWerewolfCanEatAnotherWolf"];
      const expectedTextsAsString = expectedTexts.join(",");

      expect(gameEventWithTextsComponent.attributes("texts")).toBe(expectedTextsAsString);
    });
  });
});