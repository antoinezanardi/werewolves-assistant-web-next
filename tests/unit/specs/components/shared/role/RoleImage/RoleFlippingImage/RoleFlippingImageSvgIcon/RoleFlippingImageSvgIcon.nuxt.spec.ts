import type { mount } from "@vue/test-utils";
import type { ComponentMountingOptions } from "@vue/test-utils/dist/mount";
import type { RoleFlippingImageSvgIconProps } from "~/components/shared/role/RoleImage/RoleFlippingImage/RoleFlippingImageSvgIcon/role-flipping-image-svg-icon.types";
import RoleFlippingImageSvgIcon from "~/components/shared/role/RoleImage/RoleFlippingImage/RoleFlippingImageSvgIcon/RoleFlippingImageSvgIcon.vue";

import { mountSuspendedComponent } from "~/tests/unit/utils/helpers/mount.helpers";

describe("Role Flipping Image Svg Icon Component", () => {
  let wrapper: ReturnType<typeof mount<typeof RoleFlippingImageSvgIcon>>;
  const defaultProps: RoleFlippingImageSvgIconProps = { svgIconPath: "/svg/werewolf.svg" };

  async function mountRoleFlippingImageSvgIconComponent(options: ComponentMountingOptions<typeof RoleFlippingImageSvgIcon> = {}):
  Promise<ReturnType<typeof mount<typeof RoleFlippingImageSvgIcon>>> {
    return mountSuspendedComponent(RoleFlippingImageSvgIcon, {
      props: defaultProps,
      ...options,
    });
  }

  beforeEach(async() => {
    wrapper = await mountRoleFlippingImageSvgIconComponent();
  });

  it("should match snapshot when rendered.", () => {
    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });

  describe("Size", () => {
    it("should set height to 75 when rendered.", () => {
      expect(wrapper.attributes("height")).toBe("75");
    });

    it("should set width to 75 when rendered.", () => {
      expect(wrapper.attributes("width")).toBe("75");
    });
  });
});