<template>
  <div
    id="game-lobby-start-game-confirm-dialog-players-ready"
    class="flex flex-col gap-6 items-center justify-center"
  >
    <div class="flex gap-2">
      <NuxtImg
        :alt="$t(`shared.game.player.group.name.villagers`)"
        :height="svgSize"
        placeholder="/svg/misc/infinite-spinner.svg"
        src="/svg/role/villager.svg"
        :width="svgSize"
      />

      <NuxtImg
        :alt="$t(`shared.game.player.group.name.werewolves`)"
        :height="svgSize"
        placeholder="/svg/misc/infinite-spinner.svg"
        src="/svg/role/werewolf.svg"
        :width="svgSize"
      />
    </div>

    <h4
      id="game-lobby-start-game-confirm-dialog-players-ready-text"
      class="text-center"
    >
      {{ $t("components.GameLobbyStartGameConfirmDialogPlayersReady.doAllPlayersHaveRoleAndReady") }}
    </h4>
  </div>
</template>

<script setup lang="ts">
const svgSize = 75;
</script>