<template>
  <div id="about-werewolves-assistant">
    <h2 class="align-items-center d-flex">
      <i class="fa fa-2x fa-star me-3 text-warning"/>
      {{ $t('components.AboutWerewolvesAssistant.werewolvesAssistantInThePlace') }}
    </h2>

    <hr>

    <p>{{ $t("components.AboutWerewolvesAssistant.toHelpGameMaster") }}</p>

    <p> {{ $t("components.AboutWerewolvesAssistant.assistantHasManyFeatures") }} </p>

    <ul>
      <li> {{ $t("components.AboutWerewolvesAssistant.gameLayout") }} </li>

      <li> {{ $t("components.AboutWerewolvesAssistant.intuitiveUserInterface") }} </li>

      <li> {{ $t("components.AboutWerewolvesAssistant.inputForEachEvent") }} </li>

      <li> {{ $t("components.AboutWerewolvesAssistant.gamePlaysQueue") }} </li>

      <li> {{ $t("components.AboutWerewolvesAssistant.gameHistory") }} </li>
    </ul>

    <p> {{ $t("components.AboutWerewolvesAssistant.assistantGoodForYouAndFreeToPlay") }} </p>

    <h3 class="align-items-center d-flex justify-content-center text-uppercase">
      <i class="fa fa-2x fa-warning me-3 text-warning"/>
      {{ $t('components.AboutWerewolvesAssistant.pleaseBeAware') }}
    </h3>

    <hr>

    <p> {{ $t('components.AboutWerewolvesAssistant.physicalGameIsNeeded') }} </p>

    <p> {{ $t('components.AboutWerewolvesAssistant.assistantIsABonus') }} </p>
  </div>
</template>