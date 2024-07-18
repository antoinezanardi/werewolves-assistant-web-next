import type { mount } from "@vue/test-utils";

import { mountSuspendedComponent } from "@tests/unit/utils/helpers/mount.helpers";
import type { ComponentMountingOptions } from "@vue/test-utils/dist/mount";
import type { GamePlaygroundFooterCountdownEllipseProgressProps } from "~/components/pages/game/GamePlaying/GamePlayground/GamePlaygroundFooter/GamePlaygroundFooterCountdown/GamePlaygroundFooterCountdownEllipseProgress/game-playground-footer-countdown-ellipse-progress.types";
import GamePlaygroundFooterCountdownEllipseProgress from "~/components/pages/game/GamePlaying/GamePlayground/GamePlaygroundFooter/GamePlaygroundFooterCountdown/GamePlaygroundFooterCountdownEllipseProgress/GamePlaygroundFooterCountdownEllipseProgress.vue";

describe("Game Playground Footer Countdown Ellipse Progress Component", () => {
  const defaultProps: GamePlaygroundFooterCountdownEllipseProgressProps = {
    totalSeconds: 100,
    remainingSeconds: 50,
  };
  let wrapper: ReturnType<typeof mount<typeof GamePlaygroundFooterCountdownEllipseProgress>>;

  async function mountGamePlaygroundFooterCountdownEllipseProgressComponent(options: ComponentMountingOptions<typeof GamePlaygroundFooterCountdownEllipseProgress> = {}):
  Promise<ReturnType<typeof mount<typeof GamePlaygroundFooterCountdownEllipseProgress>>> {
    return mountSuspendedComponent(GamePlaygroundFooterCountdownEllipseProgress, {
      props: defaultProps,
      ...options,
    });
  }

  beforeEach(async() => {
    wrapper = await mountGamePlaygroundFooterCountdownEllipseProgressComponent();
  });

  it("should match snapshot when rendered.", () => {
    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });

  describe("Progress", () => {
    it("should set progress to 50% when total is 100 and remaining is 50.", () => {
      const ellipseProgress = wrapper.findComponent("#vue-ellipse-progress");

      expect(ellipseProgress.attributes("progress")).toBe("50");
    });

    it.each<{
      test: string;
      totalSeconds: number;
      remainingSeconds: number;
      expectedGradientProgressColor: string;
    }>([
      {
        test: "should set color to red when total is 100 and remaining is 0.",
        totalSeconds: 100,
        remainingSeconds: 0,
        expectedGradientProgressColor: "#f10d40",
      },
      {
        test: "should set color to purple when total is 100 and remaining is 50.",
        totalSeconds: 100,
        remainingSeconds: 50,
        expectedGradientProgressColor: "#9843a0",
      },
      {
        test: "should set color to light purple when total is 100 and remaining is 75.",
        totalSeconds: 100,
        remainingSeconds: 75,
        expectedGradientProgressColor: "#6c5ecf",
      },
      {
        test: "should set color to blue when total is 100 and remaining is 100.",
        totalSeconds: 100,
        remainingSeconds: 100,
        expectedGradientProgressColor: "#3f79ff",
      },
    ])("$test", async({ totalSeconds, remainingSeconds, expectedGradientProgressColor }) => {
      wrapper = await mountGamePlaygroundFooterCountdownEllipseProgressComponent({
        props: {
          totalSeconds,
          remainingSeconds,
        },
      });
      const { gradientProgressColor } = wrapper.vm as unknown as { gradientProgressColor: string };

      expect(gradientProgressColor).toBe(expectedGradientProgressColor);
    });
  });
});