<template>
  <div
    id="game-bury-dead-bodies-playground"
    class="flex items-center justify-center"
  >
    <GameDevotedServantStealsRolePlayground
      v-if="eligibleStolenRoleByDevotedServantPlayers"
      id="game-devoted-servant-steals-role-playground"
    />

    <NoActionNeeded
      v-else
      id="no-action-needed"
    />
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";

import GameDevotedServantStealsRolePlayground from "~/components/pages/game/GamePlaying/GamePlayground/GamePlaygroundContent/GameBuryDeadBodiesPlayground/GameDevotedServantStealsRolePlayground/GameDevotedServantStealsRolePlayground.vue";
import NoActionNeeded from "~/components/shared/game/game-play/NoNeededAction/NoActionNeeded.vue";
import { useCurrentGamePlay } from "~/composables/api/game/game-play/useCurrentGamePlay";
import type { Player } from "~/composables/api/game/types/players/player.class";
import { useGameStore } from "~/stores/game/useGameStore";

const gameStore = useGameStore();
const { game } = storeToRefs(gameStore);

const { getEligibleTargetsWithInteractionInCurrentGamePlay } = useCurrentGamePlay(game);

const eligibleStolenRoleByDevotedServantPlayers = computed<Player[] | undefined>(() => getEligibleTargetsWithInteractionInCurrentGamePlay("steal-role"));
</script>