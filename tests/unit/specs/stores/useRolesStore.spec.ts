import { createPinia, setActivePinia } from "pinia";
import { expect } from "vitest";
import type { Mock } from "vitest";
import { ref } from "vue";

import type { Role } from "~/composables/api/role/types/role.types";
import { useRolesStore } from "~/stores/role/useRolesStore";
import * as UseFetchRolesComposable from "~/composables/api/role/useFetchRoles";
import { createFakeRole } from "~/tests/unit/utils/factories/composables/api/role/types/role.types.factory";

describe("Roles Store", () => {
  let mockedUseFetchRoles: {
    fetchRoles: Mock;
  };

  beforeEach(() => {
    mockedUseFetchRoles = { fetchRoles: vi.fn().mockResolvedValue({ data: ref([]), status: ref("success") }) };
    vi.spyOn(UseFetchRolesComposable, "useFetchRoles").mockImplementation(() => mockedUseFetchRoles);
    setActivePinia(createPinia());
  });

  it("should have initial state when created.", () => {
    const rolesStore = useRolesStore();

    expect(rolesStore.roles).toBeNull();
    expect(rolesStore.fetchingRoleStatus).toBe("idle");
  });

  describe("fetchAndSetRoles", () => {
    it("should fetch roles when called.", async() => {
      const rolesStore = useRolesStore();
      await rolesStore.fetchAndSetRoles();

      expect(mockedUseFetchRoles.fetchRoles).toHaveBeenCalledExactlyOnceWith();
    });

    it("should set roles when called.", async() => {
      const roles: Role[] = [
        createFakeRole(),
        createFakeRole(),
        createFakeRole(),
      ];
      mockedUseFetchRoles.fetchRoles.mockResolvedValue({ data: ref(roles), status: ref("success") });
      const rolesStore = useRolesStore();
      await rolesStore.fetchAndSetRoles();

      expect(rolesStore.roles).toStrictEqual<Role[]>(roles);
    });
  });
});