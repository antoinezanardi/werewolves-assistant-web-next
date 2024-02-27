<template>
  <div id="about-werewolves-game">
    <div class="flex items-center justify-between">
      <h2
        id="about-werewolves-game-title"
        class="flex items-center"
      >
        <i class="fa fa-2x fa-dice me-3 text-blue-500"/>

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
        <span class="fa fa-question-circle me-2"/>
        {{ $t('components.AboutWerewolvesGame.iDontKnowWerewolvesGame') }}
      </a>
    </div>

    <VuePrimeDivider/>

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