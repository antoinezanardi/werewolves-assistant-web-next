<template>
  <div class="confirm-dialog-footer w-full">
    <PrimeVueDivider class="!my-3"/>

    <div class="flex gap-2 items-center justify-between w-full">
      <PrimeVueButton
        id="cancel-button"
        severity="secondary"
        size="small"
        @click.prevent="onRejectStartGame"
      >
        <FontAwesomeIcon
          class="me-2"
          icon="times"
        />

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
        @click.prevent="onConfirmStartGame"
      >
        <FontAwesomeIcon
          id="confirm-button-icon"
          :class="confirmButtonIconAndClasses.iconClass"
          :icon="confirmButtonIconAndClasses.icon"
        />

        <span id="confirm-button-text">
          {{ confirmButtonText }}
        </span>
      </PrimeVueButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import type { GameLobbyStartGameConfirmDialogFooterEmits, GameLobbyStartGameConfirmDialogFooterProps } from "~/components/pages/game-lobby/GameLobbyFooter/GameLobbyStartGameButton/GameLobbyStartGameConfirmDialog/GameLobbyStartGameConfirmDialogContainer/GameLobbyStartGameConfirmDialogFooter/game-lobby-start-game-confirm-dialog-footer.types";
import type { IconAndIconClass } from "~/utils/types/icon.types";

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

const confirmButtonIconAndClasses = computed<IconAndIconClass>(() => {
  if (props.currentConfirmStep === "players-ready") {
    return {
      icon: "play",
      iconClasses: "fa-beat-fade me-4",
    };
  }
  return {
    icon: "forward",
    iconClasses: "me-2",
  };
});

function onConfirmStartGame(): void {
  emit("confirmStartGame");
}

function onRejectStartGame(): void {
  emit("rejectStartGame");
}
</script>