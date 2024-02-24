<template>
  <div id="game-team-side-player">
    {{ player.name }}
  </div>
</template>

<script lang="ts" setup>
import type { GameTeamSidePlayerProps } from "~/components/pages/game/GamePlaying/GameTeamSide/GameTeamSidePlayer/game-team-side-player.types";

defineProps<GameTeamSidePlayerProps>();
</script>