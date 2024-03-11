<template>
  <div
    id="game-playing"
    class="flex"
  >
    <GameTeamSide
      class="flex-none w-2/12"
      side="villagers"
    />

    <GamePlayground class="game-playground px-2 w-8/12"/>

    <GameTeamSide
      class="flex-none w-2/12"
      side="werewolves"
    />
  </div>
</template>

<script setup lang="ts">
import GamePlayground from "~/components/pages/game/GamePlaying/GamePlayground/GamePlayground.vue";
import GameTeamSide from "~/components/pages/game/GamePlaying/GameTeamSide/GameTeamSide.vue";
</script>

<style lang="scss" scoped>
.game-playground {
  max-width: 66.66666% !important;
}
</style>