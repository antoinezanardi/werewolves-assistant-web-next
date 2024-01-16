import type { AsyncDataRequestStatus } from "#app/composables/asyncData";
import type { Mock } from "vitest";

import type { Role } from "~/composables/api/role/types/role.types";

type MockedUseRoleStore = {
  roles: Role[] | null;
  fetchAndSetRoles: Mock;
  fetchingRoleStatus: AsyncDataRequestStatus;
};

function createFakeUseRoleStore(): MockedUseRoleStore {
  return {
    roles: [],
    fetchAndSetRoles: vi.fn(),
    fetchingRoleStatus: "idle",
  };
}

export { createFakeUseRoleStore };