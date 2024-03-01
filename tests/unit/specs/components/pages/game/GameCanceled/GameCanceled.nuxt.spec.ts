import type { mount } from "@vue/test-utils";

import GameCanceled from "~/components/pages/game/GameCanceled/GameCanceled.vue";
import { mountSuspendedComponent } from "~/tests/unit/utils/helpers/mount.helpers";

describe("Game Canceled Component", () => {
  let wrapper: ReturnType<typeof mount<typeof GameCanceled>>;

  beforeEach(async() => {
    wrapper = await mountSuspendedComponent(GameCanceled);
  });

  it("should match snapshot when rendered.", () => {
    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });

  describe("Text", () => {
    it("should display translated text when rendered.", () => {
      const textDiv = wrapper.find<HTMLDivElement>("#game-canceled-text");

      expect(textDiv.text()).toBe("Game canceled");
    });
  });
});