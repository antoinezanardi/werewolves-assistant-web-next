import { createTestingPinia } from "@pinia/testing";
import type { mount } from "@vue/test-utils";
import type { ComponentMountingOptions } from "@vue/test-utils/dist/mount";
import type Radash from "radash";
import { vi } from "vitest";

import type { GameLobbyRolePickerGridElementProps } from "~/components/pages/game-lobby/GameLobbyRolePicker/GameLobbyRolePickerGrid/GameLobbyRolePickerGridElement/game-lobby-role-picker-grid-element.types";
import GameLobbyRolePickerGridElement from "~/components/pages/game-lobby/GameLobbyRolePicker/GameLobbyRolePickerGrid/GameLobbyRolePickerGridElement/GameLobbyRolePickerGridElement.vue";
import type { Role } from "~/composables/api/role/types/role.class";
import { StoreIds } from "~/stores/enums/store.enum";
import { useRolesStore } from "~/stores/role/useRolesStore";
import { createFakeRole } from "~/tests/unit/utils/factories/composables/api/role/role.factory";
import { mountSuspendedComponent } from "~/tests/unit/utils/helpers/mount.helpers";

const { radash: mockedRadash } = vi.hoisted(() => ({ radash: { draw: vi.fn() } }));

vi.mock("radash", async importOriginal => ({
  ...await importOriginal<typeof Radash>(),
  draw: vi.fn(mockedRadash.draw),
}));

describe("Game Lobby Role Picker Grid Element Component", () => {
  let wrapper: ReturnType<typeof mount<typeof GameLobbyRolePickerGridElement>>;
  const roles = [
    createFakeRole({ name: "seer" }),
    createFakeRole({ name: "villager" }),
    createFakeRole({ name: "werewolf" }),
  ];
  const testingPinia = { initialState: { [StoreIds.ROLES]: { roles } } };
  const defaultProps: GameLobbyRolePickerGridElementProps = { role: roles[0] };

  async function mountGameLobbyRolePickerGridElementComponent(options: ComponentMountingOptions<typeof GameLobbyRolePickerGridElement> = {}):
  Promise<ReturnType<typeof mount<typeof GameLobbyRolePickerGridElement>>> {
    return mountSuspendedComponent(GameLobbyRolePickerGridElement, {
      props: defaultProps,
      global: { plugins: [createTestingPinia(testingPinia)] },
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
    it("should not have bright border when role is not picked.", async() => {
      wrapper = await mountGameLobbyRolePickerGridElementComponent({
        props: {
          ...defaultProps,
          pickedRole: roles[1],
        },
      });
      const button = wrapper.find("#game-lobby-role-picker-grid-element-button");

      expect(button.classes()).not.toContain("!border-gray-100");
    });

    it("should not have bright border when role is not defined.", async() => {
      wrapper = await mountGameLobbyRolePickerGridElementComponent({
        props: {
          role: undefined,
          pickedRole: roles[1],
        },
      });
      const button = wrapper.find("#game-lobby-role-picker-grid-element-button");

      expect(button.classes()).not.toContain("!border-gray-100");
    });

    it("should have bright border when role is picked.", async() => {
      wrapper = await mountGameLobbyRolePickerGridElementComponent({
        props: {
          role: roles[1],
          pickedRole: roles[1],
        },
      });
      const button = wrapper.find("#game-lobby-role-picker-grid-element-button");

      expect(button.classes()).toContain("!border-gray-100");
    });
  });

  describe("Role Label", () => {
    it("should translate role label when role is defined.", () => {
      const roleName = wrapper.find("#game-lobby-role-picker-grid-element-role-name");

      expect(roleName.text()).toBe("shared.role.name.seer");
    });

    it("should translate random role label when role is not defined.", async() => {
      wrapper = await mountGameLobbyRolePickerGridElementComponent({ props: { role: undefined } });
      const roleName = wrapper.find("#game-lobby-role-picker-grid-element-role-name");

      expect(roleName.text()).toBe("components.GameLobbyRolePickerGridElement.random");
    });

    it("should display shuffle icon when role is not defined.", async() => {
      wrapper = await mountGameLobbyRolePickerGridElementComponent({ props: { role: undefined } });
      const shuffleIcon = wrapper.find("#shuffle-icon");

      expect(shuffleIcon.exists()).toBeTruthy();
    });

    it("should not display shuffle icon when role is defined.", () => {
      const shuffleIcon = wrapper.find("#shuffle-icon");

      expect(shuffleIcon.exists()).toBeFalsy();
    });

    it("should have italic gray classes when role is not defined.", async() => {
      wrapper = await mountGameLobbyRolePickerGridElementComponent({ props: { role: undefined } });
      const roleName = wrapper.find("#game-lobby-role-picker-grid-element-role-name");

      expect(roleName.classes()).toContain("italic");
      expect(roleName.classes()).toContain("text-gray-300");
    });
  });

  describe("Emits", () => {
    it("should emit pickRole event when clicked on button.", async() => {
      const button = wrapper.find("#game-lobby-role-picker-grid-element-button");
      await button.trigger("click");

      expect(wrapper.emitted("pickRole")).toHaveLength(1);
      expect(wrapper.emitted("pickRole")?.[0]).toStrictEqual<Role[]>([roles[0]]);
    });

    it("should emit pickRole event when clicked on role name.", async() => {
      const roleName = wrapper.find("#game-lobby-role-picker-grid-element-role-name");
      await roleName.trigger("click");

      expect(wrapper.emitted("pickRole")).toHaveLength(1);
      expect(wrapper.emitted("pickRole")?.[0]).toStrictEqual<Role[]>([roles[0]]);
    });

    it("should emit random role when role is not defined and no role is picked yet.", async() => {
      wrapper = await mountGameLobbyRolePickerGridElementComponent({
        props: {
          role: undefined,
          pickedRole: undefined,
        },
      });
      mockedRadash.draw.mockReturnValue(roles[1]);
      const button = wrapper.find("#game-lobby-role-picker-grid-element-button");
      await button.trigger("click");
      const emittedRole = wrapper.emitted("pickRole")?.[0][0];

      expect(mockedRadash.draw).toHaveBeenCalledExactlyOnceWith(roles);
      expect(wrapper.emitted("pickRole")).toHaveLength(1);
      expect(emittedRole).toStrictEqual<Role>(roles[1]);
    });

    it("should emit random role which can't be the same as the picked role when role is not defined but picked role is defined.", async() => {
      wrapper = await mountGameLobbyRolePickerGridElementComponent({
        props: {
          role: undefined,
          pickedRole: roles[0],
        },
      });
      mockedRadash.draw.mockReturnValue(roles[2]);
      const button = wrapper.find("#game-lobby-role-picker-grid-element-button");
      await button.trigger("click");
      const emittedRole = wrapper.emitted("pickRole")?.[0][0];

      expect(mockedRadash.draw).toHaveBeenCalledExactlyOnceWith([
        roles[1],
        roles[2],
      ]);
      expect(wrapper.emitted("pickRole")).toHaveLength(1);
      expect(emittedRole).toStrictEqual<Role>(roles[2]);
    });

    it("should not emit role pick event when roles are not defined in store.", async() => {
      const rolesStore = useRolesStore();
      rolesStore.roles = null;
      await nextTick();
      const button = wrapper.find("#game-lobby-role-picker-grid-element-button");
      await button.trigger("click");

      expect(wrapper.emitted("pickRole")).toBeUndefined();
    });
  });
});