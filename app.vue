<template>
  <NuxtLayout>
    <NuxtPage
      class="h-full page-content"
    />

    <VuePrimeToast position="bottom-right"/>
  </NuxtLayout>
</template>

<script lang="ts" setup>
import "reflect-metadata";

import { useRolesStore } from "~/stores/role/useRolesStore";

const rolesStore = useRolesStore();
void rolesStore.fetchAndSetRoles();
</script>

<style lang="scss" scoped>
.page-content {
  padding: 10px;
}
</style>