import type { mount } from "@vue/test-utils";
import { expect } from "vitest";

import AboutWerewolvesAssistant from "~/components/pages/about/AboutWerewolvesAssistant.vue";
import { mountSuspendedComponent } from "~/tests/unit/utils/mount.utils";

describe("About Werewolves Assistant Component", () => {
  let wrapper: ReturnType<typeof mount<typeof AboutWerewolvesAssistant>>;

  beforeEach(async() => {
    wrapper = await mountSuspendedComponent(AboutWerewolvesAssistant);
  });

  it("should render component and match snapshot when mounted.", () => {
    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });

  describe("Title", () => {
    it("should display translated title when rendered.", () => {
      const title = wrapper.find<HTMLHeadElement>("#about-werewolves-assistant-title");

      expect(title.text()).toBe("The Werewolves Assistant takes the stage !");
    });
  });

  describe("Sections", () => {
    it("should translate first section when rendered.", () => {
      const firstSection = wrapper.find<HTMLParagraphElement>("#about-werewolves-assistant-first-section");

      expect(firstSection.text()).toBe("To ease the heavy task that falls on the game master when hosting a Werewolves game, " +
      "the Werewolves Assistant proves to be the ideal tool !");
    });

    it("should translate second section when rendered.", () => {
      const secondSection = wrapper.find<HTMLParagraphElement>("#about-werewolves-assistant-second-section");

      expect(secondSection.text()).toBe("This Assistant offers a variety of features, including:");
    });

    it("should translate third section for each bullet item when rendered.", () => {
      const thirdSection = wrapper.find<HTMLUListElement>("#about-werewolves-assistant-third-section");
      const thirdSectionBulletItems = thirdSection.findAll<HTMLLIElement>("li");

      expect(thirdSectionBulletItems).toHaveLength(5);
      expect(thirdSectionBulletItems[0].text()).toBe("A game composition screen allowing the creation of sessions for 4 to 40 players, " +
      "with the option to randomly assign roles.");
      expect(thirdSectionBulletItems[1].text()).toBe("A playful game tracking interface, providing a pleasant visual experience.");
      expect(thirdSectionBulletItems[2].text()).toBe("For each key event, the ability to input players' choices, such as the selection of " +
      "the Werewolves' target or the election of the mayor.");
      expect(thirdSectionBulletItems[3].text()).toBe("The Assistant handles the scheduling of game turns, displaying deaths and other events, " +
      "as well as retaining all choices made during the game.");
      expect(thirdSectionBulletItems[4].text()).toBe("At the end of the game, a summary is generated, indicating the victorious camp and " +
      "providing a complete history of past actions.");
    });

    it("should translate fourth section when rendered.", () => {
      const fourthSection = wrapper.find<HTMLParagraphElement>("#about-werewolves-assistant-fourth-section");

      expect(fourthSection.text()).toBe("In summary, the Werewolves Assistant invites you to (re)discover the joy of taking on the role of the game master in a Werewolves " +
      "game. Accessible from any device with an internet browser, this tool is and will remain entirely FREE.");
    });

    describe("Disclaimer", () => {
      it("should translate disclaimer title when rendered.", () => {
        const disclaimerTitle = wrapper.find<HTMLParagraphElement>("#about-werewolves-assistant-disclaimer-title");

        expect(disclaimerTitle.text()).toBe("However, please be aware");
      });

      it("should translate disclaimer first section when rendered.", () => {
        const disclaimerFirstSection = wrapper.find<HTMLParagraphElement>("#about-werewolves-assistant-disclaimer-first-section");

        expect(disclaimerFirstSection.text()).toBe("The Werewolves Assistant has no intention of replacing the original " +
        "Werewolves of Miller's Hollow™ game. Its use requires prior possession of a game with its cards.");
      });

      it("should translate disclaimer second section when rendered.", () => {
        const disclaimerSecondSection = wrapper.find<HTMLParagraphElement>("#about-werewolves-assistant-disclaimer-second-section");

        expect(disclaimerSecondSection.text()).toBe("It is important to emphasize that the Assistant positions itself as an exclusive aid " +
        "to the game master, facilitating game management without altering the essence and experience unique to the original board game. " +
        "Thus, it complements and enhances the game's dynamics while preserving its authentic character.");
      });
    });
  });
});