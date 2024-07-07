<template>
  <PrimeVueConfirmDialog
    id="game-lobby-start-game-confirm-dialog"
    ref="gameLobbyStartGameConfirmDialog"
    :pt="{ 'root': 'w-1/3' }"
  >
    <template #container="{ acceptCallback, rejectCallback }">
      <GameLobbyStartGameConfirmDialogContainer
        id="game-lobby-start-game-confirm-dialog-container"
        :current-confirm-step="currentConfirmStep"
        :reject-callback="rejectCallback"
        @confirm-start-game="acceptCallback"
        @confirm-step="confirmStep"
        @reject-players-position-step="rejectPlayersPositionStep"
        @reject-start-game="rejectCallback"
      />
    </template>
  </PrimeVueConfirmDialog>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useConfirm } from "primevue/useconfirm";
import type { ComponentPublicInstance } from "vue";
import type { GameLobbyStartGameConfirmDialogEmits, GameLobbyStartGameConfirmDialogExposed, GameLobbyStartGameConfirmDialogStep } from "~/components/pages/game-lobby/GameLobbyFooter/GameLobbyStartGameButton/GameLobbyStartGameConfirmDialog/game-lobby-start-game-confirm-dialog.types";
import GameLobbyStartGameConfirmDialogContainer from "~/components/pages/game-lobby/GameLobbyFooter/GameLobbyStartGameButton/GameLobbyStartGameConfirmDialog/GameLobbyStartGameConfirmDialogContainer/GameLobbyStartGameConfirmDialogContainer.vue";
import { useArrays } from "~/composables/misc/useArrays";
import { useCreateGameDtoStore } from "~/stores/game/create-game-dto/useCreateGameDtoStore";

const emit = defineEmits<GameLobbyStartGameConfirmDialogEmits>();

const gameLobbyStartGameConfirmDialog = ref<ComponentPublicInstance | null>(null);

const confirmStepIndex = ref<number>(0);

const createGameDtoStore = useCreateGameDtoStore();
const { doesCreateGameDtoContainPositionDependantRoles } = storeToRefs(createGameDtoStore);

const { require: confirmRequire } = useConfirm();

const { insertIf } = useArrays();

const confirmSteps = computed<GameLobbyStartGameConfirmDialogStep[]>(() => [
  ...insertIf<GameLobbyStartGameConfirmDialogStep>(doesCreateGameDtoContainPositionDependantRoles.value, "players-positioned"),
  "players-ready",
]);

const currentConfirmStep = computed<GameLobbyStartGameConfirmDialogStep>(() => confirmSteps.value[confirmStepIndex.value]);

function open(): void {
  if (!gameLobbyStartGameConfirmDialog.value) {
    throw createError("Game Lobby Start Game Confirm Dialog is not defined");
  }
  confirmStepIndex.value = 0;
  confirmRequire({
    target: gameLobbyStartGameConfirmDialog.value.$el as HTMLElement,
    position: "bottom",
    accept: confirmStartGame,
  });
}

function confirmStep(): void {
  confirmStepIndex.value++;
}

function confirmStartGame(): void {
  emit("confirmStartGame");
}

function rejectPlayersPositionStep(rejectCallback: () => void): void {
  rejectCallback();
  emit("rejectPlayersPositionStep");
}

defineExpose<GameLobbyStartGameConfirmDialogExposed>({
  open,
});
</script>