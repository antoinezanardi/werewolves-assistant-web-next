<template>
  <nav
    id="navbar"
    :aria-label="$t('components.NavBar.navBar')"
    class="flex items-center justify-between py-1"
    role="navigation"
  >
    <NuxtLink
      id="navbar-logo-link"
      aria-labelledby="navbar-werewolves-assistant-logo-text"
      class="flex items-center"
      to="/"
    >
      <NuxtImg
        id="navbar-werewolves-assistant-logo"
        :alt="$t('components.NavBar.werewolvesAssistantLogo')"
        src="/img/logo/square/werewolves-logo-small.png"
      />

      <h3
        id="navbar-werewolves-assistant-logo-text"
        class="ms-2"
      >
        {{ $t("shared.werewolvesAssistant") }}
      </h3>
    </NuxtLink>

    <ParametersMenu
      id="navbar-parameters-menu"
      v-p-tooltip.left="$t('components.NavBar.parameters')"
    />
  </nav>
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

  #navbar-werewolves-assistant-logo {
    height: 2.5rem;
  }
}
</style>