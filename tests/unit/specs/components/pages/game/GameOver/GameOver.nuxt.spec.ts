import type { mount } from "@vue/test-utils";

import GameOver from "~/components/pages/game/GameOver/GameOver.vue";
import { mountSuspendedComponent } from "~/tests/unit/utils/helpers/mount.helpers";

describe("Game Over Component", () => {
  let wrapper: ReturnType<typeof mount<typeof GameOver>>;

  beforeEach(async() => {
    wrapper = await mountSuspendedComponent(GameOver);
  });

  it("should match snapshot when rendered.", () => {
    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });
});