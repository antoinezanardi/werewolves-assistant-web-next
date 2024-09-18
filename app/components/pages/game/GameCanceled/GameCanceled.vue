<template>
  <div
    id="game-canceled"
    class="flex flex-col gap-2 items-center justify-center"
  >
    <h1
      id="game-canceled-text"
      class="flex flex-col items-center justify-center"
    >
      <FontAwesomeIcon
        class="fa-2x mb-3 text-error"
        icon="ban"
      />

      <span>
        {{ $t("components.GameCanceled.gameCanceled") }}
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

useHead({ title: t("components.GameCanceled.gameCanceled") });
</script>