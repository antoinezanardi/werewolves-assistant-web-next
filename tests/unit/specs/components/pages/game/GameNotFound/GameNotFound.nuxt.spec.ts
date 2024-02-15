import type { mount } from "@vue/test-utils";

import GameNotFound from "~/components/pages/game/GameNotFound/GameNotFound.vue";
import { mountSuspendedComponent } from "~/tests/unit/utils/helpers/mount.helpers";

describe("Game Not Found Component", () => {
  let wrapper: ReturnType<typeof mount<typeof GameNotFound>>;

  beforeEach(async() => {
    wrapper = await mountSuspendedComponent(GameNotFound);
  });

  it("should match snapshot when rendered.", () => {
    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });
});