import type { mount } from "@vue/test-utils";
import type { ComponentMountingOptions } from "@vue/test-utils/dist/mount";
import GameAccursedWolfFatherTurnStartsEvent from "~/components/pages/game/GamePlaying/GameEventsMonitor/GameEventsMonitorCurrentEvent/GameTurnStartsEvent/GameAccursedWolfFatherTurnStartsEvent/GameAccursedWolfFatherTurnStartsEvent.vue";
import type GameEventWithTexts from "~/components/shared/game/game-event/GameEventWithTexts/GameEventWithTexts.vue";

import { mountSuspendedComponent } from "~/tests/unit/utils/helpers/mount.helpers";

describe("Game Accursed Wolf Father Turn Starts Event Component", () => {
  let wrapper: ReturnType<typeof mount<typeof GameAccursedWolfFatherTurnStartsEvent>>;

  async function mountGameAccursedWolfFatherTurnStartsEventComponent(options: ComponentMountingOptions<typeof GameAccursedWolfFatherTurnStartsEvent> = {}):
  Promise<ReturnType<typeof mount<typeof GameAccursedWolfFatherTurnStartsEvent>>> {
    return mountSuspendedComponent(GameAccursedWolfFatherTurnStartsEvent, { ...options });
  }

  beforeEach(async() => {
    wrapper = await mountGameAccursedWolfFatherTurnStartsEventComponent();
  });

  it("should match snapshot when rendered.", () => {
    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });

  it("should match snapshot when rendered without shallow rendering.", async() => {
    wrapper = await mountGameAccursedWolfFatherTurnStartsEventComponent({ shallow: false });

    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });

  describe("Game Starts Turn Event Texts", () => {
    it("should pass event texts when rendered.", () => {
      const gameEventWithTextsComponent = wrapper.findComponent<typeof GameEventWithTexts>("#game-accursed-wolf-father-turn-starts-event");
      const expectedTexts: string[] = ["components.GameAccursedWolfFatherTurnStartsEvent.accursedWolfFatherCanInfect"];
      const expectedTextsAsString = expectedTexts.join(",");

      expect(gameEventWithTextsComponent.attributes("texts")).toBe(expectedTextsAsString);
    });
  });
});