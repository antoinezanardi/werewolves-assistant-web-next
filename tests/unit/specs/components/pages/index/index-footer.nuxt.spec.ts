import type { mount } from "@vue/test-utils";

import IndexFooter from "~/components/pages/index/IndexFooter.vue";
import { mountSuspendedComponent } from "~/tests/unit/utils/helpers/mount.helpers";

describe("Index Page Footer Component", () => {
  let wrapper: ReturnType<typeof mount<typeof IndexFooter>>;

  beforeEach(async() => {
    wrapper = await mountSuspendedComponent(IndexFooter);
  });

  it("should render component and match snapshot when mounted.", () => {
    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });

  describe("Contact Me Button", () => {
    it("should render contact me with translated text button when rendered.", () => {
      const contactMeButton = wrapper.find("[aria-label='Contact me']");

      expect(contactMeButton.text()).toBe("Contact me");
    });
  });
});