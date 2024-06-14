import type { mount } from "@vue/test-utils";

import GamePlaygroundHeader from "~/components/pages/game/GamePlaying/GamePlayground/GamePlaygroundHeader/GamePlaygroundHeader.vue";
import { mountSuspendedComponent } from "@tests/unit/utils/helpers/mount.helpers";

describe("Game Playground Header Component", () => {
  let wrapper: ReturnType<typeof mount<typeof GamePlaygroundHeader>>;

  beforeEach(async() => {
    wrapper = await mountSuspendedComponent(GamePlaygroundHeader);
  });

  it("should match snapshot when rendered.", () => {
    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });
});