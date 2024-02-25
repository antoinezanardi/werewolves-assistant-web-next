<template>
  <div
    id="game-playing"
    class="d-flex"
  >
    <GameTeamSide :side="RoleSides.VILLAGERS"/>

    <GamePlayground class="d-flex flex-grow-1"/>

    <GameTeamSide :side="RoleSides.WEREWOLVES"/>
  </div>
</template>

<script setup lang="ts">
import GamePlayground from "~/components/pages/game/GamePlaying/GamePlayground/GamePlayground.vue";
import GameTeamSide from "~/components/pages/game/GamePlaying/GameTeamSide/GameTeamSide.vue";
import { RoleSides } from "~/composables/api/role/enums/role.enums";
</script>