<template>
  <div class="container-fluid d-flex flex-column">
    <div class="align-items-center container-fluid d-flex flex-column flex-grow-1 justify-content-center">
      <div class="col-12 text-center">
        <NuxtImg
          :alt="$t('pages.index.werewolvesAssistantLogo')"
          sizes="lg:200px"
          src="/img/logo/square/werewolves-logo.png"
        />
      </div>

      <div class="col-12 text-center">
        <h1
          id="title"
          :aria-label="$t('shared.werewolvesAssistant')"
          class="mt-0"
        >
          {{ $t('shared.werewolvesAssistant') }}
        </h1>
      </div>

      <div class="col-12 col-lg-3">
        <NuxtLink
          :aria-label="$t('pages.index.play')"
          class="p-button p-button-primary p-button-raised w-100"
          to="/game-lobby"
        >
          <span class="fa fa-2x fa-play-circle me-2"/>

          <span class="fs-3 fw-bold text-uppercase">
            {{ $t('pages.index.play') }}
          </span>
        </NuxtLink>
      </div>

      <div class="col-12 col-lg-3 mt-4">
        <NuxtLink
          :aria-label="$t('pages.index.about')"
          class="p-button p-button-secondary w-100"
          to="/about"
        >
          <span class="fa fa-question me-2"/>

          <span>
            {{ $t('pages.index.about') }}
          </span>
        </NuxtLink>
      </div>
    </div>

    <hr class="w-100">

    <IndexFooter/>
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