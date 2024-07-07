<template>
  <div class="confirm-dialog-footer w-full">
    <PrimeVueDivider class="!my-3"/>

    <div class="flex gap-2 items-center justify-between w-full">
      <PrimeVueButton
        id="cancel-button"
        severity="secondary"
        size="small"
        @click="onRejectStartGame"
      >
        <i class="fa fa-times me-2"/>

        <span id="cancel-button-text">
          {{ $t("shared.actions.cancel") }}
        </span>
      </PrimeVueButton>

      <PrimeVueButton
        id="confirm-button"
        class="!transition-all"
        :class="confirmButtonClasses"
        severity="secondary"
        size="small"
        @click="onConfirmStartGame"
      >
        <i
          id="confirm-button-icon"
          :class="confirmButtonIconClasses"
        />

        <span id="confirm-button-text">
          {{ confirmButtonText }}
        </span>
      </PrimeVueButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { GameLobbyStartGameConfirmDialogFooterEmits, GameLobbyStartGameConfirmDialogFooterProps } from "~/components/pages/game-lobby/GameLobbyFooter/GameLobbyStartGameButton/GameLobbyStartGameConfirmDialog/GameLobbyStartGameConfirmDialogContainer/GameLobbyStartGameConfirmDialogFooter/game-lobby-start-game-confirm-dialog-footer.types";

const props = defineProps<GameLobbyStartGameConfirmDialogFooterProps>();

const emit = defineEmits<GameLobbyStartGameConfirmDialogFooterEmits>();

const { t } = useI18n();

const confirmButtonClasses = computed<Record<string, boolean>>(() => ({
  "grow uppercase p-button-success justify-center p-button-lg": props.currentConfirmStep === "players-ready",
}));

const confirmButtonText = computed<string>(() => {
  if (props.currentConfirmStep === "players-ready") {
    return t("components.GameLobbyStartGameConfirmDialogFooter.letsGo");
  }
  return t("components.GameLobbyStartGameConfirmDialogFooter.skipAndPlay");
});

const confirmButtonIconClasses = computed<string>(() => {
  if (props.currentConfirmStep === "players-ready") {
    return "fa fa-beat-fade fa-play me-4";
  }
  return "fa fa-forward me-2";
});

function onConfirmStartGame(): void {
  emit("confirmStartGame");
}

function onRejectStartGame(): void {
  emit("rejectStartGame");
}
</script>