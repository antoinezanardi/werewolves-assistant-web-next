import type { mount } from "@vue/test-utils";
import type { ComponentMountingOptions } from "@vue/test-utils/dist/mount";
import GameStutteringJudgeTurnStartsEvent from "~/components/pages/game/GamePlaying/GameEventsMonitor/GameEventsMonitorCurrentEvent/GameTurnStartsEvent/GameStutteringJudgeTurnStartsEvent/GameStutteringJudgeTurnStartsEvent.vue";
import { useAudioStore } from "~/stores/audio/useAudioStore";

import { mountSuspendedComponent } from "~/tests/unit/utils/helpers/mount.helpers";

describe("Game Stuttering Judge Turn Starts Event Component", () => {
  let wrapper: ReturnType<typeof mount<typeof GameStutteringJudgeTurnStartsEvent>>;

  async function mountGameStutteringJudgeTurnStartsEventComponent(options: ComponentMountingOptions<typeof GameStutteringJudgeTurnStartsEvent> = {}):
  Promise<ReturnType<typeof mount<typeof GameStutteringJudgeTurnStartsEvent>>> {
    return mountSuspendedComponent(GameStutteringJudgeTurnStartsEvent, { ...options });
  }

  beforeEach(async() => {
    wrapper = await mountGameStutteringJudgeTurnStartsEventComponent();
  });

  it("should match snapshot when rendered.", () => {
    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });

  it("should match snapshot when rendered without shallow rendering.", async() => {
    wrapper = await mountGameStutteringJudgeTurnStartsEventComponent({ shallow: false });

    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });

  it("should play gavel hitting sound effect when rendered.", () => {
    const audioStore = useAudioStore();

    expect(audioStore.playSoundEffect).toHaveBeenCalledExactlyOnceWith("gavel-hitting");
  });

  describe("Game Stuttering Judge Turn Starts Event Texts", () => {
    it("should pass event texts when rendered.", () => {
      const gameEventWithTextsComponent = wrapper.findComponent<typeof GameStutteringJudgeTurnStartsEvent>("#game-stuttering-judge-turn-starts-event");
      const expectedTexts: string[] = [
        "components.GameStutteringJudgeTurnStartsEvent.stutteringJudgeCanRequestAnotherVote",
        "components.GameStutteringJudgeTurnStartsEvent.everyonePutHandsInBackAndGameMasterWillRecognizeSign",
      ];
      const expectedTextsAsString = expectedTexts.join(",");

      expect(gameEventWithTextsComponent.attributes("texts")).toBe(expectedTextsAsString);
    });
  });
});