<template>
  <div
    id="navbar"
    :aria-label="$t('components.NavBar.navBar')"
    class="align-items-center d-flex justify-content-between py-1"
    role="navigation"
  >
    <NuxtLink
      :aria-label="$t('components.NavBar.homePageLink')"
      class="align-items-center d-flex"
      to="/"
    >
      <NuxtImg
        id="werewolves-assistant-logo"
        :alt="$t('components.NavBar.werewolvesAssistantLogo')"
        src="/img/logo/square/werewolves-logo-small.png"
      />

      <h3
        :aria-label="$t('shared.werewolvesAssistant')"
        class="ms-2"
      >
        {{ $t("shared.werewolvesAssistant") }}
      </h3>
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