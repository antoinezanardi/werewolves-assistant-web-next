import type { mount } from "@vue/test-utils";
import type { ComponentMountingOptions } from "@vue/test-utils/dist/mount";

import type { GamePhaseIconProps } from "~/components/shared/game/game-phase/GamePhaseIcon/game-phase-icon.types";
import GamePhaseIcon from "~/components/shared/game/game-phase/GamePhaseIcon/GamePhaseIcon.vue";
import { mountSuspendedComponent } from "~/tests/unit/utils/helpers/mount.helpers";

describe("Game Phase Icon Component", () => {
  let wrapper: ReturnType<typeof mount<typeof GamePhaseIcon>>;
  const defaultProps: GamePhaseIconProps = { phase: "day" };

  async function mountGamePhaseIconComponent(options: ComponentMountingOptions<typeof GamePhaseIcon> = {}): Promise<ReturnType<typeof mount<typeof GamePhaseIcon>>> {
    return mountSuspendedComponent(GamePhaseIcon, {
      props: defaultProps,
      ...options,
    });
  }

  beforeEach(async() => {
    wrapper = await mountGamePhaseIconComponent();
  });

  it("should match snapshot when rendered.", () => {
    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });

  describe("Icon classes", () => {
    it("should display the night icon when the phase is night.", async() => {
      wrapper = await mountGamePhaseIconComponent({ props: { phase: "night" } });
      const phaseIcon = wrapper.find("#game-phase-icon");

      expect(phaseIcon.classes()).toContainValues(["fa-moon", "text-night"]);
    });

    it("should display the sun icon when the phase is day.", () => {
      const phaseIcon = wrapper.find("#game-phase-icon");

      expect(phaseIcon.classes()).toContainValues(["fa-sun", "text-day"]);
    });
  });
});