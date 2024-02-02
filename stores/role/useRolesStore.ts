import type { AsyncDataRequestStatus } from "#app/composables/asyncData";
import { ref } from "vue";
import { defineStore } from "pinia";

import type { Role } from "~/composables/api/role/types/role.class";
import { useFetchRoles } from "~/composables/api/role/useFetchRoles";
import { StoreIds } from "~/stores/enums/store.enum";

const useRolesStore = defineStore(StoreIds.ROLES, () => {
  const { fetchRoles } = useFetchRoles();

  const fetchingRoleStatus = ref<AsyncDataRequestStatus>("idle");
  const roles = ref<Role[] | null>(null);

  async function fetchAndSetRoles(): Promise<void> {
    fetchingRoleStatus.value = "pending";
    const { data, status } = await fetchRoles();
    roles.value = data.value;
    fetchingRoleStatus.value = status.value;
  }
  return {
    roles,
    fetchingRoleStatus,
    fetchAndSetRoles,
  };
});

export { useRolesStore };