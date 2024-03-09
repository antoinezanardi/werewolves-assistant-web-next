<template>
  <div
    id="game-request-another-vote-playground"
    class="flex flex-col h-full items-center justify-center"
  >
    <GlowCapture>
      <GlowElement>
        <RoleImage
          class="glow:border-gray-400"
          definition="normal"
          :role-name="RoleNames.STUTTERING_JUDGE"
          sizes="175px"
        />
      </GlowElement>
    </GlowCapture>

    <h3
      id="stuttering-judge-request-question"
      class="my-4"
    >
      {{ $t('components.GameRequestAnotherVotePlayground.doesJudgeRequestAnotherVote') }}
    </h3>

    <VuePrimeToggleButton
      id="does-judge-request-another-vote-button"
      v-model="doesJudgeRequestAnotherVote"
      class="w-9rem"
      off-icon="fa fa-thumbs-down me-4"
      :off-label="$t('components.GameRequestAnotherVotePlayground.heDoesntRequestAnotherVote')"
      on-icon="fa fa-thumbs-up me-4 !text-white"
      :on-label="$t('components.GameRequestAnotherVotePlayground.heRequestsAnotherVote')"
      @change="handleDoesJudgeRequestAnotherVoteChange"
    />
  </div>
</template>

<script setup lang="ts">
import RoleImage from "~/components/shared/role/RoleImage/RoleImage.vue";
import { RoleNames } from "~/composables/api/role/enums/role.enums";
import { useMakeGamePlayDtoStore } from "~/stores/game/make-game-play-dto/useMakeGamePlayDtoStore";

const makeGamePlayDtoStore = useMakeGamePlayDtoStore();
const { setDoesJudgeRequestAnotherVote } = makeGamePlayDtoStore;

const doesJudgeRequestAnotherVote = ref<boolean>(false);

function handleDoesJudgeRequestAnotherVoteChange(): void {
  setDoesJudgeRequestAnotherVote(doesJudgeRequestAnotherVote.value);
}
</script>