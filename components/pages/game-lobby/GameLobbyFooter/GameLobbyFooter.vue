<template>
  <div
    id="game-lobby-footer"
    class="row"
  >
    <div class="col-3 d-flex">
      <GameLobbyRandomCompositionButton/>
    </div>

    <div class="col-6 d-flex justify-content-center">
      <GameLobbyStartGameButton/>
    </div>

    <div class="col-3"/>
  </div>
</template>

<script setup lang="ts">
import GameLobbyRandomCompositionButton from "~/components/pages/game-lobby/GameLobbyFooter/GameLobbyRandomCompositionButton/GameLobbyRandomCompositionButton.vue";
import GameLobbyStartGameButton from "~/components/pages/game-lobby/GameLobbyFooter/GameLobbyStartGameButton/GameLobbyStartGameButton.vue";
</script>