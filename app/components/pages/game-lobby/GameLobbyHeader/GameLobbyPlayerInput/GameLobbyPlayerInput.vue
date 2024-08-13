<template>
  <div id="game-lobby-player-input">
    <PrimeVueInputGroup
      id="game-lobby-player-input-group"
      class="mt-3"
    >
      <PrimeVueFloatLabel>
        <PrimeVueInputText
          id="player-name-input"
          v-model="inputValue"
          aria-labelledby="player-name-input-help"
          :class="{ 'p-invalid': doesPlayerNameExistInGame }"
          :disabled="isInputDisabled"
          :maxlength="MAX_PLAYER_NAME_LENGTH"
          size="large"
          type="text"
        />

        <label for="player-name-input">
          {{ $t("components.GameLobbyPlayerInput.playerName") }}
        </label>
      </PrimeVueFloatLabel>

      <PrimeVueButton
        id="add-player-button"
        :disabled="isAddButtonDisabled"
        severity="primary"
        type="submit"
      >
        <FontAwesomeIcon icon="plus"/>

        <span class="me-3">
          {{ $t("shared.actions.add") }}
        </span>
      </PrimeVueButton>
    </PrimeVueInputGroup>

    <Transition
      mode="out-in"
      name="fade"
    >
      <small
        id="player-name-input-help"
        :key="playerNameInputHelpText"
      >
        {{ playerNameInputHelpText }}
      </small>
    </Transition>
  </div>
</template>

<script lang="ts" setup>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { storeToRefs } from "pinia";
import { computed } from "vue";

import { MAX_PLAYERS_IN_GAME } from "~/composables/api/game/constants/game.constants";
import { MAX_PLAYER_NAME_LENGTH } from "~/composables/api/game/constants/player/player.constants";
import { useCreateGameDtoStore } from "~/stores/game/create-game-dto/useCreateGameDtoStore";

const { t } = useI18n();

const createGameDtoStore = useCreateGameDtoStore();

const { createGameDto } = storeToRefs(createGameDtoStore);

const inputValue = defineModel<string>({ required: true });

const doesPlayerNameExistInGame = computed<boolean>(() => createGameDto.value.players.some(({ name }) => name === inputValue.value.trim()));

const hasPlayerNameReachedMaxLength = computed<boolean>(() => inputValue.value.trim().length >= MAX_PLAYER_NAME_LENGTH);

const doesGameHaveMaxPlayers = computed<boolean>(() => createGameDto.value.players.length >= MAX_PLAYERS_IN_GAME);

const isInputDisabled = computed<boolean>(() => doesGameHaveMaxPlayers.value);

const isAddButtonDisabled = computed<boolean>(() => doesPlayerNameExistInGame.value || isInputDisabled.value);

const playerNameInputHelpText = computed<string>(() => {
  if (doesGameHaveMaxPlayers.value) {
    return t("components.GameLobbyPlayerInput.maxPlayersReached");
  }
  if (doesPlayerNameExistInGame.value) {
    return t("components.GameLobbyPlayerInput.playerNameIsAlreadyTaken");
  }
  if (hasPlayerNameReachedMaxLength.value) {
    return t("components.GameLobbyPlayerInput.playerNameMaxLengthReached");
  }
  return t("components.GameLobbyPlayerInput.pleaseEnterPlayerName");
});

defineExpose({ isAddButtonDisabled });
</script>