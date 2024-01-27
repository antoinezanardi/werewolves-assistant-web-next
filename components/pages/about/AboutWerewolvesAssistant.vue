<template>
  <div id="about-werewolves-assistant">
    <h2
      id="about-werewolves-assistant-title"
      class="align-items-center d-flex"
    >
      <i class="fa fa-2x fa-star me-3 text-warning"/>
      {{ $t('components.AboutWerewolvesAssistant.werewolvesAssistantInThePlace') }}
    </h2>

    <hr>

    <p id="about-werewolves-assistant-first-section">
      {{ $t("components.AboutWerewolvesAssistant.toHelpGameMaster") }}
    </p>

    <p id="about-werewolves-assistant-second-section">
      {{ $t("components.AboutWerewolvesAssistant.assistantHasManyFeatures") }}
    </p>

    <ul id="about-werewolves-assistant-third-section">
      <li> {{ $t("components.AboutWerewolvesAssistant.gameLayout") }} </li>

      <li> {{ $t("components.AboutWerewolvesAssistant.intuitiveUserInterface") }} </li>

      <li> {{ $t("components.AboutWerewolvesAssistant.inputForEachEvent") }} </li>

      <li> {{ $t("components.AboutWerewolvesAssistant.gamePlaysQueue") }} </li>

      <li> {{ $t("components.AboutWerewolvesAssistant.gameHistory") }} </li>
    </ul>

    <p id="about-werewolves-assistant-fourth-section">
      {{ $t("components.AboutWerewolvesAssistant.assistantGoodForYouAndFreeToPlay") }}
    </p>

    <h3
      id="about-werewolves-assistant-disclaimer-title"
      class="align-items-center d-flex justify-content-center text-uppercase"
    >
      <i class="fa fa-2x fa-warning me-3 text-warning"/>
      {{ $t('components.AboutWerewolvesAssistant.pleaseBeAware') }}
    </h3>

    <hr>

    <p id="about-werewolves-assistant-disclaimer-first-section">
      {{ $t('components.AboutWerewolvesAssistant.physicalGameIsNeeded') }}
    </p>

    <p id="about-werewolves-assistant-disclaimer-second-section">
      {{ $t('components.AboutWerewolvesAssistant.assistantIsABonus') }}
    </p>
  </div>
</template>