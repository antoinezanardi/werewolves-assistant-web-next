<template>
  <div id="game-lobby-options-votes-tab">
    <GameOptionInputGroup
      id="game-lobby-options-hub-votes-tab-can-be-skipped-input-group"
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
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import AffirmativeToggleButton from "~/components/shared/buttons/AffirmativeToggleButton/AffirmativeToggleButton.vue";
import GameOptionInputGroup from "~/components/shared/game/game-options/GameOptionInputGroup/GameOptionInputGroup.vue";
import { CreateGameDto } from "~/composables/api/game/dto/create-game/create-game.dto";
import { useStrings } from "~/composables/misc/useStrings";
import { useCreateGameDtoStore } from "~/stores/game/create-game-dto/useCreateGameDtoStore";

const createGameDtoStore = useCreateGameDtoStore();
const { setCreateGameDto } = createGameDtoStore;
const { createGameDto } = storeToRefs(createGameDtoStore);

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

const canVotesBeSkippedDescription = computed<string>(() => {
  const booleanAsAffirmative = convertBooleanAsAffirmativeString(canVotesBeSkippedValue.value);

  return t(`components.GameLobbyOptionsHubVotesTab.options.canBeSkipped.descriptions.${booleanAsAffirmative}`);
});
</script>