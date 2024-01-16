<template>
  <NuxtPage class="h-100"/>
</template>

<script lang="ts" setup>
import { useRolesStore } from "~/stores/role/useRolesStore";

const rolesStore = useRolesStore();
rolesStore.fetchAndSetRoles();
</script>