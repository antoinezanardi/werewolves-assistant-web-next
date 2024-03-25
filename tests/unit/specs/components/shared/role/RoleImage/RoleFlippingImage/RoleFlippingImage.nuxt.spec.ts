import type { mount } from "@vue/test-utils";
import type { ComponentMountingOptions } from "@vue/test-utils/dist/mount";

import type { VueFlip } from "#components";
import type { RoleFlippingImageProps } from "~/components/shared/role/RoleImage/RoleFlippingImage/role-flipping-image.types";
import RoleFlippingImage from "~/components/shared/role/RoleImage/RoleFlippingImage/RoleFlippingImage.vue";
import type RoleImage from "~/components/shared/role/RoleImage/RoleImage.vue";
import { mountSuspendedComponent } from "~/tests/unit/utils/helpers/mount.helpers";

describe("Role Flipping Image Component", () => {
  let wrapper: ReturnType<typeof mount<typeof RoleFlippingImage>>;
  const defaultProps: RoleFlippingImageProps = { roleName: "werewolf" };

  async function mountRoleFlippingImageComponent(options: ComponentMountingOptions<typeof RoleFlippingImage> = {}): Promise<ReturnType<typeof mount<typeof RoleFlippingImage>>> {
    return mountSuspendedComponent(RoleFlippingImage, {
      shallow: false,
      global: { stubs: { RoleImage: true } },
      props: defaultProps,
      ...options,
    });
  }

  beforeEach(async() => {
    wrapper = await mountRoleFlippingImageComponent();
  });

  it("should match snapshot when rendered.", () => {
    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });

  describe("Flip Container", () => {
    it("should set flipped to false when rendered.", async() => {
      wrapper = await mountRoleFlippingImageComponent({ shallow: true });

      const flipContainer = wrapper.findComponent<typeof VueFlip>("#role-flipping-image");

      expect(flipContainer.attributes("modelvalue")).toBe("false");
    });

    it("should set height and width from props when rendered.", async() => {
      wrapper = await mountRoleFlippingImageComponent({
        shallow: true,
        props: {
          ...defaultProps,
          sizes: "100px",
        },
      });
      const flipContainer = wrapper.findComponent<typeof VueFlip>("#role-flipping-image");

      expect(flipContainer.attributes("height")).toBe("100px");
      expect(flipContainer.attributes("width")).toBe("100px");
    });

    describe("Front Role Image", () => {
      it("should set front image role from props when rendered.", () => {
        const frontRoleImage = wrapper.findComponent<typeof RoleImage>("#front-role-image");

        expect(frontRoleImage.props("roleName")).toBe("werewolf");
      });

      it("should set back flip to false when the role is updated twice in props.", async() => {
        wrapper = await mountRoleFlippingImageComponent({ shallow: true });
        const flipContainer = wrapper.findComponent<typeof VueFlip>("#role-flipping-image");
        await wrapper.setProps({ roleName: "villager" });
        await wrapper.setProps({ roleName: "seer" });

        expect(flipContainer.attributes("modelvalue")).toBe("false");
      });

      it("should set front image role as the new role when the role is updated twice in props.", async() => {
        const frontRoleImage = wrapper.findComponent<typeof RoleImage>("#front-role-image");
        await wrapper.setProps({ roleName: "villager" });
        await wrapper.setProps({ roleName: "seer" });

        expect(frontRoleImage.props("roleName")).toBe("seer");
      });
    });

    describe("Back Role Image", () => {
      it("should set back image role as undefined when rendered.", () => {
        const backRoleImage = wrapper.findComponent<typeof RoleImage>("#back-role-image");

        expect(backRoleImage.props("roleName")).toBeUndefined();
      });

      it("should flip the card when the role is updated in props.", async() => {
        wrapper = await mountRoleFlippingImageComponent({ shallow: true });
        const flipContainer = wrapper.findComponent<typeof VueFlip>("#role-flipping-image");
        await wrapper.setProps({ roleName: "villager" });

        expect(flipContainer.attributes("modelvalue")).toBe("true");
      });

      it("should set back image role as the new role when the role is updated in props.", async() => {
        const backRoleImage = wrapper.findComponent<typeof RoleImage>("#back-role-image");
        await wrapper.setProps({ roleName: "villager" });

        expect(backRoleImage.props("roleName")).toBe("villager");
      });
    });
  });
});