<template>
  <div
    id="game-canceled"
    class="flex flex-col items-center justify-center"
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

    <div>
      <PrimeVueDivider class="mb-4"/>

      <CreateAnotherGameButton/>

      <BackToHomeButton/>
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