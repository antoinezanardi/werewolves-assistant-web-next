import type { mount } from "@vue/test-utils";
import { expect } from "vitest";

import type RoleImage from "~/components/shared/role/RoleImage/RoleImage.vue";
import { RoleNames } from "~/composables/api/role/enums/role.enums";
import About from "~/pages/about.vue";
import { mountSuspendedComponent } from "~/tests/unit/utils/helpers/mount.helpers";

describe("About Page Component", () => {
  let wrapper: ReturnType<typeof mount<typeof About>>;

  beforeEach(async() => {
    wrapper = await mountSuspendedComponent(About);
  });

  it("should match snapshot when rendered.", () => {
    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });

  describe("Title", () => {
    it("should display role image of werewolf when rendered.", () => {
      const roleImage = wrapper.findComponent<typeof RoleImage>("#about-role-image-title");

      expect(roleImage.props("roleName")).toBe(RoleNames.WEREWOLF);
    });

    it("should display translated title when rendered.", () => {
      const title = wrapper.find<HTMLHeadElement>("#about-title");

      expect(title.text()).toBe("Why an assistant ?");
    });
  });
});