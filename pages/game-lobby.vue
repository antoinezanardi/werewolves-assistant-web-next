<template>
  <div class="flex flex-col">
    <GameLobbyHeader
      id="game-lobby-header"
      @game-options-button-click="openGameOptionsHub"
    />

    <VuePrimeDivider/>

    <GameLobbyPlayersParty
      id="game-lobby-players-party"
      class="flex-auto overflow-y-auto"
      @pick-role-for-player="pickRoleForPlayer"
    />

    <VuePrimeDivider/>

    <GameLobbyFooter/>

    <GameLobbyRolePicker ref="gameLobbyRolePicker"/>

    <GameLobbyOptionsHub ref="gameLobbyOptionsHub"/>
  </div>
</template>

<script setup lang="ts">
import GameLobbyFooter from "~/components/pages/game-lobby/GameLobbyFooter/GameLobbyFooter.vue";
import GameLobbyHeader from "~/components/pages/game-lobby/GameLobbyHeader/GameLobbyHeader.vue";
import type { GameLobbyOptionsHubExposed } from "~/components/pages/game-lobby/GameLobbyOptionsHub/game-lobby-options-hub.types";
import GameLobbyOptionsHub from "~/components/pages/game-lobby/GameLobbyOptionsHub/GameLobbyOptionsHub.vue";
import GameLobbyPlayersParty from "~/components/pages/game-lobby/GameLobbyPlayersParty/GameLobbyPlayersParty.vue";
import type { GameLobbyRolePickerExposed } from "~/components/pages/game-lobby/GameLobbyRolePicker/game-lobby-role-picker.types";
import GameLobbyRolePicker from "~/components/pages/game-lobby/GameLobbyRolePicker/GameLobbyRolePicker.vue";
import type { CreateGamePlayerDto } from "~/composables/api/game/dto/create-game/create-game-player/create-game-player.dto";
import { useAudioStore } from "~/stores/audio/useAudioStore";
import { useCreateGameDtoStore } from "~/stores/game/create-game-dto/useCreateGameDtoStore";
import { useGameStore } from "~/stores/game/useGameStore";

const createGameDtoStore = useCreateGameDtoStore();
const { resetCreateGameDto } = createGameDtoStore;
const gameStore = useGameStore();
const { resetGame } = gameStore;

const audioStore = useAudioStore();
const { loadAllAudios } = audioStore;

const { t } = useI18n();

const gameLobbyRolePicker = ref<GameLobbyRolePickerExposed | null>(null);
const gameLobbyOptionsHub = ref<GameLobbyOptionsHubExposed | null>(null);

useHead({
  title: t("pages.gameLobby.startGame"),
  meta: [{ name: "description", content: t("pages.gameLobby.seoDescription") }],
});

function pickRoleForPlayer(player?: CreateGamePlayerDto): void {
  if (!gameLobbyRolePicker.value) {
    throw createError("Game Lobby Role Picker is not defined");
  }
  if (!player) {
    return;
  }
  gameLobbyRolePicker.value.openToPickRoleForPlayer(player);
}

function openGameOptionsHub(): void {
  if (!gameLobbyOptionsHub.value) {
    throw createError("Game Lobby Options Hub is not defined");
  }
  gameLobbyOptionsHub.value.open();
}

resetCreateGameDto();
resetGame();
loadAllAudios();
</script>