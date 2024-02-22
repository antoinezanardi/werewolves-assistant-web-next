<template>
  <NuxtLink
    id="back-to-home-button"
    class="p-button p-button-secondary"
    to="/"
  >
    <i class="fa-sign-out fas me-2"/>

    <span>
      {{ $t("components.BackToHomeButton.backToHome") }}
    </span>
  </NuxtLink>
</template>