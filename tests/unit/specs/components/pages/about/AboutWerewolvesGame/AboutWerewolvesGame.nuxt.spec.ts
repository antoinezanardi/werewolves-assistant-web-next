import type { mount } from "@vue/test-utils";

import AboutWerewolvesGame from "~/components/pages/about/AboutWerewolvesGame.vue";
import { pTooltipDirectiveBinder } from "@tests/unit/utils/helpers/directive.helpers";
import { mountSuspendedComponent } from "@tests/unit/utils/helpers/mount.helpers";
import type { BoundTooltip } from "@tests/unit/utils/types/directive.types";

describe("About Werewolves Game Component", () => {
  let wrapper: ReturnType<typeof mount<typeof AboutWerewolvesGame>>;

  beforeEach(async() => {
    wrapper = await mountSuspendedComponent(AboutWerewolvesGame);
  });

  it("should match snapshot when rendered.", () => {
    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });

  describe("Title", () => {
    it("should display translated title when rendered.", () => {
      const title = wrapper.find<HTMLHeadElement>("#about-werewolves-game-title");

      expect(title.text()).toBe("The Werewolves of Miller's Hollow™ game");
    });
  });

  describe("Watch tutorial on Youtube Anchor", () => {
    it("should have tooltip when rendered.", async() => {
      const tooltip: BoundTooltip = { value: undefined };
      const directives = { ...pTooltipDirectiveBinder(tooltip, "#about-werewolves-game-watch-tutorial-video-on-youtube") };
      wrapper = await mountSuspendedComponent(AboutWerewolvesGame, { global: { directives } });

      expect(tooltip.value).toBe("Watch an explanatory video on YouTube");
    });

    it("should have translated button when rendered.", () => {
      const watchTutorialOnYoutubeAnchor = wrapper.find<HTMLAnchorElement>("#about-werewolves-game-watch-tutorial-video-on-youtube");

      expect(watchTutorialOnYoutubeAnchor.text()).toBe("I don't know this game");
    });
  });

  describe("Sections", () => {
    it("should translate first section when rendered.", () => {
      const firstSection = wrapper.find<HTMLParagraphElement>("#about-werewolves-game-first-section");

      expect(firstSection.text()).toBe("The Werewolves of Miller's Hollow™ is a captivating social board game, where each participant takes" +
        " on the role of either a Villager or a Werewolf. Under the guidance of a game master, each session unveils a range of surprises," +
        " betrayals, twists, and even moments filled with laughter and sometimes tears.");
    });

    it("should translate second section when rendered.", () => {
      const secondSection = wrapper.find<HTMLParagraphElement>("#about-werewolves-game-second-section");

      expect(secondSection.text()).toBe("The success of a game relies on the shoulders of the game master, tasked with creating an " +
        "enchanting atmosphere, maintaining a dynamic pace, and mastering the subtleties of the game rules. Managing a sizable group of players, " +
        "lacking experience, or being in a state of distraction make this task a significant challenge.");
    });
  });
});