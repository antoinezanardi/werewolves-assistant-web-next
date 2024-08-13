<template>
  <div id="create-new-game-button-container">
    <PrimeVueConfirmPopup>
      <template #icon>
        <FontAwesomeIcon icon="fa-regular fa-question-circle"/>
      </template>

      <template #confirmIcon>
        <FontAwesomeIcon icon="check"/>
      </template>

      <template #rejectIcon>
        <FontAwesomeIcon icon="times"/>
      </template>
    </PrimeVueConfirmPopup>

    <PrimeVueButton
      id="create-new-game-button"
      ref="createNewGameButton"
      class="p-button p-button-raised"
      @click="onClickFromCreateNewGameButton"
    >
      <FontAwesomeIcon
        class="me-2"
        icon="play-circle"
      />

      <span id="create-new-game-button-text">
        {{ $t('components.GameOverActions.createAnotherGame') }}
      </span>
    </PrimeVueButton>
  </div>
</template>

<script setup lang="ts">
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
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
    message: t("components.GameOverCreateNewGameButton.createNewGameWithSamePlayers"),
    acceptLabel: t("shared.yes"),
    rejectLabel: t("shared.no"),
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