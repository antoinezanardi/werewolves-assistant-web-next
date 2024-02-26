<template>
  <div
    id="game-lobby-footer"
    class="flex flex-auto"
  >
    <div class="flex-1">
      <GameLobbyRandomCompositionButton/>
    </div>

    <div class="flex flex-1 justify-center">
      <GameLobbyStartGameButton/>
    </div>

    <div class="flex-1"/>
  </div>
</template>

<script setup lang="ts">
import GameLobbyRandomCompositionButton from "~/components/pages/game-lobby/GameLobbyFooter/GameLobbyRandomCompositionButton/GameLobbyRandomCompositionButton.vue";
import GameLobbyStartGameButton from "~/components/pages/game-lobby/GameLobbyFooter/GameLobbyStartGameButton/GameLobbyStartGameButton.vue";
</script>