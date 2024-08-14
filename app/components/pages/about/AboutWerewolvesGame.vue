<template>
  <div id="about-werewolves-game">
    <div class="flex flex-col gap-4 items-center justify-between md:flex-row">
      <h2
        id="about-werewolves-game-title"
        class="flex items-center"
      >
        <FontAwesomeIcon
          class="fa-2x me-3 text-blue-500"
          icon="dice"
        />

        <span>
          {{ $t('components.AboutWerewolvesGame.werewolvesAssistantGame') }}
        </span>
      </h2>

      <a
        id="about-werewolves-game-watch-tutorial-video-on-youtube"
        v-p-tooltip.top="$t('components.AboutWerewolvesGame.watchTutorialVideoOnYoutube')"
        class="p-button p-button-primary"
        href="https://www.youtube.com/watch?v=3HUz8CAORro"
        rel="noopener noreferrer"
        target="_blank"
      >
        <FontAwesomeIcon
          icon="fa-regular fa-question-circle"
        />

        <span>
          {{ $t('components.AboutWerewolvesGame.iDontKnowWerewolvesGame') }}
        </span>
      </a>
    </div>

    <PrimeVueDivider/>

    <p
      id="about-werewolves-game-first-section"
      class="text-"
    >
      {{ $t("components.AboutWerewolvesGame.whatIsWerewolvesGame") }}
    </p>

    <p id="about-werewolves-game-second-section">
      {{ $t("components.AboutWerewolvesGame.whyGameMasterIsImportant") }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
</script>