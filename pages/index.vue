<template>
  <div class="flex flex-col">
    <div class="flex flex-col grow items-center justify-center">
      <div class="flex justify-center w-full">
        <NuxtImg
          :alt="$t('pages.index.werewolvesAssistantLogo')"
          sizes="lg:200px"
          src="/img/logo/square/werewolves-logo.png"
        />
      </div>

      <div class="text-center w-full">
        <h1
          id="title"
          class="mt-0"
        >
          {{ $t('shared.werewolvesAssistant') }}
        </h1>
      </div>

      <NuxtLink
        id="play-button"
        class="p-button p-button-primary p-button-raised w-3/12"
        to="/game-lobby"
      >
        <span class="fa fa-2x fa-play-circle me-2"/>

        <span class="fs-3 fw-bold text-uppercase">
          {{ $t('pages.index.play') }}
        </span>
      </NuxtLink>

      <NuxtLink
        id="about-button"
        class="mt-2 p-button p-button-secondary w-3/12"
        to="/about"
      >
        <span class="fa fa-question me-2"/>

        <span>
          {{ $t('pages.index.about') }}
        </span>
      </NuxtLink>
    </div>

    <hr class="w-full">

    <IndexFooter class="mt-1"/>
  </div>
</template>

<script lang="ts" setup>
import IndexFooter from "~/components/pages/index/IndexFooter.vue";

definePageMeta({ layout: false });
</script>

<style>
#title {
  font-size: 4rem;
}
</style>