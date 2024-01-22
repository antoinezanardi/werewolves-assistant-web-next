<template>
  <div
    id="navbar"
    class="align-items-center d-flex justify-content-between py-1"
  >
    <NuxtLink
      :aria-label="$t('components.NavBar.homePage')"
      class="align-items-center d-flex"
      to="/"
    >
      <NuxtImg
        id="werewolves-assistant-logo"
        :aria-label="$t('components.NavBar.werewolvesAssistantLogo')"
        src="/img/logo/square/werewolves-logo-small.png"
      />

      <div
        :aria-label="$t('shared.werewolvesAssistant')"
        class="ms-2"
      >
        {{ $t("shared.werewolvesAssistant") }}
      </div>
    </NuxtLink>

    <ParametersMenu
      v-p-tooltip.left="$t('components.NavBar.parameters')"
      :aria-label="$t('components.NavBar.parametersMenu')"
    />
  </div>
</template>

<script setup lang="ts">
import ParametersMenu from "~/components/layouts/default/NavBar/ParametersMenu/ParametersMenu.vue";
</script>

<style scoped lang="scss">
#navbar {
  border-bottom: 1px solid #282424;
  height: 4rem;
  background-color: #343A3F;
  padding: 0 1rem;

  #werewolves-assistant-logo {
    height: 2.5rem;
  }
}
</style>