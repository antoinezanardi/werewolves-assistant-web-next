import type { mount } from "@vue/test-utils";

import GamePlaying from "~/components/pages/game/GamePlaying/GamePlaying.vue";
import { mountSuspendedComponent } from "~/tests/unit/utils/helpers/mount.helpers";

describe("Game Playing Component", () => {
  let wrapper: ReturnType<typeof mount<typeof GamePlaying>>;

  beforeEach(async() => {
    wrapper = await mountSuspendedComponent(GamePlaying);
  });

  it("should match snapshot when rendered.", () => {
    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });
});