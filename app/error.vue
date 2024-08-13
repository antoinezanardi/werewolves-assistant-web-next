<template>
  <div
    id="error-page"
    class="flex flex-col gap-2 h-full items-center justify-center p-4 w-full"
  >
    <h1
      id="error-title"
      class="!text-5xl"
    >
      {{ errorTitle }}
    </h1>

    <VueLottie
      id="lottie-error"
      :animation-data="LottieError"
      :height="lottieSize"
      loop
      :width="lottieSize"
    />

    <h3
      id="error-description"
      class="!text-2xl"
    >
      {{ errorDescription }}
    </h3>

    <BackToHomeButton
      class="mt-4"
      icon="person-running"
      p-button-class="p-button-primary"
      text-key="components.Error.goBackToSafePlace"
    />
  </div>
</template>

<script setup lang="ts">
import LottieError from "~/assets/lottie/error.json";
import BackToHomeButton from "~/components/shared/buttons/BackToHomeButton/BackToHomeButton.vue";
import type { ErrorProps } from "~/types/error.types";

const props = defineProps<ErrorProps>();

const notFoundStatusCode = 404;

const lottieSize = "250px";

const { t } = useI18n();

const errorTitle = computed<string>(() => {
  if (props.error.statusCode === notFoundStatusCode) {
    return t("components.Error.pageNotFound");
  }
  return t("components.Error.unexpectedError");
});

useHead({ title: errorTitle });

const errorDescription = computed<string>(() => {
  if (props.error.statusCode === notFoundStatusCode) {
    return t("components.Error.youAreLost");
  }
  return t("components.Error.notNormalTeamNotified");
});
</script>