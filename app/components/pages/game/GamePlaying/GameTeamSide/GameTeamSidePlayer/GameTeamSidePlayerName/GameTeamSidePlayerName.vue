<template>
  <div class="flex items-center justify-center">
    <NuxtImg
      v-if="!player.isAlive"
      v-p-tooltip="$t('components.GameTeamSidePlayerName.thisPlayerIsDead')"
      :alt="$t('components.GameTeamSidePlayerName.thisPlayerIsDead')"
      class="me-2"
      height="20"
      placeholder="/svg/misc/infinite-spinner.svg"
      src="/svg/game/player/dead.svg"
      width="20"
    />

    <div
      id="player-name"
      class="text-center truncate"
      :class="{ 'line-through decoration-1': !player.isAlive }"
    >
      {{ player.name }}
    </div>
  </div>
</template>

<script setup lang="ts">
import type { GameTeamSidePlayerNameProps } from "~/components/pages/game/GamePlaying/GameTeamSide/GameTeamSidePlayer/GameTeamSidePlayerName/game-team-side-player-name.types";

defineProps<GameTeamSidePlayerNameProps>();
</script>