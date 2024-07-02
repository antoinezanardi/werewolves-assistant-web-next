<template>
  <PrimeVueTabView
    id="game-lobby-options-hub-tab-view"
    :pt="{ 'nav': '!border-none' }"
  >
    <PrimeVueTabPanel
      id="roles-tab-panel"
      :pt="{ 'header': 'grow' }"
    >
      <template #header>
        <div
          id="roles-tab-header"
          class="flex gap-2 items-center justify-center w-full"
        >
          <RoleImage
            height="40"
            width="40"
          />

          <h3 id="roles-tab-header-text">
            {{ $t('components.GameLobbyOptionsHubTabView.roles') }}
          </h3>
        </div>
      </template>

      <GameLobbyOptionsHubRolesTab/>
    </PrimeVueTabPanel>

    <PrimeVueTabPanel
      id="composition-tab-panel"
      :pt="{ 'header': 'grow' }"
    >
      <template #header>
        <div
          id="composition-tab-header"
          class="flex gap-2 items-center justify-center w-full"
        >
          <NuxtImg
            :alt="$t('components.GameLobbyOptionsHubTabView.compositionTabImageAlt')"
            height="40"
            src="/svg/misc/people.svg"
            width="40"
          />

          <h3 id="composition-tab-header-text">
            {{ $t('components.GameLobbyOptionsHubTabView.composition') }}
          </h3>
        </div>
      </template>

      <GameLobbyOptionsHubCompositionTab/>
    </PrimeVueTabPanel>

    <PrimeVueTabPanel
      id="votes-tab-panel"
      :pt="{ 'header': 'grow' }"
    >
      <template #header>
        <div
          id="votes-tab-header"
          class="flex gap-2 items-center justify-center w-full"
        >
          <NuxtImg
            :alt="$t('components.GameLobbyOptionsHubTabView.votesTabImageAlt')"
            height="40"
            src="/svg/game/game-play/game-play-action/settle-votes.svg"
            width="40"
          />

          <h3 id="votes-tab-header-text">
            {{ $t('components.GameLobbyOptionsHubTabView.votes') }}
          </h3>
        </div>
      </template>

      <GameLobbyOptionsHubVotesTab/>
    </PrimeVueTabPanel>
  </PrimeVueTabView>
</template>

<script setup lang="ts">
import GameLobbyOptionsHubCompositionTab from "~/components/pages/game-lobby/GameLobbyOptionsHub/GameLobbyOptionsHubTabView/GameLobbyOptionsHubCompositionTab/GameLobbyOptionsHubCompositionTab.vue";
import GameLobbyOptionsHubRolesTab from "~/components/pages/game-lobby/GameLobbyOptionsHub/GameLobbyOptionsHubTabView/GameLobbyOptionsHubRolesTab/GameLobbyOptionsHubRolesTab.vue";
import GameLobbyOptionsHubVotesTab from "~/components/pages/game-lobby/GameLobbyOptionsHub/GameLobbyOptionsHubTabView/GameLobbyOptionsHubVotesTab/GameLobbyOptionsHubVotesTab.vue";
import RoleImage from "~/components/shared/role/RoleImage/RoleImage.vue";
</script>