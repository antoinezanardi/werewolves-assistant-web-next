import type { mount } from "@vue/test-utils";
import type { ComponentMountingOptions } from "@vue/test-utils/dist/mount";
import GameNightPhaseLottie from "~/components/shared/game/game-phase/GamePhaseLottie/GameNightPhaseLottie/GameNightPhaseLottie.vue";

import { mountSuspendedComponent } from "~/tests/unit/utils/helpers/mount.helpers";

describe("Game Night Phase Lottie Component", () => {
  let wrapper: ReturnType<typeof mount<typeof GameNightPhaseLottie>>;

  async function mountGameNightPhaseLottieComponent(options: ComponentMountingOptions<typeof GameNightPhaseLottie> = {}):
  Promise<ReturnType<typeof mount<typeof GameNightPhaseLottie>>> {
    return mountSuspendedComponent(GameNightPhaseLottie, { ...options });
  }

  beforeEach(async() => {
    wrapper = await mountGameNightPhaseLottieComponent();
  });

  it("should match snapshot without shallow rendering when rendered.", async() => {
    wrapper = await mountGameNightPhaseLottieComponent({ shallow: false });

    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });
});