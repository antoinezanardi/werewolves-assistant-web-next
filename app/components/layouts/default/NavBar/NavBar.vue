<template>
  <nav
    id="navbar"
    :aria-label="$t('components.NavBar.navBar')"
    class="bg-gray-900 border-b border-b-slate-800 flex h-16 items-center justify-between px-4 py-1"
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
        class="h-10 w-10"
        placeholder="/svg/misc/ripples.svg"
        placeholder-class="w-10 h-10"
        src="/img/logo/square/werewolves-logo-tiny.webp"
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