<template>
  <VuePrimeInputGroup
    id="game-lobby-player-input-group"
    class="mt-3"
  >
    <span class="p-float-label">
      <VuePrimeInputText
        id="player-name-input"
        v-model="inputValue"
        size="large"
        type="text"
      />

      <label for="player-name-input">
        {{ $t("components.GameLobbyPlayerInput.playerName") }}
      </label>
    </span>

    <VuePrimeButton
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

const inputValue = ref<string>("");

</script>