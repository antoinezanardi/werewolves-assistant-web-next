<template>
  <PrimeVueFieldset
    id="game-lobby-options-hub-roles-tab-stuttering-judge"
    :pt="{ 'legend': 'ml-4 !p-3 !px-6' }"
  >
    <template #legend>
      <GameOptionRoleLegend role-name="stuttering-judge"/>
    </template>

    <GameOptionInputGroup
      id="game-lobby-options-hub-roles-tab-stuttering-judge-vote-requests-count-input-group"
      :option-description="stutteringJudgeVoteRequestsCountDescription"
      option-icon-class="fa fa-gavel text-cyan-300"
      :option-label="$t('components.GameLobbyOptionsHubRolesTabStutteringJudge.options.voteRequestsCount.label')"
    >
      <PrimeVueFloatLabel>
        <label
          id="game-lobby-options-hub-roles-tab-stuttering-judge-vote-requests-count-label"
          for="game-lobby-options-hub-roles-tab-stuttering-judge-vote-requests-count-input"
        >
          {{ $t("components.GameLobbyOptionsHubRolesTabStutteringJudge.options.voteRequestsCount.label") }}
        </label>

        <PrimeVueInputNumber
          id="game-lobby-options-hub-roles-tab-stuttering-judge-vote-requests-count-input"
          v-model="stutteringJudgeVoteRequestsCountValue"
          class="w-full"
          :max="5"
          :min="1"
        />
      </PrimeVueFloatLabel>

      <PrimeVueSlider
        id="game-lobby-options-hub-roles-tab-stuttering-judge-vote-requests-count-slider"
        v-model="stutteringJudgeVoteRequestsCountValue"
        class="mt-4 w-full"
        :max="5"
        :min="1"
        :step="1"
      />
    </GameOptionInputGroup>
  </PrimeVueFieldset>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import GameOptionInputGroup from "~/components/shared/game/game-options/GameOptionInputGroup/GameOptionInputGroup.vue";
import GameOptionRoleLegend from "~/components/shared/game/game-options/GameOptionRoleLegend/GameOptionRoleLegend.vue";
import { CreateGameDto } from "~/composables/api/game/dto/create-game/create-game.dto";
import { useCreateGameDtoStore } from "~/stores/game/create-game-dto/useCreateGameDtoStore";

const createGameDtoStore = useCreateGameDtoStore();
const { setCreateGameDto } = createGameDtoStore;
const { createGameDto } = storeToRefs(createGameDtoStore);

const { t } = useI18n();

const stutteringJudgeVoteRequestsCountValue = computed<number>({
  get: () => createGameDto.value.options.roles.stutteringJudge.voteRequestsCount,
  set: (value: number | null) => {
    if (value === null) {
      return;
    }
    const localCreateGameDto = CreateGameDto.create(createGameDto.value);
    localCreateGameDto.options.roles.stutteringJudge.voteRequestsCount = value;
    setCreateGameDto(localCreateGameDto);
  },
});

const stutteringJudgeVoteRequestsCountDescription = computed<string>(() => {
  const tKey = "components.GameLobbyOptionsHubRolesTabStutteringJudge.options.voteRequestsCount.description";

  return t(tKey, { count: stutteringJudgeVoteRequestsCountValue.value });
});
</script>