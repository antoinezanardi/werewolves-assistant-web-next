<template>
  <VuePrimeInputGroup
    id="game-lobby-player-input-group"
    class="mt-3"
  >
    <span class="p-float-label">
      <VuePrimeInputText
        id="player-name-input"
        v-model="inputValue"
        :disabled="isInputDisabled"
        size="large"
        type="text"
      />

      <label for="player-name-input">
        {{ $t("components.GameLobbyPlayerInput.playerName") }}
      </label>
    </span>

    <VuePrimeButton
      id="add-player-button"
      :disabled="isAddButtonDisabled"
      role="submit"
      severity="primary"
    >
      <i class="fa fa-plus me-2"/>

      <span>
        {{ $t("shared.actions.add") }}
      </span>
    </VuePrimeButton>
  </VuePrimeInputGroup>
</template>

<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { computed, defineModel } from "vue";

import { MAX_PLAYERS_IN_GAME } from "~/composables/api/game/constants/game.constants";
import { useCreateGameDtoStore } from "~/stores/game/create-game-dto/useCreateGameDtoStore";

const createGameDtoStore = useCreateGameDtoStore();

const { createGameDto } = storeToRefs(createGameDtoStore);

const inputValue = defineModel<string>({ required: true });

const isInputDisabled = computed<boolean>(() => createGameDto.value.players.length >= MAX_PLAYERS_IN_GAME);

const isAddButtonDisabled = computed<boolean>(() => createGameDto.value.players.some(({ name }) => name === inputValue.value.trim()) || isInputDisabled.value);
</script>