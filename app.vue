<template>
  <NuxtLayout>
    <NuxtPage
      class="h-100 page-content"
    />
  </NuxtLayout>
</template>

<script lang="ts" setup>
import { useRolesStore } from "~/stores/role/useRolesStore";

const rolesStore = useRolesStore();
rolesStore.fetchAndSetRoles();
</script>

<style lang="scss" scoped>
.page-content {
  padding: 10px;
}
</style>