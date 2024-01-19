import { StoreIds } from "~/stores/enums/store.enum";
import type { useRolesStore } from "~/stores/role/useRolesStore";

function createFakeUseRoleStore(): ReturnType<typeof useRolesStore> {
  return {
    $state: {
      roles: [],
      fetchingRoleStatus: "idle",
    },
    $id: StoreIds.ROLES,
    roles: [],
    fetchAndSetRoles: vi.fn(),
    fetchingRoleStatus: "idle",
    $onAction: vi.fn(),
    _customProperties: new Set(),
    $reset: vi.fn(),
    $dispose: vi.fn(),
    $subscribe: vi.fn(),
    $patch: () => vi.fn(),
  };
}

export { createFakeUseRoleStore };