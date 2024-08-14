<template>
  <div id="about-creator">
    <h2
      id="about-creator-title"
      class="flex items-center"
    >
      <FontAwesomeIcon
        class="fa-2x me-3 text-purple-500"
        icon="pen-fancy"
      />

      <span>
        {{ $t('components.AboutCreator.wordFromCreator') }}
      </span>
    </h2>

    <PrimeVueDivider/>

    <p id="about-creator-first-section">
      {{ $t("components.AboutCreator.creatorBackground") }}
    </p>

    <div class="flex justify-center">
      <a
        id="about-creator-portfolio-button"
        class="mb-6 p-button primary"
        href="https://antoinezanardi.fr"
        rel="noopener noreferrer"
        target="_blank"
      >
        <FontAwesomeIcon
          icon="palette"
        />

        <span>
          {{ $t('components.AboutCreator.myPortfolio') }}
        </span>
      </a>
    </div>

    <p id="about-creator-second-section">
      {{ $t("components.AboutCreator.whyWerewolvesGameIsGreat") }}
    </p>

    <p id="about-creator-third-section">
      {{ $t("components.AboutCreator.whyWerewolvesAssistant") }}
    </p>

    <p id="about-creator-forth-section">
      {{ $t("components.AboutCreator.pleaseShareFeedback") }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
</script>