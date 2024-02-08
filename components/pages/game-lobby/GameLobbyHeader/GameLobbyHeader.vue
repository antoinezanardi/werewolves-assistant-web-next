<template>
  <div id="game-lobby-header">
    <h1
      id="game-lobby-header-title"
      class="d-flex justify-content-center my-1"
    >
      {{ $t("components.GameLobbyHeader.gameLobby") }}
    </h1>

    <div class="d-flex justify-content-center row">
      <div class="col-lg-6">
        <form
          id="game-lobby-header-form"
          @submit.prevent="addPlayerToCreateGameDto"
        >
          <GameLobbyPlayerInput
            id="game-lobby-player-input"
            ref="gameLobbyPlayerInput"
            v-model="playerInputValue"
          />
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { GameLobbyPlayerInputExposed } from "~/components/pages/game-lobby/GameLobbyHeader/GameLobbyPlayerInput/game-lobby-player-input.types";
import GameLobbyPlayerInput from "~/components/pages/game-lobby/GameLobbyHeader/GameLobbyPlayerInput/GameLobbyPlayerInput.vue";
import { CreateGamePlayerDto } from "~/composables/api/game/dto/create-game/create-game-player/create-game-player.dto";
import { useCreateGameDtoStore } from "~/stores/game/create-game-dto/useCreateGameDtoStore";

const createGameDtoStore = useCreateGameDtoStore();

const playerInputValue = ref<string>("");

const gameLobbyPlayerInput = ref<GameLobbyPlayerInputExposed | null>(null);

function addPlayerToCreateGameDto(): void {
  if (gameLobbyPlayerInput.value === null) {
    throw createError("Game Lobby Player Input is not initialized");
  }
  if (gameLobbyPlayerInput.value.isAddButtonDisabled) {
    return;
  }
  const trimmedPlayerInputValue = playerInputValue.value.trim();
  playerInputValue.value = "";
  if (!trimmedPlayerInputValue) {
    return;
  }
  const playerToAdd: CreateGamePlayerDto = CreateGamePlayerDto.create({
    name: trimmedPlayerInputValue,
    role: {},
  });
  createGameDtoStore.addPlayerToCreateGameDto(playerToAdd);
}
</script>