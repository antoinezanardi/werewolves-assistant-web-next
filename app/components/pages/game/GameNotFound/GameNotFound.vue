<template>
  <div
    id="game-not-found"
    class="flex flex-col items-center justify-center"
  >
    <h1
      id="game-not-found-text"
      class="flex flex-col items-center justify-center"
    >
      <i class="fa fa-2x fa-question-circle mb-3 text-warning"/>

      <span>
        {{ $t("components.GameNotFound.gameNotFound") }}
      </span>
    </h1>

    <div>
      <PrimeVueDivider class="mb-4"/>

      <CreateAnotherGameButton class="me-2"/>

      <BackToHomeButton/>
    </div>
  </div>
</template>

<script setup lang="ts">
import BackToHomeButton from "~/components/shared/buttons/BackToHomeButton/BackToHomeButton.vue";
import CreateAnotherGameButton from "~/components/shared/buttons/CreateAnotherGameButton/CreateAnotherGameButton.vue";

const { t } = useI18n();

useHead({ title: t("components.GameNotFound.gameNotFound") });
</script>