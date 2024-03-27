<template>
  <NuxtLayout>
    <NuxtPage
      class="h-full p-2"
    />

    <VuePrimeToast position="bottom-right"/>
  </NuxtLayout>
</template>

<script lang="ts" setup>
import "reflect-metadata";

import { useRolesStore } from "~/stores/role/useRolesStore";

const rolesStore = useRolesStore();

const { t } = useI18n();

useHead({
  title: t("shared.werewolvesAssistant"),
  meta: [
    { name: "application-name", content: t("shared.werewolvesAssistant") },
    { name: "creator", content: "Antoine ZANARDI" },
    { name: "description", content: t("components.App.seoDescription") },
    { name: "viewport", content: "width=device-width, initial-scale=1" },
    { name: "charset", content: "utf-8" },
    { name: "generator", content: "nuxt" },
    { name: "color-scheme", content: "dark" },
  ],
});

void rolesStore.fetchAndSetRoles();
</script>

<style lang="scss" scoped>
.page-content {
  padding: 10px;
}
</style>