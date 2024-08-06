<template>
  <nav
    id="navbar"
    :aria-label="$t('components.NavBar.navBar')"
    class="bg-gray-900 border-b border-b-slate-800 flex items-center justify-between py-1"
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
        placeholder="/svg/misc/infinite-spinner.svg"
        src="/img/logo/square/werewolves-logo-small.png"
      />

      <h3
        id="navbar-werewolves-assistant-logo-text"
        class="ms-2"
      >
        {{ $t("shared.werewolvesAssistant") }}
      </h3>
    </NuxtLink>

    <div class="flex gap-4 items-center">
      <Transition
        mode="out-in"
        name="fade"
      >
        <MuteButton
          v-if="isOnGamePage"
          id="navbar-mute-button"
        />
      </Transition>

      <ParametersMenu
        id="navbar-parameters-menu"
        v-p-tooltip="$t('components.NavBar.parameters')"
      />
    </div>
  </nav>
</template>

<script setup lang="ts">
import MuteButton from "~/components/layouts/default/NavBar/MuteButton/MuteButton.vue";
import ParametersMenu from "~/components/layouts/default/NavBar/ParametersMenu/ParametersMenu.vue";
import { useWerewolvesAssistantRoutes } from "~/composables/route/useWerewolvesAssistantRoutes";

const { isOnGamePage } = useWerewolvesAssistantRoutes();
</script>

<style scoped lang="scss">
#navbar {
  height: 4rem;
  padding: 0 1rem;

  #navbar-werewolves-assistant-logo {
    height: 2.5rem;
  }
}
</style>