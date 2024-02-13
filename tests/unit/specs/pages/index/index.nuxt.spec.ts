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
      const title = wrapper.find("[aria-label='Werewolves Assistant']");

      expect(title.text()).toBe("Werewolves Assistant");
    });
  });

  describe("Play button", () => {
    it("should display play button with translated label when rendered.", () => {
      const playButton = wrapper.findComponent<typeof NuxtLink>("[aria-label='Play']");

      expect(playButton.html()).toContain("Play");
    });
  });

  describe("About button", () => {
    it("should display about button with translated label when rendered.", () => {
      const aboutButton = wrapper.findComponent<typeof NuxtLink>("[aria-label='What is it ?']");

      expect(aboutButton.html()).toContain("What is it ");
    });
  });
});