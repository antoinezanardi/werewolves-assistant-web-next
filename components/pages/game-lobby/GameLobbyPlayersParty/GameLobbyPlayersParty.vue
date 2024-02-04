<template>
  <div id="game-lobby-players-party">
    <PlayerCard
      player-name="toto"
      :player-role="undefined"
    />
  </div>
</template>

<script setup lang="ts">
import PlayerCard from "~/components/shared/game/player/PlayerCard/PlayerCard.vue";
</script>