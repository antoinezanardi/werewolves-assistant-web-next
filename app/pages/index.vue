<template>
  <div
    id="index-page"
    class="flex flex-col"
  >
    <div class="flex flex-col grow items-center justify-center">
      <div class="flex justify-center w-full">
        <NuxtImg
          v-tilt="{
            'full-page-listening': true,
            'scale': 1
          }"
          :alt="$t('pages.index.werewolvesAssistantLogo')"
          class="!drop-shadow-2xl"
          placeholder="/svg/misc/ripples.svg"
          placeholder-class="md:w-[200px] md:h-[200px] w-[125px] h-[125px]"
          preload
          sizes="sm:125 md:200 lg:200"
          src="/img/logo/square/werewolves-logo.webp"
        />
      </div>

      <div class="mb-16 mt-6 text-center w-full">
        <h1
          id="title"
          class="!text-5xl !tracking-wider drop-shadow-2xl mt-0"
        >
          {{ $t('shared.werewolvesAssistant') }}
        </h1>

        <h2
          id="subtitle"
          class="!drop-shadow-2xl !font-medium !text-xl !w-full flex items-center justify-center md:gap-3 mt-6"
        >
          <FontAwesomeIcon
            class="md:w-auto text-2xl text-day w-2/12"
            icon="sun"
          />

          <span>
            {{ $t('pages.index.perfectToolForGameMasters') }}
          </span>

          <FontAwesomeIcon
            class="md:w-auto text-2xl text-night w-2/12"
            icon="moon"
          />
        </h2>
      </div>

      <NuxtLink
        id="play-button"
        ref="playButton"
        class="flex justify-center lg:w-3/12 md:w-6/12 p-button p-button-raised w-full"
        to="/game-lobby"
      >
        <FontAwesomeIcon
          id="play-button-icon"
          class="absolute animate__animated fa-2x left-5 me-2"
          :class="{ 'animate__heartBeat': isPlayButtonHovered }"
          icon="circle-play"
        />

        <span class="bold font-black fs-3 text-4xl tracking-widest uppercase">
          {{ $t('pages.index.play') }}
        </span>
      </NuxtLink>

      <NuxtLink
        id="about-button"
        ref="aboutButton"
        class="flex justify-center lg:w-3/12 md:w-6/12 mt-4 p-button p-button-secondary w-full"
        to="/about"
      >
        <FontAwesomeIcon
          id="about-button-icon"
          class="absolute animate__animated fa-2x left-5 me-2"
          :class="{ 'animate__rubberBand': isAboutButtonHovered }"
          icon="fa-regular fa-circle-question"
        />

        <span class="text-xl">
          {{ $t('pages.index.about') }}
        </span>
      </NuxtLink>
    </div>

    <PrimeVueDivider/>

    <IndexFooter class="mt-1"/>
  </div>
</template>

<script lang="ts" setup>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

import IndexFooter from "~/components/pages/index/IndexFooter.vue";

definePageMeta({ layout: false });

const playButton = ref<HTMLAnchorElement | null>(null);
const aboutButton = ref<HTMLAnchorElement | null>(null);

const isPlayButtonHovered = useElementHover(playButton);
const isAboutButtonHovered = useElementHover(aboutButton);
</script>

<style lang="scss" scoped>
#index-page {
background: radial-gradient(at 50% 40%, rgba(9, 21, 47, 0.8), transparent 60%),
    radial-gradient(at 70% 20%, rgba(9, 21, 47, 0.6), transparent 70%),
    radial-gradient(at 30% 80%, rgba(1, 10, 20, 0.8), transparent 80%),
    #010a14;
}
</style>