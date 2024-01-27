<template>
  <div class="container h-100">
    <div class="align-items-center d-flex justify-content-center">
      <RoleImage
        id="about-role-image-title"
        definition="small"
        :role-name="RoleNames.WEREWOLF"
        sizes="75px"
      />

      <h1
        id="about-title"
        class="ms-4"
      >
        {{ $t("pages.about.whyAnAssistant") }}
      </h1>
    </div>

    <hr class="my-3">

    <AboutWerewolvesGame/>

    <AboutWerewolvesAssistant class="mt-5"/>

    <AboutAvailableRoles class="mt-5"/>

    <AboutHowToContribute class="mt-5"/>

    <AboutCreator class="mt-5"/>

    <hr class="my-3">

    <div class="d-flex justify-content-center pb-3">
      <NuxtLink
        id="about-back-to-home-button"
        class="p-button p-button-secondary"
        to="/"
      >
        <i class="fa fa-sign-out me-2"/>
        {{ $t("pages.about.backToHome") }}
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import AboutAvailableRoles from "~/components/pages/about/AboutAvailableRoles/AboutAvailableRoles.vue";
import AboutCreator from "~/components/pages/about/AboutCreator.vue";
import AboutHowToContribute from "~/components/pages/about/AboutHowToContribute.vue";
import AboutWerewolvesAssistant from "~/components/pages/about/AboutWerewolvesAssistant.vue";
import AboutWerewolvesGame from "~/components/pages/about/AboutWerewolvesGame.vue";
import RoleImage from "~/components/shared/role/RoleImage/RoleImage.vue";
import { RoleNames } from "~/composables/api/role/enums/role.enums";
</script>