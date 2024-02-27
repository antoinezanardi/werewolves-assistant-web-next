<template>
  <div
    id="game-playing"
    class="flex"
  >
    <GameTeamSide
      class="w-2/12"
      :side="RoleSides.VILLAGERS"
    />

    <GamePlayground class="w-10/12"/>

    <GameTeamSide
      class="w-2/12"
      :side="RoleSides.WEREWOLVES"
    />
  </div>
</template>

<script setup lang="ts">
import GamePlayground from "~/components/pages/game/GamePlaying/GamePlayground/GamePlayground.vue";
import GameTeamSide from "~/components/pages/game/GamePlaying/GameTeamSide/GameTeamSide.vue";
import { RoleSides } from "~/composables/api/role/enums/role.enums";
</script>