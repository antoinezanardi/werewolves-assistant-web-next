import { createTestingPinia } from "@pinia/testing";
import type { mount } from "@vue/test-utils";
import type { ComponentMountingOptions } from "@vue/test-utils/dist/mount";

import GameLobbyRolePickerGrid from "~/components/pages/game-lobby/GameLobbyRolePicker/GameLobbyRolePickerGrid/GameLobbyRolePickerGrid.vue";
import type GameLobbyRolePickerGridElement from "~/components/pages/game-lobby/GameLobbyRolePicker/GameLobbyRolePickerGrid/GameLobbyRolePickerGridElement/GameLobbyRolePickerGridElement.vue";
import type { Role } from "~/composables/api/role/types/role.class";
import { StoreIds } from "~/stores/enums/store.enum";
import { createFakeRole } from "@tests/unit/utils/factories/composables/api/role/role.factory";
import { mountSuspendedComponent } from "@tests/unit/utils/helpers/mount.helpers";
import type { VueVm } from "@tests/unit/utils/types/vue-test-utils.types";
import { useRolesStore } from "~/stores/role/useRolesStore";

describe("Game Lobby Role Picker Grid Component", () => {
  let wrapper: ReturnType<typeof mount<typeof GameLobbyRolePickerGrid>>;
  const roles = [
    createFakeRole({
      name: "villager",
      side: "villagers",
    }),
    createFakeRole({
      name: "accursed-wolf-father",
      side: "werewolves",
    }),
    createFakeRole({
      name: "werewolf",
      side: "werewolves",
    }),
    createFakeRole({
      name: "seer",
      side: "villagers",
    }),
  ];
  const testingPinia = { initialState: { [StoreIds.ROLES]: { roles } } };

  async function mountGameLobbyRolePickerGridComponent(options: ComponentMountingOptions<typeof GameLobbyRolePickerGrid> = {}):
  Promise<ReturnType<typeof mount<typeof GameLobbyRolePickerGrid>>> {
    return mountSuspendedComponent(GameLobbyRolePickerGrid, {
      global: { plugins: [createTestingPinia(testingPinia)] },
      ...options,
    });
  }

  beforeEach(async() => {
    wrapper = await mountGameLobbyRolePickerGridComponent();
  });

  it("should match snapshot when rendered.", () => {
    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });

  describe("Available roles", () => {
    it("should render sorted available roles plus random role when rendered.", () => {
      const roleCards = wrapper.findAllComponents<typeof GameLobbyRolePickerGridElement>(".available-role");

      expect(roleCards).toHaveLength(roles.length + 1);
      expect(roleCards[0].props("role")).toBeUndefined();
      expect(roleCards[1].props("role")).toStrictEqual<Role>(roles[1]);
      expect(roleCards[2].props("role")).toStrictEqual<Role>(roles[2]);
      expect(roleCards[3].props("role")).toStrictEqual<Role>(roles[3]);
      expect(roleCards[4].props("role")).toStrictEqual<Role>(roles[0]);
    });

    it("should render only random role when there are no available roles.", async() => {
      const rolesStore = useRolesStore();
      rolesStore.roles = null;
      await nextTick();
      const roleCards = wrapper.findAllComponents<typeof GameLobbyRolePickerGridElement>(".available-role");

      expect(roleCards).toHaveLength(1);
      expect(roleCards[0].props("role")).toBeUndefined();
    });
  });

  describe("Emits", () => {
    it("should emit pickRole event when role element emits a pick role event.", () => {
      const roleCards = wrapper.findAllComponents<typeof GameLobbyRolePickerGridElement>(".available-role");

      (roleCards[0].vm as VueVm).$emit("pick-role", roles[0]);

      expect(wrapper.emitted("pickRole")).toHaveLength(1);
      expect(wrapper.emitted("pickRole")?.[0]).toStrictEqual<Role[]>([roles[0]]);
    });
  });
});