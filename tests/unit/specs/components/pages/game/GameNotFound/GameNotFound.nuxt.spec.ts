import type { mount } from "@vue/test-utils";
import type { UseHeadInput } from "unhead";
import { expect } from "vitest";

import GameNotFound from "~/components/pages/game/GameNotFound/GameNotFound.vue";
import { mountSuspendedComponent } from "@tests/unit/utils/helpers/mount.helpers";

describe("Game Not Found Component", () => {
  let wrapper: ReturnType<typeof mount<typeof GameNotFound>>;

  beforeEach(async() => {
    wrapper = await mountSuspendedComponent(GameNotFound);
  });

  it("should match snapshot when rendered.", () => {
    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });

  it("should set head title and meta tags when rendered.", () => {
    const expectedUseHeadInput: UseHeadInput<object> = { title: "components.GameNotFound.gameNotFound" };

    expect(useHead).toHaveBeenCalledExactlyOnceWith(expectedUseHeadInput);
  });

  describe("Game not found text", () => {
    it("should translate game not found text when rendered.", () => {
      const gameNotFoundText = wrapper.find<HTMLHeadElement>("#game-not-found-text");

      expect(gameNotFoundText.text()).toBe("Game not found… Did you get lost?");
    });
  });
});