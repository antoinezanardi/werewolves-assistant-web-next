<template>
  <div
    id="game-not-found"
    class="flex flex-col gap-2 items-center justify-center"
  >
    <h1
      id="game-not-found-text"
      class="flex flex-col items-center justify-center"
    >
      <FontAwesomeIcon
        class="fa-2x mb-3 text-warning"
        icon="fa-regular fa-question-circle"
      />

      <span class="text-center">
        {{ $t("components.GameNotFound.gameNotFound") }}
      </span>
    </h1>

    <PrimeVueDivider class="!w-2/3"/>

    <div class="flex flex-col gap-2 md:flex-row">
      <CreateAnotherGameButton class="md:w-auto w-full"/>

      <BackToHomeButton class="md:w-auto w-full"/>
    </div>
  </div>
</template>

<script setup lang="ts">
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import BackToHomeButton from "~/components/shared/buttons/BackToHomeButton/BackToHomeButton.vue";
import CreateAnotherGameButton from "~/components/shared/buttons/CreateAnotherGameButton/CreateAnotherGameButton.vue";

const { t } = useI18n();

useHead({ title: t("components.GameNotFound.gameNotFound") });
</script>