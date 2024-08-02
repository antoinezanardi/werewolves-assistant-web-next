<template>
  <div
    id="game-lobby-players-party-container"
    class="flex h-full items-center justify-center"
  >
    <Transition
      mode="out-in"
      name="fade"
    >
      <h2
        v-if="!createGameDto.players.length"
        id="no-players-in-lobby-message"
        class="flex gap-4 items-center justify-center"
      >
        <i class="fa fa-plus"/>

        <span>
          {{ $t("components.GameLobbyPlayersParty.addPlayersWithInputAbove") }}
        </span>
      </h2>

      <div
        v-else
        id="game-lobby-players-party"
        class="flex flex-wrap h-full items-center justify-center w-full"
      >
        <TransitionGroup name="fade-list">
          <GameLobbyPlayerCard
            v-for="player in createGameDto.players"
            :key="player.name"
            class="fade-list-item game-lobby-player-card md:w-1/6 w-1/3"
            :player="player"
            @pick-role-for-player="onPickRoleForPlayerFromGameLobbyPlayerCard"
          />
        </TransitionGroup>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";

import type { GameLobbyPlayersPartyEmits } from "~/components/pages/game-lobby/GameLobbyPlayersParty/game-lobby-players-party.types";
import GameLobbyPlayerCard from "~/components/pages/game-lobby/GameLobbyPlayersParty/GameLobbyPlayerCard/GameLobbyPlayerCard.vue";
import type { CreateGamePlayerDto } from "~/composables/api/game/dto/create-game/create-game-player/create-game-player.dto";
import { useCreateGameDtoStore } from "~/stores/game/create-game-dto/useCreateGameDtoStore";

const emit = defineEmits<GameLobbyPlayersPartyEmits>();

const createGameDtoStore = useCreateGameDtoStore();

const { createGameDto } = storeToRefs(createGameDtoStore);

function onPickRoleForPlayerFromGameLobbyPlayerCard(player?: CreateGamePlayerDto): void {
  if (!player) {
    return;
  }
  emit("pickRoleForPlayer", player);
}
</script>