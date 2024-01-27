import type { mount } from "@vue/test-utils";

import AboutHowToContribute from "~/components/pages/about/AboutHowToContribute.vue";
import type GitHubRepositoryButton from "~/components/shared/external/GitHubRepositoryButton/GitHubRepositoryButton.vue";
import { mountSuspendedComponent } from "~/tests/unit/utils/mount.utils";

describe("About How To Contribute Component", () => {
  let wrapper: ReturnType<typeof mount<typeof AboutHowToContribute>>;

  beforeEach(async() => {
    wrapper = await mountSuspendedComponent(AboutHowToContribute);
  });

  it("should render component and match snapshot when mounted.", () => {
    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });

  describe("Title", () => {
    it("should translate title when rendered.", () => {
      const title = wrapper.find<HTMLHeadElement>("#about-how-to-contribute-title");

      expect(title.text()).toBe("How to contribute to this project?");
    });
  });

  describe("Sections", () => {
    it("should translate first section when rendered.", () => {
      const firstSection = wrapper.find<HTMLParagraphElement>("#about-how-to-contribute-first-section");

      expect(firstSection.text()).toBe("There are several ways to contribute to this project:");
    });

    it("should translate second section for each bullet item when rendered.", () => {
      const secondSection = wrapper.find<HTMLUListElement>("#about-how-to-contribute-second-section");
      const secondSectionBulletItems = secondSection.findAll<HTMLLIElement>("li");

      expect(secondSectionBulletItems).toHaveLength(3);
      expect(secondSectionBulletItems[0].text()).toBe("The Werewolf Assistant is an open-source project! Available on GitHub, whether you are a developer, graphic designer, " +
      "or even a tester, your help is welcome. If you like the project, feel free to star it or follow the creator!");
      expect(secondSectionBulletItems[1].text()).toBe("This project is intended to remain a free service. However, both hosting and tool infrastructure are paid for. " +
      "If you would like to contribute or appreciate the creator's work, you can make a donation on their Buy Me A Coffee page.");
      expect(secondSectionBulletItems[2].text()).toBe("Talk about this project around you! " +
      "Word of mouth will encourage many role-play enthusiasts to embark on the grand adventure of the game master with the Werewolf Assistant.");
    });

    it("should translate gitHub text button when rendered.", () => {
      const gitHubButton = wrapper.findComponent<typeof GitHubRepositoryButton>("#about-how-to-contribute-github-button");

      expect(gitHubButton.props("textButton")).toBe("Access the project on GitHub");
    });
  });
});