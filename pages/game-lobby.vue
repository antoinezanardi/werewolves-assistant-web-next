<template>
  <div class="flex flex-col">
    <GameLobbyHeader/>

    <VuePrimeDivider/>

    <GameLobbyPlayersParty class="flex-auto overflow-y-auto"/>

    <VuePrimeDivider/>

    <GameLobbyFooter/>
  </div>
</template>

<script setup lang="ts">
import GameLobbyFooter from "~/components/pages/game-lobby/GameLobbyFooter/GameLobbyFooter.vue";
import GameLobbyHeader from "~/components/pages/game-lobby/GameLobbyHeader/GameLobbyHeader.vue";
import GameLobbyPlayersParty from "~/components/pages/game-lobby/GameLobbyPlayersParty/GameLobbyPlayersParty.vue";
import { useCreateGameDtoStore } from "~/stores/game/create-game-dto/useCreateGameDtoStore";
import { useGameStore } from "~/stores/game/useGameStore";

const createGameDtoStore = useCreateGameDtoStore();
const { resetCreateGameDto } = createGameDtoStore;
const gameStore = useGameStore();
const { resetGame } = gameStore;

const { t } = useI18n();

useHead({
  title: t("pages.gameLobby.startGame"),
  meta: [{ name: "description", content: t("pages.gameLobby.seoDescription") }],
});

resetCreateGameDto();
resetGame();
</script>