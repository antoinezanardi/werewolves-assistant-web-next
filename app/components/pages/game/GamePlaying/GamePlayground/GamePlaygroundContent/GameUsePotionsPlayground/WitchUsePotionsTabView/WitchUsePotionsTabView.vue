<template>
  <VuePrimeTabView
    id="witch-use-potions-tab-view"
    :active-index="tabViewActiveIndex"
    class="tabview-custom"
    :pt="{
      'nav': 'gap-2',
      'root': 'flex flex-col',
      'panelContainer': 'grow'
    }"
  >
    <VuePrimeTabPanel
      :disabled="hasWitchUsedLifePotion"
      :pt="{
        'header': 'grow',
        'root': 'h-full'
      }"
    >
      <template #header>
        <div class="flex gap-2 items-center">
          <NuxtImg
            :alt="$t('components.WitchUsePotionsTabView.lifePotionImageAlt')"
            height="40"
            src="svg/game/player/player-attribute/drank-life-potion.svg"
            width="40"
          />

          <h4>
            {{ $t("components.WitchUsePotionsTabView.giveLifePotion") }}
          </h4>
        </div>
      </template>

      <div
        id="give-life-potion-panel"
        class="flex flex-wrap h-full items-center justify-center m-0 place-content-center place-items-center"
      >
        <GamePlaygroundPlayerCard
          v-for="target in giveLifePotionInteractionEligibleTargets"
          :key="target._id"
          class="life-potion-target p-3 w-1/4"
          interaction="give-life-potion"
          :player="target"
        />
      </div>
    </VuePrimeTabPanel>

    <VuePrimeTabPanel
      :disabled="hasWitchUsedDeathPotion"
      :pt="{
        'header': 'grow',
        'root': 'h-full'
      }"
    >
      <template #header>
        <div class="flex gap-2 items-center">
          <NuxtImg
            :alt="$t('components.WitchUsePotionsTabView.deathPotionImageAlt')"
            height="40"
            src="svg/game/player/player-attribute/drank-death-potion.svg"
            width="40"
          />

          <h4>
            {{ $t("components.WitchUsePotionsTabView.giveDeathPotion") }}
          </h4>
        </div>
      </template>

      <div
        id="give-death-potion-panel"
        class="flex flex-wrap h-full items-center justify-center m-0 place-content-center"
      >
        <GamePlaygroundPlayerCard
          v-for="target in giveDeathPotionInteractionEligibleTargets"
          :key="target._id"
          class="death-potion-target p-3 w-1/4"
          interaction="give-death-potion"
          :player="target"
        />
      </div>
    </VuePrimeTabPanel>
  </VuePrimeTabView>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";

import GamePlaygroundPlayerCard from "~/components/pages/game/GamePlaying/GamePlayground/GamePlaygroundContent/GamePlaygroundPlayerCard/GamePlaygroundPlayerCard.vue";
import { useCurrentGamePlay } from "~/composables/api/game/game-play/useCurrentGamePlay";
import type { Player } from "~/composables/api/game/types/players/player.class";
import { useGameStore } from "~/stores/game/useGameStore";

const gameStore = useGameStore();
const { game } = storeToRefs(gameStore);

const { getEligibleTargetsWithInteractionInCurrentGamePlay } = useCurrentGamePlay(game);

const giveLifePotionInteractionEligibleTargets = computed<Player[]>(() => getEligibleTargetsWithInteractionInCurrentGamePlay("give-life-potion"));

const giveDeathPotionInteractionEligibleTargets = computed<Player[]>(() => getEligibleTargetsWithInteractionInCurrentGamePlay("give-death-potion"));

const hasWitchUsedLifePotion = computed<boolean>(() => giveLifePotionInteractionEligibleTargets.value.length === 0);

const hasWitchUsedDeathPotion = computed<boolean>(() => giveDeathPotionInteractionEligibleTargets.value.length === 0);

const tabViewActiveIndex = computed<number>(() => (hasWitchUsedLifePotion.value ? 1 : 0));
</script>