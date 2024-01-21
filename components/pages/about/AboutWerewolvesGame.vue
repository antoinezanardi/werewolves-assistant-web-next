<template>
  <div id="about-werewolves-game">
    <div class="align-items-center d-flex justify-content-between">
      <h2 class="align-items-center d-flex">
        <i class="fa fa-2x fa-dice me-3 text-primary"/>
        {{ $t('components.AboutWerewolvesGame.werewolvesAssistantGame') }}
      </h2>

      <a
        v-p-tooltip.top="$t('components.AboutWerewolvesGame.watchTutorialVideoOnYoutube')"
        :aria-label="$t('components.AboutWerewolvesGame.iDontKnowWerewolvesGame')"
        class="p-button p-button-primary"
        href="https://www.youtube.com/watch?v=3HUz8CAORro"
        rel="noopener noreferrer"
        target="_blank"
      >
        <span class="fa fa-question-circle me-2"/>
        {{ $t('components.AboutWerewolvesGame.iDontKnowThisGame') }}
      </a>
    </div>

    <hr>

    <p>{{ $t("components.AboutWerewolvesGame.whatIsWerewolvesGame") }}</p>

    <p>{{ $t("components.AboutWerewolvesGame.whyGameMasterIsImportant") }}</p>
  </div>
</template>