import type { mount } from "@vue/test-utils";

import CreateAnotherGameButton from "~/components/shared/buttons/CreateAnotherGameButton/CreateAnotherGameButton.vue";
import { mountSuspendedComponent } from "~/tests/unit/utils/helpers/mount.helpers";

describe("Create Another Game Button", () => {
  let wrapper: ReturnType<typeof mount<typeof CreateAnotherGameButton>>;

  beforeEach(async() => {
    wrapper = await mountSuspendedComponent(CreateAnotherGameButton);
  });

  it("should match snapshot when rendered.", () => {
    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });

  describe("Button Navigation", () => {
    it("should have 'to' prop set to game lobby when rendered.", () => {
      const createAnotherGameButton = wrapper.findComponent("#create-another-game-button");

      expect(createAnotherGameButton.attributes("to")).toBe("/game-lobby");
    });
  });

  describe("Button Text", () => {
    it("should translate button text when rendered.", async() => {
      wrapper = await mountSuspendedComponent(CreateAnotherGameButton, { shallow: false });
      const buttonText = wrapper.find<HTMLButtonElement>("#create-another-game-button");

      expect(buttonText.text()).toBe("Create another game");
    });
  });
});