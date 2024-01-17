<template>
  <div id="parameters-menu">
    <VuePrimeButton
      :aria-label="$t('components.ParametersMenu.parameters')"
      icon="fa fa-cog"
      severity="secondary"
      type="button"
      @click="toggleParametersMenu"
    />

    <VuePrimeMenu
      id="overlay_menu"
      ref="parametersMenu"
      :aria-label="$t('components.ParametersMenu.parametersMenu')"
      :model="parametersMenuItems"
      popup
    />
  </div>
</template>

<script lang="ts" setup>
import type { MenuItem } from "primevue/menuitem";
import { ref } from "vue";

import type { VuePrimeMenu } from "#components";

const { t } = useI18n();

const parametersMenuItems: MenuItem[] = [
  {
    label: t("components.ParametersMenu.backToHome"),
    icon: "fa fa-sign-out",
    command: async() => await navigateTo("/"),
  },
];

const parametersMenu = ref<InstanceType<typeof VuePrimeMenu> | null>(null);

function toggleParametersMenu(event: MouseEvent): void {
  parametersMenu.value?.toggle(event);
}
</script>