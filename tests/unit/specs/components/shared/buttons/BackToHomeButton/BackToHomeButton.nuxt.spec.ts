import type { mount } from "@vue/test-utils";

import type { NuxtLink } from "#components";
import BackToHomeButton from "~/components/shared/buttons/BackToHomeButton/BackToHomeButton.vue";
import { mountSuspendedComponent } from "~/tests/unit/utils/helpers/mount.helpers";

describe("Back To Home Button", () => {
  let wrapper: ReturnType<typeof mount<typeof BackToHomeButton>>;

  beforeEach(async() => {
    wrapper = await mountSuspendedComponent(BackToHomeButton);
  });

  it("should match snapshot when rendered.", () => {
    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });

  describe("Button Navigation", () => {
    it("should have 'to' prop set to home when rendered.", () => {
      const backToHomeButton = wrapper.findComponent<typeof NuxtLink>("#back-to-home-button");

      expect(backToHomeButton.attributes("to")).toBe("/");
    });
  });

  describe("Button Text", () => {
    it("should translate button text when rendered.", async() => {
      wrapper = await mountSuspendedComponent(BackToHomeButton, { shallow: false });
      const buttonText = wrapper.find<HTMLButtonElement>("#back-to-home-button");

      expect(buttonText.text()).toBe("Back to home");
    });
  });
});