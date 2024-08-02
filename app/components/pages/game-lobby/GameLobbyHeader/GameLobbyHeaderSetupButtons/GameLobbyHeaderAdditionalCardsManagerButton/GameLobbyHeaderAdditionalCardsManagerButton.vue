<template>
  <PrimeVueButton
    id="game-lobby-header-additional-cards-manager-button"
    :pt="{ 'root': '!border-sky-600' }"
    severity="info"
    size="small"
    @click.prevent="onClickFromAdditionalCardsManagerButton"
  >
    <i
      v-if="!areAdditionalCardsSetForAdditionalCardsDependantRoles"
      id="additional-cards-not-set-warning-icon"
      class="absolute fa fa-beat fa-exclamation-circle right-0.5 text-white top-0.5"
    />

    <i class="animate__animated animate__heartBeat animate__slow fa fa-clover me-2"/>

    <span id="game-lobby-header-additional-cards-manager-button-text">
      {{ $t('components.GameLobbyHeaderAdditionalCardsManagerButton.additionalCards') }}
    </span>
  </PrimeVueButton>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import type { GameLobbyHeaderAdditionalCardsManagerButtonEmits } from "~/components/pages/game-lobby/GameLobbyHeader/GameLobbyHeaderSetupButtons/GameLobbyHeaderAdditionalCardsManagerButton/game-lobby-header-additional-cards-manager-button.types";
import { useCreateGameDtoValidation } from "~/composables/api/game/useCreateGameDtoValidation";
import { useCreateGameDtoStore } from "~/stores/game/create-game-dto/useCreateGameDtoStore";

const emit = defineEmits<GameLobbyHeaderAdditionalCardsManagerButtonEmits>();

const createGameDtoStore = useCreateGameDtoStore();
const { createGameDto } = storeToRefs(createGameDtoStore);

const { areAdditionalCardsSetForAdditionalCardsDependantRoles } = useCreateGameDtoValidation(createGameDto);

function onClickFromAdditionalCardsManagerButton(): void {
  emit("additionalCardsManagerButtonClick");
}
</script>