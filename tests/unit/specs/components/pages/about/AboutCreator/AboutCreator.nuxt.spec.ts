import type { mount } from "@vue/test-utils";

import AboutCreator from "~/components/pages/about/AboutCreator.vue";
import { mountSuspendedComponent } from "~/tests/unit/utils/helpers/mount.helpers";

describe("About Creator Component", () => {
  let wrapper: ReturnType<typeof mount<typeof AboutCreator>>;

  beforeEach(async() => {
    wrapper = await mountSuspendedComponent(AboutCreator);
  });

  it("should render component and match snapshot when mounted.", () => {
    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });

  describe("Title", () => {
    it("should translate title when rendered.", () => {
      const title = wrapper.find<HTMLHeadElement>("#about-creator-title");

      expect(title.text()).toBe("A word from the creator");
    });
  });

  describe("Sections", () => {
    it("should translate first section when rendered.", () => {
      const firstSection = wrapper.find<HTMLParagraphElement>("#about-creator-first-section");

      expect(firstSection.text()).toBe("I am Antoine ZANARDI, a Full-Stack Web developer and a fan of open source in general. " +
      "If you want to learn more about me, I invite you to explore my portfolio.");
    });

    it("should translate portfolio button when rendered.", () => {
      const portfolioButton = wrapper.find<HTMLAnchorElement>("#about-creator-portfolio-button");

      expect(portfolioButton.text()).toBe("My portfolio");
    });

    it("should translate second section when rendered.", () => {
      const secondSection = wrapper.find<HTMLParagraphElement>("#about-creator-second-section");

      expect(secondSection.text()).toBe("For me, Werewolves of Miller's Hollow™ game is one of the best games to play with friends or " +
      "family around a table, where alliances and betrayals intertwine, much like in Mario Kart. " +
      "As the game progresses, the true nature of each player is revealed, masks fall, and everyone feels threatened. Each game is a unique adventure, full of unexpected twists.");
    });

    it("should translate third section when rendered.", () => {
      const thirdSection = wrapper.find<HTMLParagraphElement>("#about-creator-third-section");

      expect(thirdSection.text()).toBe("As a big fan of the game master role, I've always wanted to share the rewarding feeling of being " +
      "the conductor during a game. So, I created this assistant so that anyone can take on this important role, in any game configuration.");
    });

    it("should translate fourth section when rendered.", () => {
      const fourthSection = wrapper.find<HTMLParagraphElement>("#about-creator-forth-section");

      expect(fourthSection.text()).toBe("Your feedback on this assistant is welcome. " +
      "It was created to serve all game masters, whether novice or expert, and make your games memorable. Have fun!");
    });
  });
});