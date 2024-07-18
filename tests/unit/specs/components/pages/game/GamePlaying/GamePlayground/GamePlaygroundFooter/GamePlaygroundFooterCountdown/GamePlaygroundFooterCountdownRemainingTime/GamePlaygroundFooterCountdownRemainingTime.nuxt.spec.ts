import type { mount } from "@vue/test-utils";

import { mountSuspendedComponent } from "@tests/unit/utils/helpers/mount.helpers";
import type { ComponentMountingOptions } from "@vue/test-utils/dist/mount";
import type { GamePlaygroundFooterCountdownRemainingTimeProps } from "~/components/pages/game/GamePlaying/GamePlayground/GamePlaygroundFooter/GamePlaygroundFooterCountdown/GamePlaygroundFooterCountdownRemainingTime/game-playground-footer-countdown-remaining-time.types";
import GamePlaygroundFooterCountdownRemainingTime from "~/components/pages/game/GamePlaying/GamePlayground/GamePlaygroundFooter/GamePlaygroundFooterCountdown/GamePlaygroundFooterCountdownRemainingTime/GamePlaygroundFooterCountdownRemainingTime.vue";

describe("Game Playground Footer Countdown Remaining Time Component", () => {
  const defaultProps: GamePlaygroundFooterCountdownRemainingTimeProps = {
    minutes: 1,
    seconds: 3,
  };
  let wrapper: ReturnType<typeof mount<typeof GamePlaygroundFooterCountdownRemainingTime>>;

  async function mountGamePlaygroundFooterCountdownRemainingTimeComponent(options: ComponentMountingOptions<typeof GamePlaygroundFooterCountdownRemainingTime> = {}):
  Promise<ReturnType<typeof mount<typeof GamePlaygroundFooterCountdownRemainingTime>>> {
    return mountSuspendedComponent(GamePlaygroundFooterCountdownRemainingTime, {
      props: defaultProps,
      ...options,
    });
  }

  beforeEach(async() => {
    wrapper = await mountGamePlaygroundFooterCountdownRemainingTimeComponent();
  });

  it("should match snapshot when rendered.", () => {
    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });

  describe("Remaining time", () => {
    it("should display remaining time with padded seconds when rendered.", () => {
      const remainingTime = wrapper.find<HTMLDivElement>("#remaining-time");

      expect(remainingTime.text()).toBe("1:03");
    });
  });
});