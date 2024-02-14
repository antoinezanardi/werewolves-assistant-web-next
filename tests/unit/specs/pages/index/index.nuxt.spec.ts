import type { mount } from "@vue/test-utils";

import type { NuxtLink } from "#components";
import Index from "@/pages/index.vue";
import { mountSuspendedComponent } from "~/tests/unit/utils/helpers/mount.helpers";

describe("Index Page Component", () => {
  let wrapper: ReturnType<typeof mount<typeof Index>>;

  beforeEach(async() => {
    wrapper = await mountSuspendedComponent(Index);
  });

  it("should match snapshot when rendered.", () => {
    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });

  describe("Title", () => {
    it("should display translated title when rendered.", () => {
      const title = wrapper.find("#title");

      expect(title.text()).toBe("Werewolves Assistant");
    });
  });

  describe("Play button", () => {
    it("should display play button with translated label when rendered.", async() => {
      wrapper = await mountSuspendedComponent(Index, {
        shallow: false,
        stubs: { IndexFooter: true },
      });
      const playButton = wrapper.findComponent<typeof NuxtLink>("#play-button");

      expect(playButton.text()).toBe("Play");
    });
  });

  describe("About button", () => {
    it("should display about button with translated label when rendered.", async() => {
      wrapper = await mountSuspendedComponent(Index, {
        shallow: false,
        stubs: { IndexFooter: true },
      });
      const aboutButton = wrapper.findComponent<typeof NuxtLink>("#about-button");

      expect(aboutButton.text()).toBe("What is it ?");
    });
  });
});