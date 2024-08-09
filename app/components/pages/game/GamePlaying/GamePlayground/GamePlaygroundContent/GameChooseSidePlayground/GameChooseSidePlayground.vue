<template>
  <div
    id="game-choose-side-playground"
    class="flex flex-col items-center justify-center"
  >
    <div>
      <GlowCapture class="flex">
        <GlowElement>
          <button
            id="choose-villagers-side-button"
            :aria-label="$t('components.GameChooseSidePlayground.villagersSide')"
            class="border-4 border-transparent glow:border-emerald-500 me-2 p-2 rounded-lg"
            :class="{ '!border-emerald-500': makeGamePlayDto.chosenSide === 'villagers' }"
            type="button"
            @click.prevent="onClickFromChooseVillagersSideButton"
          >
            <RoleImage
              id="villagers-side-image"
              class="glow:border-emerald-500 mb-1"
              :class="{ 'border-emerald-500': makeGamePlayDto.chosenSide === 'villagers' }"
              definition="normal"
              role-name="villager"
              sizes="200"
            />

            <span class="font-semibold">
              {{ $t("components.GameChooseSidePlayground.villagersSide") }}
            </span>
          </button>
        </GlowElement>

        <GlowElement>
          <button
            id="choose-werewolves-side-button"
            :aria-label="$t('components.GameChooseSidePlayground.werewolvesSide')"
            class="border-4 border-transparent glow:border-red-500 ms-2 p-2 rounded-lg"
            :class="{ '!border-red-500': makeGamePlayDto.chosenSide === 'werewolves' }"
            type="button"
            @click.prevent="onClickFromChooseWerewolvesSideButton"
          >
            <RoleImage
              id="werewolves-side-image"
              class="glow:border-red-500 mb-1"
              :class="{ 'border-red-500': makeGamePlayDto.chosenSide === 'werewolves' }"
              definition="normal"
              role-name="werewolf"
              sizes="200"
            />

            <span class="font-semibold">
              {{ $t("components.GameChooseSidePlayground.werewolvesSide") }}
            </span>
          </button>
        </GlowElement>
      </glowcapture>
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";

import RoleImage from "~/components/shared/role/RoleImage/RoleImage.vue";
import { useMakeGamePlayDtoStore } from "~/stores/game/make-game-play-dto/useMakeGamePlayDtoStore";

const makeGamePlayDtoStore = useMakeGamePlayDtoStore();
const { makeGamePlayDto } = storeToRefs(makeGamePlayDtoStore);
const { setChosenSide } = makeGamePlayDtoStore;

function onClickFromChooseVillagersSideButton(): void {
  setChosenSide("villagers");
}

function onClickFromChooseWerewolvesSideButton(): void {
  setChosenSide("werewolves");
}
</script>