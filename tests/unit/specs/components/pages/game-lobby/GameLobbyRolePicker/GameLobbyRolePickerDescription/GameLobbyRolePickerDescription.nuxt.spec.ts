import type { mount } from "@vue/test-utils";
import type { ComponentMountingOptions } from "@vue/test-utils/dist/mount";
import type VueUseCore from "@vueuse/core";

import type { GameLobbyRolePickerDescriptionProps } from "~/components/pages/game-lobby/GameLobbyRolePicker/GameLobbyRolePickerDescription/game-lobby-role-picker-description.types";
import GameLobbyRolePickerDescription from "~/components/pages/game-lobby/GameLobbyRolePicker/GameLobbyRolePickerDescription/GameLobbyRolePickerDescription.vue";
import type GameLobbyRolePickerDescriptionContent from "~/components/pages/game-lobby/GameLobbyRolePicker/GameLobbyRolePickerDescription/GameLobbyRolePickerDescriptionContent/GameLobbyRolePickerDescriptionContent.vue";
import { createFakeRole } from "@tests/unit/utils/factories/composables/api/role/role.factory";
import { mountSuspendedComponent } from "@tests/unit/utils/helpers/mount.helpers";
import type RoleFlippingImage from "~/components/shared/role/RoleImage/RoleFlippingImage/RoleFlippingImage.vue";

const hoistedMocks = vi.hoisted(() => ({
  useScroll: { y: { value: 0 } },
  useAppBreakpoints: {
    isSmallerThanMdBreakpoint: { value: false },
  },
}));

vi.mock("~/composables/style/useAppBreakpoints", () => ({
  useAppBreakpoints: (): typeof hoistedMocks.useAppBreakpoints => hoistedMocks.useAppBreakpoints,
}));

vi.mock("@vueuse/core", async importOriginal => ({
  ...await importOriginal<typeof VueUseCore>(),
  useScroll: vi.fn(() => hoistedMocks.useScroll),
}));

describe("Game Lobby Role Picker Description Component", () => {
  let wrapper: ReturnType<typeof mount<typeof GameLobbyRolePickerDescription>>;
  const defaultProps: GameLobbyRolePickerDescriptionProps = { pickedRole: createFakeRole({ name: "seer" }) };

  async function mountGameLobbyRolePickerDescriptionComponent(options: ComponentMountingOptions<typeof GameLobbyRolePickerDescription> = {}):
  Promise<ReturnType<typeof mount<typeof GameLobbyRolePickerDescription>>> {
    return mountSuspendedComponent(GameLobbyRolePickerDescription, {
      props: defaultProps,
      ...options,
    });
  }

  beforeEach(async() => {
    hoistedMocks.useAppBreakpoints.isSmallerThanMdBreakpoint.value = false;
    hoistedMocks.useScroll.y = ref(0);
    wrapper = await mountGameLobbyRolePickerDescriptionComponent();
  });

  it("should match snapshot when rendered.", () => {
    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });

  describe("Main Content", () => {
    it("should render no picked role container when picked role is not defined.", async() => {
      wrapper = await mountGameLobbyRolePickerDescriptionComponent({ props: { pickedRole: undefined } });
      const noPickedRoleContainer = wrapper.find<HTMLDivElement>("#no-picked-role-container");

      expect(noPickedRoleContainer.exists()).toBeTruthy();
    });

    it("should set role flipping image size to 200px when screen is not smaller than md.", () => {
      const roleFlippingImage = wrapper.findComponent<typeof RoleFlippingImage>("#role-flipping-image");

      expect(roleFlippingImage.attributes("sizes")).toBe("200px");
    });

    it("should set role flipping image size to 75px when screen is smaller than md.", async() => {
      hoistedMocks.useAppBreakpoints.isSmallerThanMdBreakpoint.value = true;
      wrapper = await mountGameLobbyRolePickerDescriptionComponent();
      const roleFlippingImage = wrapper.findComponent<typeof RoleFlippingImage>("#role-flipping-image");

      expect(roleFlippingImage.attributes("sizes")).toBe("75px");
    });

    it("should translate no picked role text when picked role is not defined.", async() => {
      wrapper = await mountGameLobbyRolePickerDescriptionComponent({ props: { pickedRole: undefined } });
      const noPickedRoleText = wrapper.find<HTMLParagraphElement>("#no-picked-role-container");

      expect(noPickedRoleText.text()).toBe("Pick a role");
    });

    it("should render description content when picked role is defined.", () => {
      const descriptionContent = wrapper.findComponent<typeof GameLobbyRolePickerDescriptionContent>("#game-lobby-role-picker-description-content");

      expect(descriptionContent.exists()).toBeTruthy();
    });

    it("should initialize smooth scrolling when rendered.", () => {
      expect(useScroll).toHaveBeenCalledExactlyOnceWith(expect.anything(), { behavior: "smooth" });
    });

    it("should scroll back to top when picked role is changed.", async() => {
      hoistedMocks.useScroll.y.value = 20;
      await wrapper.setProps({ pickedRole: createFakeRole({ name: "villager" }) });
      await nextTick();

      expect(hoistedMocks.useScroll.y.value).toBe(0);
    });
  });
});