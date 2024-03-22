import type { mount } from "@vue/test-utils";
import type { ComponentMountingOptions } from "@vue/test-utils/dist/mount";

import type { GameLobbyRolePickerGridElementProps } from "~/components/pages/game-lobby/GameLobbyRolePicker/GameLobbyRolePickerGrid/GameLobbyRolePickerGridElement/game-lobby-role-picker-grid-element.types";
import GameLobbyRolePickerGridElement from "~/components/pages/game-lobby/GameLobbyRolePicker/GameLobbyRolePickerGrid/GameLobbyRolePickerGridElement/GameLobbyRolePickerGridElement.vue";
import type { Role } from "~/composables/api/role/types/role.class";
import { createFakeRole } from "~/tests/unit/utils/factories/composables/api/role/role.factory";
import { mountSuspendedComponent } from "~/tests/unit/utils/helpers/mount.helpers";

describe("Game Lobby Role Picker Grid Element Component", () => {
  let wrapper: ReturnType<typeof mount<typeof GameLobbyRolePickerGridElement>>;
  const defaultProps: GameLobbyRolePickerGridElementProps = { role: createFakeRole({ name: "seer" }) };

  async function mountGameLobbyRolePickerGridElementComponent(options: ComponentMountingOptions<typeof GameLobbyRolePickerGridElement> = {}):
  Promise<ReturnType<typeof mount<typeof GameLobbyRolePickerGridElement>>> {
    return mountSuspendedComponent(GameLobbyRolePickerGridElement, {
      props: defaultProps,
      ...options,
    });
  }

  beforeEach(async() => {
    wrapper = await mountGameLobbyRolePickerGridElementComponent();
  });

  it("should match snapshot when rendered.", () => {
    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });

  describe("Button", () => {
    it("should not have bright border when role is not picked.", () => {
      const button = wrapper.find("#game-lobby-role-picker-grid-element-button");

      expect(button.classes()).not.toContain("!border-gray-100");
    });

    it("should have bright border when role is picked.", async() => {
      wrapper = await mountGameLobbyRolePickerGridElementComponent({
        props: {
          ...defaultProps,
          isPicked: true,
        },
      });
      const button = wrapper.find("#game-lobby-role-picker-grid-element-button");

      expect(button.classes()).toContain("!border-gray-100");
    });
  });

  describe("Emits", () => {
    it("should emit pickRole event when clicked on button.", async() => {
      const button = wrapper.find("#game-lobby-role-picker-grid-element-button");
      await button.trigger("click");

      expect(wrapper.emitted("pickRole")).toHaveLength(1);
      expect(wrapper.emitted("pickRole")?.[0]).toStrictEqual<Role[]>([defaultProps.role]);
    });

    it("should emit pickRole event when clicked on role name.", async() => {
      const roleName = wrapper.find("#game-lobby-role-picker-grid-element-role-name");
      await roleName.trigger("click");

      expect(wrapper.emitted("pickRole")).toHaveLength(1);
      expect(wrapper.emitted("pickRole")?.[0]).toStrictEqual<Role[]>([defaultProps.role]);
    });
  });
});