<template>
  <div
    id="game-not-found"
    class="align-items-center d-flex flex-column justify-content-center"
  >
    <h1
      id="game-not-found-text"
      class="align-items-center d-flex flex-column justify-content-center"
    >
      <i class="fa fa-2x fa-question-circle mb-3 text-warning"/>

      <span>
        {{ $t("components.GameNotFound.gameNotFound") }}
      </span>
    </h1>

    <div>
      <VuePrimeDivider class="mb-4"/>

      <NuxtLink
        id="create-another-game-button"
        class="me-2 p-button p-button-primary"
        to="/game-lobby"
      >
        <i class="fa-gamepad fas me-2"/>

        <span>
          {{ $t("components.GameNotFound.createAnotherGame") }}
        </span>
      </NuxtLink>

      <NuxtLink
        id="go-to-home-button"
        class="p-button p-button-secondary"
        to="/"
      >
        <i class="fa-sign-out fas me-2"/>

        <span>
          {{ $t("components.GameNotFound.goToHome") }}
        </span>
      </NuxtLink>
    </div>
  </div>
</template>