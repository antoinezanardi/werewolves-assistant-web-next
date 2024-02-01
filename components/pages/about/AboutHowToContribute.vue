<template>
  <div id="about-how-to-contribute">
    <h2
      id="about-how-to-contribute-title"
      class="align-items-center d-flex"
    >
      <i class="fa fa-2x fa-handshake-angle me-3 text-success"/>

      <span>
        {{ $t('components.AboutHowToContribute.howToContribute') }}
      </span>
    </h2>

    <hr>

    <p id="about-how-to-contribute-first-section">
      {{ $t("components.AboutHowToContribute.thereAreManyWaysToContribute") }}
    </p>

    <ul id="about-how-to-contribute-second-section">
      <li>
        {{ $t("components.AboutHowToContribute.openSourceProject") }}
        <div class="align-items-center d-flex justify-content-center my-3">
          <GitHubRepositoryButton
            id="about-how-to-contribute-github-button"
            :text-button="$t('components.AboutHowToContribute.accessGitHubRepository')"
          />
        </div>
      </li>

      <li>
        {{ $t("components.AboutHowToContribute.thisProjectIsFree") }}

        <div class="align-items-center d-flex justify-content-center my-3">
          <BuyMeACoffeeButton/>
        </div>
      </li>

      <li>
        {{ $t("components.AboutHowToContribute.talkAboutThisProject") }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import BuyMeACoffeeButton from "~/components/shared/external/BuyMeACoffeeButton/BuyMeACoffeeButton.vue";
import GitHubRepositoryButton from "~/components/shared/external/GitHubRepositoryButton/GitHubRepositoryButton.vue";
</script>