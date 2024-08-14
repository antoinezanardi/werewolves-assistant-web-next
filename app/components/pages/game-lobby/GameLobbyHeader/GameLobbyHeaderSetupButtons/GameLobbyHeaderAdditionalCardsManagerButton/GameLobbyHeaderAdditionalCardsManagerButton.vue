<template>
  <PrimeVueButton
    id="game-lobby-header-additional-cards-manager-button"
    :pt="{ 'root': '!border-sky-600' }"
    severity="info"
    size="small"
    @click.prevent="onClickFromAdditionalCardsManagerButton"
  >
    <FontAwesomeIcon
      class="animate__animated animate__heartBeat animate__slow"
      icon="clover"
    />

    <span id="game-lobby-header-additional-cards-manager-button-text">
      {{ $t('components.GameLobbyHeaderAdditionalCardsManagerButton.additionalCards') }}
    </span>

    <FontAwesomeIcon
      v-if="!areAdditionalCardsSetForAdditionalCardsDependantRoles"
      id="additional-cards-not-set-warning-icon"
      icon="exclamation-circle"
    />
  </PrimeVueButton>
</template>

<script setup lang="ts">
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
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