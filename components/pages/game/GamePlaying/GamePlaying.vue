<template>
  <div
    id="game-playing"
    class="row"
  >
    <GameTeamSide
      class="col-2"
      :side="RoleSides.VILLAGERS"
    />

    <GamePlayground class="col-8"/>

    <GameTeamSide
      class="col-2"
      :side="RoleSides.WEREWOLVES"
    />
  </div>
</template>

<script setup lang="ts">
import GamePlayground from "~/components/pages/game/GamePlaying/GamePlayground/GamePlayground.vue";
import GameTeamSide from "~/components/pages/game/GamePlaying/GameTeamSide/GameTeamSide.vue";
import { RoleSides } from "~/composables/api/role/enums/role.enums";
</script>