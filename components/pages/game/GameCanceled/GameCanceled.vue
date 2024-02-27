<template>
  <div
    id="game-canceled"
    class="flex flex-col items-center justify-center"
  >
    <h1
      id="game-canceled-text"
      class="flex flex-col items-center justify-center"
    >
      <i class="fa fa-2x fa-ban mb-3 text-error"/>

      <span>
        {{ $t("components.GameCanceled.gameCanceled") }}
      </span>
    </h1>

    <div>
      <VuePrimeDivider class="mb-4"/>

      <CreateAnotherGameButton/>

      <BackToHomeButton/>
    </div>
  </div>
</template>

<script setup lang="ts">
import BackToHomeButton from "~/components/shared/buttons/BackToHomeButton/BackToHomeButton.vue";
import CreateAnotherGameButton from "~/components/shared/buttons/CreateAnotherGameButton/CreateAnotherGameButton.vue";
</script>