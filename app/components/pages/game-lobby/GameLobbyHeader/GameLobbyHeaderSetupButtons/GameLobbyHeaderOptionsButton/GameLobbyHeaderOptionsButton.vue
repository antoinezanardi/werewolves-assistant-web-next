<template>
  <PrimeVueButton
    id="game-lobby-header-options-button"
    :pt="{ 'root': '!border-sky-600' }"
    severity="info"
    size="small"
    @click.prevent="onClickFromGameOptionsButton"
  >
    <FontAwesomeIcon
      icon="magic-wand-sparkles"
    />

    <span
      id="button-text"
      class="hidden md:inline"
    >
      {{ $t("components.GameLobbyHeaderOptionsButton.gameOptions") }}
    </span>

    <PrimeVueBadge
      v-if="changedGameOptionsCount"
      id="changed-game-options-count-badge"
      v-p-tooltip="changedGameOptionsBadgeTooltip"
      data-testid="changed-game-options-count-badge"
      severity="secondary"
      :value="changedGameOptionsCount"
    />
  </PrimeVueButton>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

import type { GameLobbyHeaderOptionsButtonEmits } from "~/components/pages/game-lobby/GameLobbyHeader/GameLobbyHeaderSetupButtons/GameLobbyHeaderOptionsButton/game-lobby-header-options-button.types";
import { useGameOptionsTexts } from "~/composables/api/game/game-options/useGameOptionsTexts";
import { useCreateGameDtoStore } from "~/stores/game/create-game-dto/useCreateGameDtoStore";

const emit = defineEmits<GameLobbyHeaderOptionsButtonEmits>();

const createGameDtoStore = useCreateGameDtoStore();
const { createGameOptionsDto } = storeToRefs(createGameDtoStore);

const { changedGameOptionsTexts } = useGameOptionsTexts(createGameOptionsDto);

const { t } = useI18n();

const changedGameOptionsCount = computed<number>(() => changedGameOptionsTexts.value.length);

const changedGameOptionsBadgeTooltip = computed<string>(() => t("components.GameLobbyHeaderOptionsButton.youHaveChangedGameOptions", {
  count: changedGameOptionsCount.value,
}));

function onClickFromGameOptionsButton(): void {
  emit("gameOptionsButtonClick");
}
</script>