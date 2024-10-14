<template>
  <PrimeVueDialog
    id="game-feedback-submitter"
    block-scroll
    :closable="canDialogBeDismissed"
    :close-on-escape="canDialogBeDismissed"
    :dismissable-mask="canDialogBeDismissed"
    :draggable="false"
    modal
    :pt="{
      'icons': 'pb-2',
      'header': '!py-2',
      'content': 'w-x-screen-9/10 max-w-x-screen-9/10 !py-0',
      'footer': '!py-2'
    }"
    :visible="isVisible"
    @update:visible="close"
  >
    <template #header>
      <DialogHeaderTitleOnly
        id="game-feedback-submitter-header"
        icon="star"
        icon-class="text-info"
        :title="$t('components.GameFeedbackSubmitter.gameFeedback')"
      />
    </template>

    <template #default>
      <GameFeedbackSubmitterContent
        id="game-feedback-submitter-content"
        v-model="createGameFeedbackDto"
      />
    </template>

    <template #footer>
      <GameFeedbackSubmitterFooter
        id="game-feedback-submitter-footer"
        :create-game-feedback-dto="createGameFeedbackDto"
        @close-dialog="close"
      />
    </template>
  </PrimeVueDialog>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";

import GameFeedbackSubmitterContent from "~/components/pages/game/GameFeedbackSubmitter/GameFeedbackSubmitterContent/GameFeedbackSubmitterContent.vue";
import GameFeedbackSubmitterFooter from "~/components/pages/game/GameFeedbackSubmitter/GameFeedbackSubmitterFooter/GameFeedbackSubmitterFooter.vue";
import DialogHeaderTitleOnly from "~/components/shared/dialogs/DialogHeaderTitleOnly/DialogHeaderTitleOnly.vue";
import { CreateGameFeedbackDto } from "~/composables/api/game/dto/create-game-feedback/create-game-feedback.dto";
import { useGameStore } from "~/stores/game/useGameStore";

const gameStore = useGameStore();
const { creatingGameFeedbackStatus } = storeToRefs(gameStore);

const isVisible = ref<boolean>(false);

const defaultCreateGameFeedbackDto: Readonly<CreateGameFeedbackDto> = {
  score: 0,
  hasEncounteredError: false,
} as const;

const createGameFeedbackDto = ref<CreateGameFeedbackDto>(CreateGameFeedbackDto.create(defaultCreateGameFeedbackDto));

const canDialogBeDismissed = computed<boolean>(() => creatingGameFeedbackStatus.value !== "pending");

function resetCreateGameFeedbackDto(): void {
  createGameFeedbackDto.value = CreateGameFeedbackDto.create(defaultCreateGameFeedbackDto);
}

function showGameFeedbackSubmitter(): void {
  resetCreateGameFeedbackDto();
  isVisible.value = true;
}

function close(): void {
  isVisible.value = false;
}

defineExpose({ showGameFeedbackSubmitter });
</script>