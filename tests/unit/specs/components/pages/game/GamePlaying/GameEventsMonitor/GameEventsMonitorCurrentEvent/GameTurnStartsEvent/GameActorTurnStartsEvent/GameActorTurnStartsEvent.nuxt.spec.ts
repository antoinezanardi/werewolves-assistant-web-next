import type { mount } from "@vue/test-utils";
import type { ComponentMountingOptions } from "@vue/test-utils/dist/mount";
import GameActorTurnStartsEvent from "~/components/pages/game/GamePlaying/GameEventsMonitor/GameEventsMonitorCurrentEvent/GameTurnStartsEvent/GameActorTurnStartsEvent/GameActorTurnStartsEvent.vue";

import { mountSuspendedComponent } from "~/tests/unit/utils/helpers/mount.helpers";

describe("Game Actor Turn Starts Event Component", () => {
  let wrapper: ReturnType<typeof mount<typeof GameActorTurnStartsEvent>>;

  async function mountGameActorTurnStartsEventComponent(options: ComponentMountingOptions<typeof GameActorTurnStartsEvent> = {}):
  Promise<ReturnType<typeof mount<typeof GameActorTurnStartsEvent>>> {
    return mountSuspendedComponent(GameActorTurnStartsEvent, { ...options });
  }

  beforeEach(async() => {
    wrapper = await mountGameActorTurnStartsEventComponent();
  });

  it("should match snapshot when rendered.", () => {
    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });

  it("should match snapshot when rendered without shallow rendering.", async() => {
    wrapper = await mountGameActorTurnStartsEventComponent({ shallow: false });

    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });

  describe("Game Event Texts", () => {
    it("should pass event texts when rendered.", () => {
      const expectedTexts: string[] = ["components.GameActorTurnStartsEvent.actorCanChooseCardToPlay"];
      const expectedTextsAsString = expectedTexts.join(",");
      const gameEventWithTextsComponent = wrapper.findComponent<typeof GameActorTurnStartsEvent>("#game-actor-turn-starts-event");

      expect(gameEventWithTextsComponent.attributes("texts")).toBe(expectedTextsAsString);
    });
  });
});