<template>
  <div
    id="game-lobby-players-party-container"
    class="flex h-full items-center justify-center"
  >
    <h2
      v-if="!createGameDto.players.length"
      id="no-players-in-lobby-message"
      class="flex items-center justify-center"
    >
      <i class="fa fa-plus me-2"/>

      <span>
        {{ $t("components.GameLobbyPlayersParty.addPlayersWithInputAbove") }}
      </span>
    </h2>

    <div
      v-else
      id="game-lobby-players-party"
      class="flex grid grid-cols-5 h-full items-center justify-center w-full"
    >
      <GameLobbyPlayerCard
        v-for="player in createGameDto.players"
        :key="player.name"
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