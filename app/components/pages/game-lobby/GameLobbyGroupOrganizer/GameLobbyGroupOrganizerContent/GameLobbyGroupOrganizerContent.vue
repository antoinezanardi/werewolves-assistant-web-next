<template>
  <div
    id="game-lobby-group-organizer-content"
    class="flex flex-col gap-1"
  >
    <GameLobbyGroupOrganizerContentHeader/>

    <PrimeVueDivider class="!my-2"/>

    <GameLobbyGroupOrganizerGroupNames/>

    <GameLobbyGroupOrganizerPickList class="h-3/5"/>

    <GameLobbyGroupOrganizerDisclaimer class="flex grow items-center justify-center"/>
  </div>
</template>

<script setup lang="ts">
import GameLobbyGroupOrganizerContentHeader from "~/components/pages/game-lobby/GameLobbyGroupOrganizer/GameLobbyGroupOrganizerContent/GameLobbyGroupOrganizerContentHeader/GameLobbyGroupOrganizerContentHeader.vue";
import GameLobbyGroupOrganizerDisclaimer from "~/components/pages/game-lobby/GameLobbyGroupOrganizer/GameLobbyGroupOrganizerContent/GameLobbyGroupOrganizerDisclaimer/GameLobbyGroupOrganizerDisclaimer.vue";
import GameLobbyGroupOrganizerGroupNames from "~/components/pages/game-lobby/GameLobbyGroupOrganizer/GameLobbyGroupOrganizerContent/GameLobbyGroupOrganizerGroupNames/GameLobbyGroupOrganizerGroupNames.vue";
import GameLobbyGroupOrganizerPickList from "~/components/pages/game-lobby/GameLobbyGroupOrganizer/GameLobbyGroupOrganizerContent/GameLobbyGroupOrganizerPickList/GameLobbyGroupOrganizerPickList.vue";
</script>