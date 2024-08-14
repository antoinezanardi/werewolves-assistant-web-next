<template>
  <div
    id="game-request-another-vote-playground"
    class="flex flex-col items-center justify-center"
  >
    <PrimeVueToggleButton
      id="does-judge-request-another-vote-button"
      v-model="doesJudgeRequestAnotherVote"
      class="w-9rem"
      :off-label="$t('components.GameRequestAnotherVotePlayground.heDoesntRequestAnotherVote')"
      :on-label="$t('components.GameRequestAnotherVotePlayground.heRequestsAnotherVote')"
      @change="onChangeFromDoesJudgeRequestAnotherVoteButton"
    >
      <template #icon>
        <FontAwesomeIcon
          id="does-judge-request-another-vote-button-icon"
          class="me-4 text-white"
          :icon="toggleButtonIcon"
        />
      </template>
    </PrimeVueToggleButton>
  </div>
</template>

<script setup lang="ts">
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { useMakeGamePlayDtoStore } from "~/stores/game/make-game-play-dto/useMakeGamePlayDtoStore";

const makeGamePlayDtoStore = useMakeGamePlayDtoStore();
const { setDoesJudgeRequestAnotherVote } = makeGamePlayDtoStore;

const doesJudgeRequestAnotherVote = ref<boolean>(false);

function onChangeFromDoesJudgeRequestAnotherVoteButton(): void {
  setDoesJudgeRequestAnotherVote(doesJudgeRequestAnotherVote.value);
}

const toggleButtonIcon = computed<string>(() => (doesJudgeRequestAnotherVote.value ? "thumbs-up" : "thumbs-down"));
</script>