<template>
  <div id="game-use-potions-playground">
    <h2
      v-if="hasWitchUsedBothPotions"
      id="no-potion"
      class="flex flex-col h-full items-center justify-center"
    >
      <FontAwesomeIcon
        class="fa-2x mb-2 text-info"
        icon="flask"
      />

      <span>
        {{ $t("components.GameUsePotionsPlayground.witchHasUsedBothPotions") }}
      </span>
    </h2>

    <WitchUsePotionsTabView
      v-else
      id="witch-use-potions-tab-view"
      class="h-full"
    />
  </div>
</template>

<script lang="ts" setup>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { storeToRefs } from "pinia";

import WitchUsePotionsTabView from "~/components/pages/game/GamePlaying/GamePlayground/GamePlaygroundContent/GameUsePotionsPlayground/WitchUsePotionsTabView/WitchUsePotionsTabView.vue";
import { useCurrentGamePlay } from "~/composables/api/game/game-play/useCurrentGamePlay";
import type { Player } from "~/composables/api/game/types/players/player.class";
import { useGameStore } from "~/stores/game/useGameStore";

const gameStore = useGameStore();
const { game } = storeToRefs(gameStore);

const { getEligibleTargetsWithInteractionInCurrentGamePlay } = useCurrentGamePlay(game);

const giveLifePotionInteractionEligibleTargets = computed<Player[]>(() => getEligibleTargetsWithInteractionInCurrentGamePlay("give-life-potion"));

const giveDeathPotionInteractionEligibleTargets = computed<Player[]>(() => getEligibleTargetsWithInteractionInCurrentGamePlay("give-death-potion"));

const hasWitchUsedBothPotions = computed<boolean>(() => !giveLifePotionInteractionEligibleTargets.value.length && !giveDeathPotionInteractionEligibleTargets.value.length);
</script>