import type { mount } from "@vue/test-utils";
import type { UseHeadInput } from "unhead";
import { expect } from "vitest";

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

  it("should set head title and meta tags when rendered.", () => {
    const expectedUseHeadInput: UseHeadInput<object> = { title: "components.GameCanceled.gameCanceled" };

    expect(useHead).toHaveBeenCalledExactlyOnceWith(expectedUseHeadInput);
  });

  describe("Text", () => {
    it("should display translated text when rendered.", () => {
      const textDiv = wrapper.find<HTMLDivElement>("#game-canceled-text");

      expect(textDiv.text()).toBe("Game canceled");
    });
  });
});