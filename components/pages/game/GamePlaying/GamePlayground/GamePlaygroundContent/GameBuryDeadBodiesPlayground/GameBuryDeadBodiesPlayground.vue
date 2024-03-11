<template>
  <div
    id="game-bury-dead-bodies-playground"
    class="flex items-center justify-center"
  >
    <GameDevotedServantStealsRolePlayground
      v-if="eligibleStolenRoleByDevotedServantPlayer"
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
import { useGamePlay } from "~/composables/api/game/game-play/useGamePlay";
import { PlayerInteraction } from "~/composables/api/game/types/game-play/game-play-eligible-targets/interactable-player/player-interaction/player-interaction.class";
import type { Player } from "~/composables/api/game/types/players/player.class";
import { useGameStore } from "~/stores/game/useGameStore";

const gameStore = useGameStore();
const { game } = storeToRefs(gameStore);

const { getPlayerWithInteractionInCurrentGamePlay } = useGamePlay(game);

const eligibleStolenRoleByDevotedServantPlayer = computed<Player | undefined>(() => {
  const stolenRoleByDevotedServantInteraction = PlayerInteraction.create({
    source: "devoted-servant",
    type: "steal-role",
  });

  return getPlayerWithInteractionInCurrentGamePlay(stolenRoleByDevotedServantInteraction);
});
</script>