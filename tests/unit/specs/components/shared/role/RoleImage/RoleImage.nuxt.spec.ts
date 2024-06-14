import { NuxtImg } from "#components";
import type { mount } from "@vue/test-utils";
import type { ComponentMountingOptions } from "@vue/test-utils/dist/mount";

import type { RoleImageProps } from "~/components/shared/role/RoleImage/role-image.types";
import RoleImage from "~/components/shared/role/RoleImage/RoleImage.vue";
import * as UseRoleName from "~/composables/api/role/useRoleName";
import { mountSuspendedComponent } from "@tests/unit/utils/helpers/mount.helpers";

describe("Role Image Component", () => {
  let wrapper: ReturnType<typeof mount<typeof RoleImage>>;
  const defaultProps: RoleImageProps = {
    alt: "werewolf img",
    roleName: "werewolf",
  };

  async function mountRoleImageComponent(options: ComponentMountingOptions<typeof RoleImage> = {}): Promise<ReturnType<typeof mount<typeof RoleImage>>> {
    return mountSuspendedComponent(RoleImage, {
      props: defaultProps,
      ...options,
    });
  }

  beforeEach(async() => {
    vi.spyOn(UseRoleName, "useRoleName").mockReturnValue({
      getRoleNameLabel: vi.fn().mockReturnValue("werewolf"),
      getDefiniteRoleNameLabel: vi.fn().mockReturnValue("werewolf 1"),
    });
    wrapper = await mountRoleImageComponent();
  });

  it("should match snapshot when rendered.", () => {
    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });

  describe("Image", () => {
    describe("Size", () => {
      it("should have default width and height from props sizes when rendered.", () => {
        const image = wrapper.findComponent<typeof NuxtImg>("[alt='werewolf img']");

        expect(image.attributes("width")).toBe("50px");
        expect(image.attributes("height")).toBe("50px");
      });
    });

    describe("Src", () => {
      it("should have back src when prop role image is undefined.", async() => {
        wrapper = await mountRoleImageComponent({ props: { alt: "back image" } });
        const image = wrapper.findComponent<typeof NuxtImg>("[alt='back image']");

        expect(image.attributes("src")).toBe("/img/role/back.jpeg");
      });

      it("should have src based on role name from props when rendered.", () => {
        const image = wrapper.findComponent<typeof NuxtImg>("[alt='werewolf img']");

        expect(image.attributes("src")).toBe("http://127.0.0.1/public/assets/images/roles/werewolf/werewolf.jpeg");
      });

      it("should have small suffix for src when definition from props is small.", async() => {
        await wrapper.setProps({ definition: "small" });
        const image = wrapper.findComponent<typeof NuxtImg>("[alt='werewolf img']");

        expect(image.attributes("src")).toBe("http://127.0.0.1/public/assets/images/roles/werewolf/werewolf-small.jpeg");
      });
    });

    describe("Alt", () => {
      it("should have alt from props when rendered.", () => {
        const image = wrapper.findComponent<typeof NuxtImg>("[alt='werewolf img']");

        expect(image.attributes("alt")).toBe("werewolf img");
      });

      it("should have alt from role name when alt from props is undefined but role name is defined.", async() => {
        wrapper = await mountRoleImageComponent({ props: { alt: undefined, roleName: "werewolf" } });
        const image = wrapper.findComponent<typeof NuxtImg>(NuxtImg);

        expect(image.attributes("alt")).toBe("shared.role.name.werewolf");
      });

      it("should have back alt when alt from props is undefined and role name is undefined.", async() => {
        await mountRoleImageComponent({ props: { alt: undefined, roleName: undefined } });
        wrapper = await mountRoleImageComponent({ props: { alt: undefined, roleName: undefined } });
        const image = wrapper.findComponent<typeof NuxtImg>(NuxtImg);

        expect(image.attributes("alt")).toBe("components.RoleImage.back");
      });
    });
  });
});