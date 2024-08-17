<template>
  <div class="confirm-dialog-footer w-full">
    <PrimeVueDivider class="!my-3"/>

    <div class="flex gap-2 items-center justify-between w-full">
      <PrimeVueButton
        id="cancel-button"
        :label="$t('shared.actions.cancel')"
        severity="secondary"
        size="small"
        @click.prevent="onRejectStartGame"
      >
        <template #icon>
          <FontAwesomeIcon
            class="me-2"
            icon="times"
          />
        </template>
      </PrimeVueButton>

      <PrimeVueButton
        id="confirm-button"
        class="!transition-all"
        :class="confirmButtonClasses"
        :label="confirmButtonText"
        severity="secondary"
        size="small"
        @click.prevent="onConfirmStartGame"
      >
        <template #icon>
          <FontAwesomeIcon
            id="confirm-button-icon"
            :class="confirmButtonIconAndClasses.iconClass"
            :icon="confirmButtonIconAndClasses.icon"
          />
        </template>
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
      iconClass: "fa-beat-fade me-4",
    };
  }
  return {
    icon: "forward",
    iconClass: "me-2",
  };
});

function onConfirmStartGame(): void {
  emit("confirmStartGame");
}

function onRejectStartGame(): void {
  emit("rejectStartGame");
}
</script>