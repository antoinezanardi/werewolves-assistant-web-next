import type { mount } from "@vue/test-utils";

import GamePlaygroundContent from "~/components/pages/game/GamePlaying/GamePlayground/GamePlaygroundContent/GamePlaygroundContent.vue";
import { mountSuspendedComponent } from "~/tests/unit/utils/helpers/mount.helpers";

describe("Game Playground Content Component", () => {
  let wrapper: ReturnType<typeof mount<typeof GamePlaygroundContent>>;

  beforeEach(async() => {
    wrapper = await mountSuspendedComponent(GamePlaygroundContent);
  });

  it("should match snapshot when rendered.", () => {
    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });
});