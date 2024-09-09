<template>
  <PrimeVueTabs
    id="game-lobby-options-hub-tab-view"
    class="w-full"
    :pt="{ 'nav': '!border-none' }"
    value="roles"
  >
    <PrimeVueTabList
      :pt="{ 'tabList': '!w-full' }"
    >
      <PrimeVueTab
        id="roles-tab-header"
        class="flex gap-2 grow items-center justify-center"
        value="roles"
      >
        <RoleImage
          height="40"
          width="40"
        />

        <h3 id="roles-tab-header-text">
          {{ $t('components.GameLobbyOptionsHubTabView.roles') }}
        </h3>
      </PrimeVueTab>

      <PrimeVueTab
        id="composition-tab-header"
        class="flex gap-2 grow items-center justify-center"
        value="composition"
      >
        <NuxtImg
          :alt="$t('components.GameLobbyOptionsHubTabView.compositionTabImageAlt')"
          height="40"
          placeholder="/svg/misc/infinite-spinner.svg"
          src="/svg/misc/people.svg"
          width="40"
        />

        <h3 id="composition-tab-header-text">
          {{ $t('components.GameLobbyOptionsHubTabView.composition') }}
        </h3>
      </PrimeVueTab>

      <PrimeVueTab
        id="votes-tab-header"
        class="flex gap-2 grow items-center justify-center"
        value="votes"
      >
        <NuxtImg
          :alt="$t('components.GameLobbyOptionsHubTabView.votesTabImageAlt')"
          height="40"
          placeholder="/svg/misc/infinite-spinner.svg"
          src="/svg/game/game-play/game-play-action/settle-votes.svg"
          width="40"
        />

        <h3 id="votes-tab-header-text">
          {{ $t('components.GameLobbyOptionsHubTabView.votes') }}
        </h3>
      </PrimeVueTab>
    </PrimeVueTabList>

    <PrimeVueTabPanels>
      <PrimeVueTabPanel
        id="roles-tab-panel"
        :pt="{ 'header': 'grow' }"
        value="roles"
      >
        <GameLobbyOptionsHubRolesTab/>
      </PrimeVueTabPanel>

      <PrimeVueTabPanel
        id="composition-tab-panel"
        :pt="{ 'header': 'grow' }"
        value="composition"
      >
        <GameLobbyOptionsHubCompositionTab/>
      </PrimeVueTabPanel>

      <PrimeVueTabPanel
        id="votes-tab-panel"
        :pt="{ 'header': 'grow' }"
        value="votes"
      >
        <GameLobbyOptionsHubVotesTab/>
      </PrimeVueTabPanel>
    </PrimeVueTabPanels>
  </PrimeVueTabs>
</template>

<script setup lang="ts">
import GameLobbyOptionsHubCompositionTab from "~/components/pages/game-lobby/GameLobbyOptionsHub/GameLobbyOptionsHubTabView/GameLobbyOptionsHubCompositionTab/GameLobbyOptionsHubCompositionTab.vue";
import GameLobbyOptionsHubRolesTab from "~/components/pages/game-lobby/GameLobbyOptionsHub/GameLobbyOptionsHubTabView/GameLobbyOptionsHubRolesTab/GameLobbyOptionsHubRolesTab.vue";
import GameLobbyOptionsHubVotesTab from "~/components/pages/game-lobby/GameLobbyOptionsHub/GameLobbyOptionsHubTabView/GameLobbyOptionsHubVotesTab/GameLobbyOptionsHubVotesTab.vue";
import RoleImage from "~/components/shared/role/RoleImage/RoleImage.vue";
</script>