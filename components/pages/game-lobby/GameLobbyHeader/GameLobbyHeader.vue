<template>
  <div id="game-lobby-header">
    <GameLobbyPlayerInput
      id="game-lobby-player-input"
      v-model="playerInputValue"
    />
  </div>
</template>

<script setup lang="ts">
import GameLobbyPlayerInput from "~/components/pages/game-lobby/GameLobbyHeader/GameLobbyPlayerInput/GameLobbyPlayerInput.vue";

const playerInputValue = ref<string>("");
</script>