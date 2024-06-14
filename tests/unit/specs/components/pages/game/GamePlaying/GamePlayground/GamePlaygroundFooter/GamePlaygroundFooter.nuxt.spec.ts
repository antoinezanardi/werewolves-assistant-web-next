import type { mount } from "@vue/test-utils";

import GamePlaygroundFooter from "~/components/pages/game/GamePlaying/GamePlayground/GamePlaygroundFooter/GamePlaygroundFooter.vue";
import { mountSuspendedComponent } from "@tests/unit/utils/helpers/mount.helpers";

describe("Game Playground Footer Component", () => {
  let wrapper: ReturnType<typeof mount<typeof GamePlaygroundFooter>>;

  beforeEach(async() => {
    wrapper = await mountSuspendedComponent(GamePlaygroundFooter);
  });

  it("should match snapshot when rendered.", () => {
    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });
});