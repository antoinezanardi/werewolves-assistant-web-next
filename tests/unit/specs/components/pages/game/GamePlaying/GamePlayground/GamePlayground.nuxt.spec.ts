import type { mount } from "@vue/test-utils";

import GamePlayground from "~/components/pages/game/GamePlaying/GamePlayground/GamePlayground.vue";
import { mountSuspendedComponent } from "~/tests/unit/utils/helpers/mount.helpers";

describe("Game Playground Component", () => {
  let wrapper: ReturnType<typeof mount<typeof GamePlayground>>;

  beforeEach(async() => {
    wrapper = await mountSuspendedComponent(GamePlayground);
  });

  it("should match snapshot when rendered.", () => {
    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });
});