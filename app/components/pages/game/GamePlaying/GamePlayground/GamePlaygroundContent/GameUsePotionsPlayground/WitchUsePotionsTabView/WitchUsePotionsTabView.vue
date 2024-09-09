<template>
  <PrimeVueTabs
    id="witch-use-potions-tab-view"
    :value="tabViewActiveIndex"
  >
    <PrimeVueTabList
      class="w-full"
      :pt="{ 'content': '!w-full' }"
    >
      <PrimeVueTab
        id="life-potion-tab"
        class="flex gap-2 items-center w-1/2"
        :disabled="hasWitchUsedLifePotion"
        value="life-potion"
      >
        <NuxtImg
          :alt="$t('components.WitchUsePotionsTabView.lifePotionImageAlt')"
          height="40"
          placeholder="/svg/misc/infinite-spinner.svg"
          src="svg/game/player/player-attribute/drank-life-potion.svg"
          width="40"
        />

        <h4 class="text-pretty">
          {{ $t("components.WitchUsePotionsTabView.giveLifePotion") }}
        </h4>
      </PrimeVueTab>

      <PrimeVueTab
        id="death-potion-tab"
        class="flex gap-2 items-center w-1/2"
        :disabled="hasWitchUsedDeathPotion"
        value="death-potion"
      >
        <NuxtImg
          :alt="$t('components.WitchUsePotionsTabView.deathPotionImageAlt')"
          height="40"
          placeholder="/svg/misc/infinite-spinner.svg"
          src="svg/game/player/player-attribute/drank-death-potion.svg"
          width="40"
        />

        <h4 class="text-pretty">
          {{ $t("components.WitchUsePotionsTabView.giveDeathPotion") }}
        </h4>
      </PrimeVueTab>
    </PrimeVueTabList>

    <PrimeVueTabPanels
      class="h-full"
      :value="tabViewActiveIndex"
    >
      <PrimeVueTabPanel
        id="give-life-potion-panel"
        class="!h-full flex flex-wrap grow items-center justify-center m-0 place-content-center place-items-center"
        value="life-potion"
      >
        <GamePlaygroundPlayerCard
          v-for="target in giveLifePotionInteractionEligibleTargets"
          :key="target._id"
          class="life-potion-target p-3 w-1/4"
          interaction="give-life-potion"
          :player="target"
        />
      </PrimeVueTabPanel>

      <PrimeVueTabPanel
        id="give-death-potion-panel"
        class="!h-full flex flex-wrap items-center justify-center m-0 place-content-center place-items-center"
        value="death-potion"
      >
        <GamePlaygroundPlayerCard
          v-for="target in giveDeathPotionInteractionEligibleTargets"
          :key="target._id"
          class="death-potion-target p-3 w-1/4"
          interaction="give-death-potion"
          :player="target"
        />
      </PrimeVueTabPanel>
    </PrimeVueTabPanels>
  </PrimeVueTabs>
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

const tabViewActiveIndex = computed<"life-potion" | "death-potion">(() => (hasWitchUsedLifePotion.value ? "death-potion" : "life-potion"));
</script>