import type { mount } from "@vue/test-utils";

import type { NuxtLink } from "#components";
import Index from "@/pages/index.vue";
import type { Ref } from "vue";
import { mountSuspendedComponent } from "@tests/unit/utils/helpers/mount.helpers";

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

  describe("Subtitle", () => {
    it("should translate subtitle when rendered.", () => {
      const subtitle = wrapper.find("#subtitle");

      expect(subtitle.text()).toBe("The perfect tool for game masters of the Werewolves of Miller's Hollow™");
    });
  });

  describe("Play button", () => {
    beforeEach(async() => {
      wrapper = await mountSuspendedComponent(Index, {
        shallow: false,
        stubs: { IndexFooter: true },
      });
    });

    it("should display play button with translated label when rendered.", () => {
      const playButton = wrapper.findComponent<typeof NuxtLink>("#play-button");

      expect(playButton.text()).toBe("Play");
    });

    describe("Play Button Icon", () => {
      it("should not have animation class when not hovered.", () => {
        const playButtonIcon = wrapper.find<HTMLSpanElement>("#play-button-icon");

        expect(playButtonIcon.classes()).not.toContain("animate__heartBeat");
      });

      it("should have animation class when hovered.", async() => {
        const isHovered = (wrapper.vm as unknown as typeof Index).isPlayButtonHovered as Ref<boolean>;
        isHovered.value = true;
        await nextTick();
        const playButtonIcon = wrapper.find<HTMLSpanElement>("#play-button-icon");

        expect(playButtonIcon.classes()).toContain("animate__heartBeat");
      });
    });
  });

  describe("About button", () => {
    beforeEach(async() => {
      wrapper = await mountSuspendedComponent(Index, {
        shallow: false,
        stubs: { IndexFooter: true },
      });
    });

    it("should display about button with translated label when rendered.", () => {
      const aboutButton = wrapper.findComponent<typeof NuxtLink>("#about-button");

      expect(aboutButton.text()).toBe("What is it?");
    });

    describe("About Button Icon", () => {
      it("should not have animation class when not hovered.", () => {
        const aboutButtonIcon = wrapper.find<HTMLSpanElement>("#about-button-icon");

        expect(aboutButtonIcon.classes()).not.toContain("animate__heartBeat");
      });

      it("should have animation class when hovered.", async() => {
        const isHovered = (wrapper.vm as unknown as typeof Index).isAboutButtonHovered as Ref<boolean>;
        isHovered.value = true;
        await nextTick();
        const aboutButtonIcon = wrapper.find<HTMLSpanElement>("#about-button-icon");

        expect(aboutButtonIcon.classes()).toContain("animate__rubberBand");
      });
    });
  });
});