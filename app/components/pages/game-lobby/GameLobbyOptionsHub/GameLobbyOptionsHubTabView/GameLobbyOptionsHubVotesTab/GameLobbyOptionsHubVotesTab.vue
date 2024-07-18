<template>
  <div id="game-lobby-options-votes-tab">
    <GameOptionInputGroup
      id="game-lobby-options-hub-votes-tab-can-be-skipped-input-group"
      does-have-bottom-divider
      :option-description="canVotesBeSkippedDescription"
      option-icon-class="fa fa-forward text-blue-300"
      :option-label="$t('components.GameLobbyOptionsHubVotesTab.options.canBeSkipped.label')"
    >
      <AffirmativeToggleButton
        id="game-lobby-options-hub-votes-tab-can-be-skipped-input"
        v-model="canVotesBeSkippedValue"
        class="w-full"
      />
    </GameOptionInputGroup>

    <GameOptionInputGroup
      id="game-lobby-options-hub-roles-tab-votes-duration-input-group"
      class="mt-8"
      :option-description="votesDurationDescription"
      option-icon-class="fa fa-clock text-yellow-500"
      :option-label="$t('components.GameLobbyOptionsHubVotesTab.options.duration.label')"
    >
      <PrimeVueFloatLabel>
        <label
          id="game-lobby-options-hub-roles-tab-votes-duration-label"
          for="game-lobby-options-hub-roles-tab-votes-duration-input"
        >
          {{ $t("components.GameLobbyOptionsHubVotesTab.options.duration.label") }}
        </label>

        <PrimeVueInputNumber
          id="game-lobby-options-hub-roles-tab-votes-duration-input"
          v-model="votesDurationValue"
          class="w-full"
          :max="600"
          :min="10"
          :step="5"
        />

        <PrimeVueSlider
          id="game-lobby-options-hub-roles-tab-votes-duration-slider"
          v-model="votesDurationValue"
          class="mt-4 w-full"
          :max="600"
          :min="10"
          :step="5"
        />
      </PrimeVueFloatLabel>
    </GameOptionInputGroup>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import AffirmativeToggleButton from "~/components/shared/buttons/AffirmativeToggleButton/AffirmativeToggleButton.vue";
import GameOptionInputGroup from "~/components/shared/game/game-options/GameOptionInputGroup/GameOptionInputGroup.vue";
import { CreateGameDto } from "~/composables/api/game/dto/create-game/create-game.dto";
import { useStrings } from "~/composables/misc/useStrings";
import { useTimers } from "~/composables/misc/useTimers";
import { useCreateGameDtoStore } from "~/stores/game/create-game-dto/useCreateGameDtoStore";

const createGameDtoStore = useCreateGameDtoStore();
const { setCreateGameDto } = createGameDtoStore;
const { createGameDto } = storeToRefs(createGameDtoStore);

const { getSecondsInMinutesLabel } = useTimers();

const { t } = useI18n();

const { convertBooleanAsAffirmativeString } = useStrings();

const canVotesBeSkippedValue = computed<boolean>({
  get: () => createGameDto.value.options.votes.canBeSkipped,
  set: value => {
    const localCreateGameDto = CreateGameDto.create(createGameDto.value);
    localCreateGameDto.options.votes.canBeSkipped = value;
    setCreateGameDto(localCreateGameDto);
  },
});

const votesDurationValue = computed<number>({
  get: () => createGameDto.value.options.votes.duration,
  set: (value: number | null) => {
    if (value === null) {
      return;
    }
    const localCreateGameDto = CreateGameDto.create(createGameDto.value);
    localCreateGameDto.options.votes.duration = value;
    setCreateGameDto(localCreateGameDto);
  },
});

const canVotesBeSkippedDescription = computed<string>(() => {
  const booleanAsAffirmative = convertBooleanAsAffirmativeString(canVotesBeSkippedValue.value);

  return t(`components.GameLobbyOptionsHubVotesTab.options.canBeSkipped.descriptions.${booleanAsAffirmative}`);
});

const votesDurationDescription = computed<string>(() => {
  const votesDurationInMinutesLabel = getSecondsInMinutesLabel(votesDurationValue.value);

  return t(`components.GameLobbyOptionsHubVotesTab.options.duration.description`, { time: votesDurationInMinutesLabel });
});
</script>