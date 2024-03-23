import type { AsyncDataRequestStatus } from "#app/composables/asyncData";
import { defineStore } from "pinia";
import { ref } from "vue";

import type { Role } from "~/composables/api/role/types/role.class";
import type { RoleName } from "~/composables/api/role/types/role.types";
import { useFetchRoles } from "~/composables/api/role/useFetchRoles";
import { StoreIds } from "~/stores/enums/store.enum";

const useRolesStore = defineStore(StoreIds.ROLES, () => {
  const { fetchRoles } = useFetchRoles();

  const fetchingRoleStatus = ref<AsyncDataRequestStatus>("idle");
  const roles = ref<Role[] | null>(null);

  async function fetchAndSetRoles(): Promise<void> {
    fetchingRoleStatus.value = "pending";
    roles.value = await fetchRoles();
    fetchingRoleStatus.value = "success";
  }

  function getRoleWithNameInRoles(roleName: RoleName): Role | undefined {
    return roles.value?.find(role => role.name === roleName);
  }
  return {
    roles,
    fetchingRoleStatus,
    fetchAndSetRoles,
    getRoleWithNameInRoles,
  };
});

export { useRolesStore };