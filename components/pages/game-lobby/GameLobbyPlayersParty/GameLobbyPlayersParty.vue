<template>
  <div
    id="game-lobby-players-party-container"
    class="align-items-center h-100 justify-content-center row"
  >
    <h2
      v-if="!createGameDto.players.length"
      id="no-players-in-lobby-message"
      class="align-items-center d-flex justify-content-center"
    >
      <i class="fa fa-plus me-2"/>

      <span>
        {{ $t("components.GameLobbyPlayersParty.addPlayersWithInputAbove") }}
      </span>
    </h2>

    <div
      v-else
      id="game-lobby-players-party"
      class="align-items-center d-flex justify-content-center row"
    >
      <GameLobbyPlayerCard
        v-for="player in createGameDto.players"
        :key="player.name"
        class="col-lg-2"
        :player="player"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";

import GameLobbyPlayerCard from "~/components/pages/game-lobby/GameLobbyPlayersParty/GameLobbyPlayerCard/GameLobbyPlayerCard.vue";
import { useCreateGameDtoStore } from "~/stores/game/create-game-dto/useCreateGameDtoStore";

const createGameDtoStore = useCreateGameDtoStore();

const { createGameDto } = storeToRefs(createGameDtoStore);
</script>