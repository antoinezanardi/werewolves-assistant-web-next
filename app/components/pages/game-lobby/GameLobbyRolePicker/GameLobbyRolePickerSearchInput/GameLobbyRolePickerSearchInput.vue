<template>
  <div id="game-lobby-role-picker-search-input-container">
    <PrimeVueFloatLabel variant="on">
      <PrimeVueIconField>
        <PrimeVueInputIcon>
          <FontAwesomeIcon icon="magnifying-glass"/>
        </PrimeVueInputIcon>

        <PrimeVueInputText
          id="game-lobby-role-picker-search-input"
          v-model="inputValue"
          :aria-label="$t('components.GameLobbyRolePickerSearchInput.searchForRole')"
        />
      </PrimeVueIconField>

      <label
        id="game-lobby-role-picker-search-input-label"
        for="game-lobby-role-picker-search-input"
      >
        {{ $t("components.GameLobbyRolePickerSearchInput.searchForRole") }}
      </label>
    </PrimeVueFloatLabel>
  </div>
</template>

<script setup lang="ts">
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

const inputValue = defineModel<string>();
</script>