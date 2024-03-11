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
            class="border-4 border-transparent glow:border-green-500 me-2 p-2 rounded-lg"
            :class="{ '!border-green-500': makeGamePlayDto.chosenSide === RoleSides.VILLAGERS }"
            type="button"
            @click.prevent="handleChooseVillagersSideButtonClick"
          >
            <RoleImage
              id="villagers-side-image"
              class="glow:border-green-500 mb-1"
              :class="{ 'border-green-500': makeGamePlayDto.chosenSide === RoleSides.VILLAGERS }"
              definition="normal"
              :role-name="RoleNames.VILLAGER"
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
            class="border-4 border-transparent glow:border-red-500 ms-2 p-2 rounded-lg"
            :class="{ '!border-red-500': makeGamePlayDto.chosenSide === RoleSides.WEREWOLVES }"
            type="button"
            @click="handleChooseWerewolvesSideButtonClick"
          >
            <RoleImage
              id="werewolves-side-image"
              class="glow:border-red-500 mb-1"
              :class="{ 'border-red-500': makeGamePlayDto.chosenSide === RoleSides.WEREWOLVES }"
              definition="normal"
              :role-name="RoleNames.WEREWOLF"
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
import { RoleNames, RoleSides } from "~/composables/api/role/enums/role.enums";
import { useMakeGamePlayDtoStore } from "~/stores/game/make-game-play-dto/useMakeGamePlayDtoStore";

const makeGamePlayDtoStore = useMakeGamePlayDtoStore();
const { makeGamePlayDto } = storeToRefs(makeGamePlayDtoStore);
const { setChosenSide } = makeGamePlayDtoStore;

function handleChooseVillagersSideButtonClick(): void {
  setChosenSide(RoleSides.VILLAGERS);
}

function handleChooseWerewolvesSideButtonClick(): void {
  setChosenSide(RoleSides.WEREWOLVES);
}
</script>