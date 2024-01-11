<template>
  <div class="align-items-center container-fluid d-flex flex-column justify-content-center">
    <div class="col-12 text-center">
      <NuxtImg
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
      <VuePrimeButton
        class="w-100"
        icon="fa fa-play-circle"
        :label="$t('pages.index.play')"
        :pt="buttonsPassThroughProperties"
        raised
        size="large"
      />
    </div>

    <div class="col-12 col-lg-3 mt-4">
      <VuePrimeButton
        class="w-100"
        icon="fas fa-question"
        icon-pos="right"
        :label="$t('pages.index.about')"
        :pt="buttonsPassThroughProperties"
        raised
        severity="secondary"
        size="large"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { ButtonPassThroughOptions } from "primevue/button";
import type { PassThrough } from "primevue/ts-helpers";

const buttonsPassThroughProperties: PassThrough<ButtonPassThroughOptions> = {
  label: "fs-3 fw-bold text-uppercase",
  icon: "fa-2x",
};
</script>

<style>
#title {
  font-size: 4rem;
}
</style>