<template>
  <div class="flex flex-col">
    <div class="flex flex-col grow items-center justify-center">
      <div class="flex justify-center w-full">
        <NuxtImg
          :alt="$t('pages.index.werewolvesAssistantLogo')"
          placeholder="/svg/misc/infinite-spinner.svg"
          placeholder-class="w-24 h-24"
          sizes="sm:125 md:200 lg:200"
          src="/img/logo/square/werewolves-logo.png"
        />
      </div>

      <div class="mb-16 mt-6 text-center w-full">
        <h1
          id="title"
          class="!text-5xl !tracking-wider mt-0"
        >
          {{ $t('shared.werewolvesAssistant') }}
        </h1>

        <h5
          id="subtitle"
          class="!font-normal !text-lg !w-full flex items-center justify-center md:gap-3 mt-6"
        >
          <i class="fa fa-sun md:w-auto text-2xl text-day w-2/12"/>

          <span>
            {{ $t('pages.index.perfectToolForGameMasters') }}
          </span>

          <i class="fa fa-moon md:w-auto text-2xl text-night w-2/12"/>
        </h5>
      </div>

      <NuxtLink
        id="play-button"
        ref="playButton"
        class="flex justify-center lg:w-3/12 md:w-6/12 p-button p-button-raised w-full"
        to="/game-lobby"
      >
        <i
          id="play-button-icon"
          class="absolute animate__animated fa fa-2x fa-play-circle left-5 me-2"
          :class="{ 'animate__heartBeat': isPlayButtonHovered }"
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
        <i
          id="about-button-icon"
          class="absolute animate__animated fa-2x fa-question-circle fa-regular left-5 me-2"
          :class="{ 'animate__rubberBand': isAboutButtonHovered }"
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
import IndexFooter from "~/components/pages/index/IndexFooter.vue";

definePageMeta({ layout: false });

const playButton = ref<HTMLAnchorElement | null>(null);
const aboutButton = ref<HTMLAnchorElement | null>(null);

const isPlayButtonHovered = useElementHover(playButton);
const isAboutButtonHovered = useElementHover(aboutButton);
</script>