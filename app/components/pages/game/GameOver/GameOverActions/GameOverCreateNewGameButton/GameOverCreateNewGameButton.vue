<template>
  <div id="create-new-game-button-container">
    <PrimeVueConfirmPopup/>

    <PrimeVueButton
      id="create-new-game-button"
      ref="createNewGameButton"
      class="p-button p-button-raised"
      @click="onClickFromCreateNewGameButton"
    >
      <span class="fa fa-play-circle me-2"/>

      <span id="create-new-game-button-text">
        {{ $t('components.GameOverActions.createAnotherGame') }}
      </span>
    </PrimeVueButton>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useConfirm } from "primevue/useconfirm";
import type { ComponentPublicInstance } from "vue";
import { useGameStore } from "~/stores/game/useGameStore";
import { stringify as stringifyForUrl } from "qs";

const createNewGameButton = ref<ComponentPublicInstance | null>(null);

const gameStore = useGameStore();
const { game } = storeToRefs(gameStore);

const { require: confirmRequire } = useConfirm();

const { t } = useI18n();

function onClickFromCreateNewGameButton(): void {
  confirmRequire({
    target: createNewGameButton.value?.$el as HTMLElement,
    icon: "fa fa-question-circle",
    message: t("components.GameOverCreateNewGameButton.createNewGameWithSamePlayers"),
    acceptLabel: t("shared.yes"),
    rejectLabel: t("shared.no"),
    acceptIcon: "fa fa-check",
    rejectIcon: "fa fa-times",
    rejectClass: "p-button-secondary",
    defaultFocus: "accept",
    accept: createNewGameWithSamePlayers,
    reject: createNewGameWithNewPlayers,
  });
}

function createNewGameWithNewPlayers(): void {
  void navigateTo("/game-lobby");
}

function createNewGameWithSamePlayers(): void {
  const playerNames = game.value.players.map(({ name }) => name);
  const query = stringifyForUrl({ playerNames }, { indices: false });
  void navigateTo(`/game-lobby?${query}`);
}
</script>