<template>
  <PrimeVueConfirmDialog
    id="game-lobby-start-game-confirm-dialog"
    group="game-lobby-start-game-confirm-dialog"
    :pt="{ 'root': 'w-1/3' }"
  >
    <template #container="{ acceptCallback, rejectCallback }">
      <GameLobbyStartGameConfirmDialogContainer
        id="game-lobby-start-game-confirm-dialog-container"
        :current-confirm-step="currentConfirmStep"
        :reject-callback="rejectCallback"
        @confirm-start-game="acceptCallback"
        @confirm-step="onConfirmStepFromGameLobbyStartGameConfirmDialogContainer"
        @reject-actor-additional-cards-placed-step="onRejectActorAdditionalCardsPlacedStepFromGameLobbyStartGameConfirmDialogContainer"
        @reject-players-position-step="onRejectPlayersPositionStepFromGameLobbyStartGameConfirmDialogContainer"
        @reject-start-game="rejectCallback"
        @reject-thief-additional-cards-placed-step="onRejectThiefAdditionalCardsPlacedStepFromGameLobbyStartGameConfirmDialogContainer"
      />
    </template>
  </PrimeVueConfirmDialog>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useConfirm } from "primevue/useconfirm";
import type { GameLobbyStartGameConfirmDialogEmits, GameLobbyStartGameConfirmDialogExposed, GameLobbyStartGameConfirmDialogStep } from "~/components/pages/game-lobby/GameLobbyFooter/GameLobbyStartGameButton/GameLobbyStartGameConfirmDialog/game-lobby-start-game-confirm-dialog.types";
import GameLobbyStartGameConfirmDialogContainer from "~/components/pages/game-lobby/GameLobbyFooter/GameLobbyStartGameButton/GameLobbyStartGameConfirmDialog/GameLobbyStartGameConfirmDialogContainer/GameLobbyStartGameConfirmDialogContainer.vue";
import { useArrays } from "~/composables/misc/useArrays";
import { useCreateGameDtoStore } from "~/stores/game/create-game-dto/useCreateGameDtoStore";

const emit = defineEmits<GameLobbyStartGameConfirmDialogEmits>();

const confirmStepIndex = ref<number>(0);

const createGameDtoStore = useCreateGameDtoStore();
const { getPlayersWithRoleNameInCreateGameDto } = createGameDtoStore;
const { doesCreateGameDtoContainPositionDependantRoles } = storeToRefs(createGameDtoStore);

const { require: confirmRequire } = useConfirm();

const { insertIf } = useArrays();

const doesCreateGameDtoContainThief = computed<boolean>(() => getPlayersWithRoleNameInCreateGameDto("thief").length > 0);

const doesCreateGameDtoContainActor = computed<boolean>(() => getPlayersWithRoleNameInCreateGameDto("actor").length > 0);

const confirmSteps = computed<GameLobbyStartGameConfirmDialogStep[]>(() => [
  ...insertIf<GameLobbyStartGameConfirmDialogStep>(doesCreateGameDtoContainPositionDependantRoles.value, "players-positioned"),
  ...insertIf<GameLobbyStartGameConfirmDialogStep>(doesCreateGameDtoContainThief.value, "thief-additional-cards-placed"),
  ...insertIf<GameLobbyStartGameConfirmDialogStep>(doesCreateGameDtoContainActor.value, "actor-additional-cards-placed"),
  "players-ready",
]);

const currentConfirmStep = computed<GameLobbyStartGameConfirmDialogStep>(() => confirmSteps.value[confirmStepIndex.value]);

function open(): void {
  confirmStepIndex.value = 0;
  confirmRequire({
    group: "game-lobby-start-game-confirm-dialog",
    position: "bottom",
    accept: confirmStartGame,
  });
}

function onConfirmStepFromGameLobbyStartGameConfirmDialogContainer(): void {
  confirmStepIndex.value++;
}

function confirmStartGame(): void {
  emit("confirmStartGame");
}

function onRejectPlayersPositionStepFromGameLobbyStartGameConfirmDialogContainer(rejectCallback: () => void): void {
  rejectCallback();
  emit("rejectPlayersPositionStep");
}

function onRejectThiefAdditionalCardsPlacedStepFromGameLobbyStartGameConfirmDialogContainer(rejectCallback: () => void): void {
  rejectCallback();
  emit("rejectThiefAdditionalCardsPlacedStep");
}

function onRejectActorAdditionalCardsPlacedStepFromGameLobbyStartGameConfirmDialogContainer(rejectCallback: () => void): void {
  rejectCallback();
  emit("rejectActorAdditionalCardsPlacedStep");
}

defineExpose<GameLobbyStartGameConfirmDialogExposed>({
  open,
});
</script>