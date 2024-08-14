<template>
  <div id="about-werewolves-assistant">
    <h2
      id="about-werewolves-assistant-title"
      class="flex items-center"
    >
      <FontAwesomeIcon
        class="fa-2x me-3 text-yellow-500"
        icon="star"
      />

      <span>
        {{ $t('components.AboutWerewolvesAssistant.werewolvesAssistantInThePlace') }}
      </span>
    </h2>

    <PrimeVueDivider/>

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
      class="flex items-center justify-center text-uppercase"
    >
      <FontAwesomeIcon
        class="fa-2x me-3 text-yellow-500"
        icon="warning"
      />

      <span>
        {{ $t('components.AboutWerewolvesAssistant.pleaseBeAware') }}
      </span>
    </h3>

    <PrimeVueDivider/>

    <p id="about-werewolves-assistant-disclaimer-first-section">
      {{ $t('components.AboutWerewolvesAssistant.physicalGameIsNeeded') }}
    </p>

    <p id="about-werewolves-assistant-disclaimer-second-section">
      {{ $t('components.AboutWerewolvesAssistant.assistantIsABonus') }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
</script>