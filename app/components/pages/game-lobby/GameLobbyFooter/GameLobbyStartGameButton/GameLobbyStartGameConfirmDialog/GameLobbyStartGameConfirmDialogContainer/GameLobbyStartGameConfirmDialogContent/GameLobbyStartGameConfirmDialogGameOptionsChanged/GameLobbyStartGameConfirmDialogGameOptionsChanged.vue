<template>
  <div
    id="game-lobby-start-game-confirm-dialog-game-options-changed"
    class="flex flex-col gap-6 items-center justify-center"
  >
    <div class="flex flex-col gap-2 items-center justify-center">
      <NuxtImg
        :alt="$t(`components.GameLobbyStartGameConfirmDialogGameOptionsChanged.changedGameOptionsIcon`)"
        :height="svgSize"
        placeholder="/svg/misc/infinite-spinner.svg"
        src="/svg/misc/rabbit-in-hat.svg"
        :width="svgSize"
      />
    </div>

    <h4
      id="game-lobby-start-game-confirm-dialog-game-options-changed-text"
      class="text-center"
    >
      {{ gameOptionsChangedText }}
    </h4>

    <ChangedGameOptionsList class="w-full"/>

    <div
      id="game-lobby-start-game-confirm-dialog-game-options-changed-actions"
      class="flex gap-2 items-center justify-evenly w-full"
    >
      <PrimeVueButton
        id="reject-step-button"
        :label="$t(`components.GameLobbyStartGameConfirmDialogGameOptionsChanged.seeAllGameOptions`)"
        severity="info"
        @click.prevent="onRejectGameOptionsChangedStep"
      >
        <template #icon>
          <FontAwesomeIcon icon="eye"/>
        </template>
      </PrimeVueButton>

      <PrimeVueButton
        id="confirm-step-button"
        :label="$t(`shared.actions.confirm`)"
        severity="success"
        @click.prevent="onConfirmGameOptionsChangedStep"
      >
        <template #icon>
          <FontAwesomeIcon icon="check"/>
        </template>
      </PrimeVueButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { storeToRefs } from "pinia";
import ChangedGameOptionsList from "~/components/pages/game-lobby/GameLobbyFooter/GameLobbyStartGameButton/GameLobbyStartGameConfirmDialog/GameLobbyStartGameConfirmDialogContainer/GameLobbyStartGameConfirmDialogContent/GameLobbyStartGameConfirmDialogGameOptionsChanged/ChangedGameOptionsList/ChangedGameOptionsList.vue";
import type { GameLobbyStartGameConfirmDialogGameOptionsChangedEmits } from "~/components/pages/game-lobby/GameLobbyFooter/GameLobbyStartGameButton/GameLobbyStartGameConfirmDialog/GameLobbyStartGameConfirmDialogContainer/GameLobbyStartGameConfirmDialogContent/GameLobbyStartGameConfirmDialogGameOptionsChanged/game-lobby-start-game-confirm-dialog-game-options-changed.types";
import { useGameOptionsTexts } from "~/composables/api/game/game-options/useGameOptionsTexts";
import { useCreateGameDtoStore } from "~/stores/game/create-game-dto/useCreateGameDtoStore";

const emit = defineEmits<GameLobbyStartGameConfirmDialogGameOptionsChangedEmits>();

const svgSize = 75;

const createGameDtoStore = useCreateGameDtoStore();
const { createGameOptionsDto } = storeToRefs(createGameDtoStore);

const { changedGameOptionsTexts } = useGameOptionsTexts(createGameOptionsDto);

const { t } = useI18n();

const changedGameOptionsCount = computed<number>(() => changedGameOptionsTexts.value.length);

const gameOptionsChangedText = computed<string>(() => {
  const tKey = "components.GameLobbyStartGameConfirmDialogGameOptionsChanged.gameOptionsChanged";

  return t(tKey, { count: changedGameOptionsCount.value }, changedGameOptionsCount.value);
});

function onConfirmGameOptionsChangedStep(): void {
  emit("confirmStep");
}

function onRejectGameOptionsChangedStep(): void {
  emit("rejectGameOptionsChangedStep");
}
</script>