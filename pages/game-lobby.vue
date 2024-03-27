<template>
  <div class="flex flex-col">
    <GameLobbyHeader/>

    <VuePrimeDivider/>

    <GameLobbyPlayersParty
      id="game-lobby-players-party"
      class="flex-auto overflow-y-auto"
      @pick-role-for-player="pickRoleForPlayer"
    />

    <VuePrimeDivider/>

    <GameLobbyFooter/>

    <GameLobbyRolePicker ref="gameLobbyRolePicker"/>
  </div>
</template>

<script setup lang="ts">
import GameLobbyFooter from "~/components/pages/game-lobby/GameLobbyFooter/GameLobbyFooter.vue";
import GameLobbyHeader from "~/components/pages/game-lobby/GameLobbyHeader/GameLobbyHeader.vue";
import GameLobbyPlayersParty from "~/components/pages/game-lobby/GameLobbyPlayersParty/GameLobbyPlayersParty.vue";
import type { GameLobbyRolePickerExposed } from "~/components/pages/game-lobby/GameLobbyRolePicker/game-lobby-role-picker.types";
import GameLobbyRolePicker from "~/components/pages/game-lobby/GameLobbyRolePicker/GameLobbyRolePicker.vue";
import type { CreateGamePlayerDto } from "~/composables/api/game/dto/create-game/create-game-player/create-game-player.dto";
import { useCreateGameDtoStore } from "~/stores/game/create-game-dto/useCreateGameDtoStore";
import { useGameStore } from "~/stores/game/useGameStore";

const createGameDtoStore = useCreateGameDtoStore();
const { resetCreateGameDto } = createGameDtoStore;
const gameStore = useGameStore();
const { resetGame } = gameStore;

const { t } = useI18n();

const gameLobbyRolePicker = ref<GameLobbyRolePickerExposed | null>(null);

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

resetCreateGameDto();
resetGame();
</script>