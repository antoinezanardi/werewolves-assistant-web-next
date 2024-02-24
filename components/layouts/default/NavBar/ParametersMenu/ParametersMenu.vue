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
      id="overlay-menu"
      ref="parametersMenu"
      :aria-label="$t('components.ParametersMenu.parametersMenu')"
      :model="parametersMenuItems"
      popup
    />
  </div>
</template>

<script lang="ts" setup>
import { storeToRefs } from "pinia";
import type { MenuItem } from "primevue/menuitem";
import { ref } from "vue";

import { VuePrimeMenu } from "#components";
import { useVuePrimeToasts } from "~/composables/vue-prime/useVuePrimeToasts";
import { useGameStore } from "~/stores/game/useGameStore";

const gameStore = useGameStore();
const { cancelGame: cancelGameFromStore } = gameStore;
const { game } = storeToRefs(gameStore);
const { t } = useI18n();
const { addSuccessToast } = useVuePrimeToasts();

const gameMenuItems = computed<MenuItem>(() => ({
  visible: !!game.value._id,
  label: t("components.ParametersMenu.game"),
  items: [
    {
      label: t("components.ParametersMenu.cancelGame"),
      icon: "fa fa-ban text-danger",
      disabled: game.value.status !== "playing",
      command: (): void => {
        cancelGame();
      },
    },
  ],
}));

const parametersMenuItems = computed<MenuItem[]>(() => [
  gameMenuItems.value,
  {
    label: t("components.ParametersMenu.backToHome"),
    icon: "fa fa-sign-out",
    arialLabel: t("components.ParametersMenu.backToHome"),
    command(): void {
      void navigateTo("/");
    },
  },
]);

const parametersMenu = ref<InstanceType<typeof VuePrimeMenu> | null>(null);

function toggleParametersMenu(event: MouseEvent): void {
  if (!parametersMenu.value) {
    throw createError("Parameters Menu is not initialized");
  }
  parametersMenu.value.toggle(event);
}

function cancelGame(): void {
  void cancelGameFromStore();
  addSuccessToast({ summary: t("components.ParametersMenu.gameCanceled") });
}
</script>