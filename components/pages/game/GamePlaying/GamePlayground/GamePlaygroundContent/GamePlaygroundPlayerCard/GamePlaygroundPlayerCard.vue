<template>
  <div
    id="game-playground-player-card"
    class="m-3"
  >
    <PlayerCard
      :player-name="player.name"
      :player-role="player.role.current"
    />
  </div>
</template>

<script setup lang="ts">
import type { GamePlaygroundPlayerCardProps }
  from "~/components/pages/game/GamePlaying/GamePlayground/GamePlaygroundContent/GamePlaygroundPlayerCard/game-playground-player-card.types";
import PlayerCard from "~/components/shared/game/player/PlayerCard/PlayerCard.vue";

defineProps<GamePlaygroundPlayerCardProps>();
</script>