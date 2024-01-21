<template>
  <div class="container">
    <div class="align-items-center d-flex justify-content-center">
      <RoleImage
        definition="small"
        :role-name="RoleNames.WEREWOLF"
        sizes="75px"
      />

      <h1 class="ms-4">
        {{ $t("pages.about.whyAnAssistant") }}
      </h1>
    </div>

    <hr class="my-3">

    <AboutWerewolvesGame/>

    <AboutWerewolvesAssistant class="mt-5"/>
  </div>
</template>

<script setup lang="ts">
import AboutWerewolvesAssistant from "~/components/pages/about/AboutWerewolvesAssistant.vue";
import AboutWerewolvesGame from "~/components/pages/about/AboutWerewolvesGame.vue";
import RoleImage from "~/components/shared/role/RoleImage/RoleImage.vue";
import { RoleNames } from "~/composables/api/role/enums/role.enums";
</script>