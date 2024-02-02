<template>
  <div class="container-fluid d-flex flex-column">
    <GameLobbyHeader/>

    <GameLobbyPlayersParty class="d-flex flex-grow-1"/>

    <GameLobbyFooter/>
  </div>
</template>

<script setup lang="ts">
import GameLobbyFooter from "~/components/pages/game-lobby/GameLobbyFooter/GameLobbyFooter.vue";
import GameLobbyHeader from "~/components/pages/game-lobby/GameLobbyHeader/GameLobbyHeader.vue";
import GameLobbyPlayersParty from "~/components/pages/game-lobby/GameLobbyPlayersParty/GameLobbyPlayersParty.vue";
</script>