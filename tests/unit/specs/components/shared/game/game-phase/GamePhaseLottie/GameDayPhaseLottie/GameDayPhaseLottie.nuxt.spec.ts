import type { mount } from "@vue/test-utils";
import type { ComponentMountingOptions } from "@vue/test-utils/dist/mount";
import GameDayPhaseLottie from "~/components/shared/game/game-phase/GamePhaseLottie/GameDayPhaseLottie/GameDayPhaseLottie.vue";

import { mountSuspendedComponent } from "@tests/unit/utils/helpers/mount.helpers";

describe("Game Day Phase Lottie Component", () => {
  let wrapper: ReturnType<typeof mount<typeof GameDayPhaseLottie>>;

  async function mountGameDayPhaseLottieComponent(options: ComponentMountingOptions<typeof GameDayPhaseLottie> = {}):
  Promise<ReturnType<typeof mount<typeof GameDayPhaseLottie>>> {
    return mountSuspendedComponent(GameDayPhaseLottie, { ...options });
  }

  beforeEach(async() => {
    wrapper = await mountGameDayPhaseLottieComponent();
  });

  it("should match snapshot without shallow rendering when rendered.", async() => {
    wrapper = await mountGameDayPhaseLottieComponent({ shallow: false });

    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });
});