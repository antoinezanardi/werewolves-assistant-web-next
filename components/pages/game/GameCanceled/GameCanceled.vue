<template>
  <div
    id="game-canceled"
    class="align-items-center d-flex flex-column justify-content-center"
  >
    <h1
      id="game-canceled-text"
      class="align-items-center d-flex flex-column justify-content-center"
    >
      <i class="fa fa-2x fa-ban mb-3 text-danger"/>

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