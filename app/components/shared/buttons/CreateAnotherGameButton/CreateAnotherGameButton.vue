<template>
  <NuxtLink
    id="create-another-game-button"
    class="me-2 p-button p-button-primary"
    to="/game-lobby"
  >
    <i class="fa-gamepad fas me-2"/>

    <span>
      {{ $t("components.CreateAnotherGameButton.createAnotherGame") }}
    </span>
  </NuxtLink>
</template>