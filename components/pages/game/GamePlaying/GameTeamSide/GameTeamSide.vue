<template>
  <div id="game-playground-team-side">
    <GameTeamSidePlayer
      v-for="player in teamPlayers"
      :key="player._id"
      :player="player"
    />
  </div>
</template>

<script lang="ts" setup>
import { storeToRefs } from "pinia";

import type { GameTeamSideProps } from "~/components/pages/game/GamePlaying/GameTeamSide/game-team-side.types";
import GameTeamSidePlayer from "~/components/pages/game/GamePlaying/GameTeamSide/GameTeamSidePlayer/GameTeamSidePlayer.vue";
import type { Player } from "~/composables/api/game/types/players/player.class";
import { useGameStore } from "~/stores/game/useGameStore";

const props = defineProps<GameTeamSideProps>();

const gameStore = useGameStore();
const { game } = storeToRefs(gameStore);

const teamPlayers = computed<Player[]>(() => game.value.players.filter(player => player.side.current === props.side));
</script>