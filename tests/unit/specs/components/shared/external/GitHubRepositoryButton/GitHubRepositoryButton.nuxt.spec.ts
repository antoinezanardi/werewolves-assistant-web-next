import type { mount } from "@vue/test-utils";

import type { GitHubRepositoryButtonProps } from "~/components/shared/external/GitHubRepositoryButton/git-hub-repository-button.types";
import GitHubRepositoryButton from "~/components/shared/external/GitHubRepositoryButton/GitHubRepositoryButton.vue";
import { mountSuspendedComponent } from "~/tests/unit/utils/helpers/mount.helpers";

describe("GitHub Repository Button", () => {
  let wrapper: ReturnType<typeof mount<typeof GitHubRepositoryButton>>;
  const defaultProps: GitHubRepositoryButtonProps = { textButton: "GitHub" };

  beforeEach(async() => {
    wrapper = await mountSuspendedComponent(GitHubRepositoryButton, { props: defaultProps });
  });

  it("should match snapshot when rendered.", () => {
    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });

  describe("Button Text", () => {
    it("should render button text with other text when text is passed as prop.", async() => {
      wrapper = await mountSuspendedComponent(GitHubRepositoryButton, { props: { textButton: "Other text" } });
      const buttonText = wrapper.find<HTMLAnchorElement>("#github-repository-link");

      expect(buttonText.text()).toBe("Other text");
    });

    it("should render button text with default text when text is not passed as prop.", async() => {
      wrapper = await mountSuspendedComponent(GitHubRepositoryButton);
      const buttonText = wrapper.find<HTMLAnchorElement>("#github-repository-link");

      expect(buttonText.text()).toBe("components.GitHubRepositoryButton.thisProjectIsOpenSource");
    });
  });
});