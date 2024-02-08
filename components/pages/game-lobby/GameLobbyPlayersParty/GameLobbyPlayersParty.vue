<template>
  <div
    id="game-lobby-players-party"
    class="align-items-center h-100 justify-content-center row"
  >
    <GameLobbyPlayerCard
      v-for="player in createGameDto.players"
      :key="player.name"
      class="col-lg-2"
      :player="player"
    />
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";

import GameLobbyPlayerCard from "~/components/pages/game-lobby/GameLobbyPlayersParty/GameLobbyPlayerCard/GameLobbyPlayerCard.vue";
import { useCreateGameDtoStore } from "~/stores/game/create-game-dto/useCreateGameDtoStore";

const createGameDtoStore = useCreateGameDtoStore();

const { createGameDto } = storeToRefs(createGameDtoStore);
</script>