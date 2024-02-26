<template>
  <div id="about-creator">
    <h2
      id="about-creator-title"
      class="flex items-center"
    >
      <i class="fa fa-2x fa-pen-fancy me-3 text-purple-500"/>

      <span>
        {{ $t('components.AboutCreator.wordFromCreator') }}
      </span>
    </h2>

    <hr class="my-3">

    <p id="about-creator-first-section">
      {{ $t("components.AboutCreator.creatorBackground") }}
    </p>

    <div class="flex justify-center">
      <a
        id="about-creator-portfolio-button"
        class="p-button primary"
        href="https://antoinezanardi.fr"
        rel="noopener noreferrer"
        target="_blank"
      >
        <span class="fa-palette fas me-2"/>
        {{ $t('components.AboutCreator.myPortfolio') }}
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