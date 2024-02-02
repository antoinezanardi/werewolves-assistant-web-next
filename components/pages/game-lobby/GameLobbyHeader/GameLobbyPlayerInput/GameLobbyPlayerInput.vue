<template>
  <VuePrimeInputGroup
    id="game-lobby-player-input-group"
    class="mt-3"
  >
    <span class="p-float-label">
      <VuePrimeInputText
        id="player-name"
        v-model="inputValue"
        :placeholder="$t('components.GameLobbyPlayerInput.placeholder')"
        size="large"
        type="text"
      />

      <label for="player-name">
        {{ $t("components.GameLobbyPlayerInput.addPlayer") }}
      </label>
    </span>

    <VuePrimeButton
      severity="primary"
    >
      {{ $t("components.GameLobbyPlayerInput.add") }}
    </VuePrimeButton>
  </VuePrimeInputGroup>
</template>

<script lang="ts" setup>

const inputValue = ref<string>("");

</script>