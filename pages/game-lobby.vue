<template>
  <div class="container-fluid d-flex flex-column">
    <GameLobbyHeader/>

    <hr class="w-100">

    <GameLobbyPlayersParty class="d-flex flex-grow-1 overflow-y-auto"/>

    <hr class="w-100">

    <GameLobbyFooter/>
  </div>
</template>

<script setup lang="ts">
import GameLobbyFooter from "~/components/pages/game-lobby/GameLobbyFooter/GameLobbyFooter.vue";
import GameLobbyHeader from "~/components/pages/game-lobby/GameLobbyHeader/GameLobbyHeader.vue";
import GameLobbyPlayersParty from "~/components/pages/game-lobby/GameLobbyPlayersParty/GameLobbyPlayersParty.vue";
import { useCreateGameDtoStore } from "~/stores/game/create-game-dto/useCreateGameDtoStore";

const createGameDtoStore = useCreateGameDtoStore();
const { resetCreateGameDto } = createGameDtoStore;

resetCreateGameDto();
</script>