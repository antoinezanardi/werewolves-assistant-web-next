<template>
  <div
    id="game-over-actions"
  >
    <NuxtLink
      id="new-game-button"
      class="p-button p-button-raised"
      to="/game-lobby"
    >
      <span class="fa fa-play-circle me-2"/>

      <span>
        {{ $t('components.GameOverActions.createAnotherGame') }}
      </span>
    </NuxtLink>
  </div>
</template>