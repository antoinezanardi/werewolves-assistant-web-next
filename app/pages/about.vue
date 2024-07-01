<template>
  <div class="container h-full">
    <div class="flex items-center justify-center">
      <RoleImage
        id="about-role-image-title"
        :alt="$t('pages.about.imageTitle')"
        definition="small"
        role-name="werewolf"
        sizes="75"
      />

      <h1
        id="about-title"
        class="ms-4"
      >
        {{ $t("pages.about.whyAnAssistant") }}
      </h1>
    </div>

    <PrimeVueDivider/>

    <AboutWerewolvesGame/>

    <AboutWerewolvesAssistant class="mt-5"/>

    <AboutAvailableRoles class="mt-5"/>

    <AboutHowToContribute class="mt-5"/>

    <AboutCreator class="mt-5"/>

    <PrimeVueDivider/>

    <div class="flex justify-center pb-3">
      <BackToHomeButton/>
    </div>

    <PrimeVueScrollTop/>
  </div>
</template>

<script setup lang="ts">
import AboutAvailableRoles from "~/components/pages/about/AboutAvailableRoles/AboutAvailableRoles.vue";
import AboutCreator from "~/components/pages/about/AboutCreator.vue";
import AboutHowToContribute from "~/components/pages/about/AboutHowToContribute.vue";
import AboutWerewolvesAssistant from "~/components/pages/about/AboutWerewolvesAssistant.vue";
import AboutWerewolvesGame from "~/components/pages/about/AboutWerewolvesGame.vue";
import BackToHomeButton from "~/components/shared/buttons/BackToHomeButton/BackToHomeButton.vue";
import RoleImage from "~/components/shared/role/RoleImage/RoleImage.vue";

const { t } = useI18n();

useHead({
  title: t("pages.about.whyAnAssistant"),
  meta: [{ name: "description", content: t("pages.about.seoDescription") }],
});
</script>