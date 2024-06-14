import type { mount } from "@vue/test-utils";
import type { ComponentMountingOptions } from "@vue/test-utils/dist/mount";

import type { GameLobbyRolePickerDescriptionContentProps } from "~/components/pages/game-lobby/GameLobbyRolePicker/GameLobbyRolePickerDescription/GameLobbyRolePickerDescriptionContent/game-lobby-role-picker-description-content.types";
import GameLobbyRolePickerDescriptionContent from "~/components/pages/game-lobby/GameLobbyRolePicker/GameLobbyRolePickerDescription/GameLobbyRolePickerDescriptionContent/GameLobbyRolePickerDescriptionContent.vue";
import { createFakeRole } from "@tests/unit/utils/factories/composables/api/role/role.factory";
import { mountSuspendedComponent } from "@tests/unit/utils/helpers/mount.helpers";

describe("Game Lobby Role Picker Description Content Component", () => {
  let wrapper: ReturnType<typeof mount<typeof GameLobbyRolePickerDescriptionContent>>;
  const defaultProps: GameLobbyRolePickerDescriptionContentProps = {
    pickedRole: createFakeRole({
      name: "seer",
      type: "villager",
      side: "villagers",
      origin: "classic",
    }),
  };

  async function mountGameLobbyRolePickerDescriptionContentComponent(options: ComponentMountingOptions<typeof GameLobbyRolePickerDescriptionContent> = {}):
  Promise<ReturnType<typeof mount<typeof GameLobbyRolePickerDescriptionContent>>> {
    return mountSuspendedComponent(GameLobbyRolePickerDescriptionContent, {
      props: defaultProps,
      ...options,
    });
  }

  beforeEach(async() => {
    wrapper = await mountGameLobbyRolePickerDescriptionContentComponent();
  });

  it("should match snapshot when rendered.", () => {
    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });

  describe("Role Name", () => {
    it("should translate role name when rendered.", () => {
      const roleName = wrapper.find<HTMLHeadingElement>("#role-name");

      expect(roleName.text()).toBe("shared.role.name.seer");
    });
  });
});