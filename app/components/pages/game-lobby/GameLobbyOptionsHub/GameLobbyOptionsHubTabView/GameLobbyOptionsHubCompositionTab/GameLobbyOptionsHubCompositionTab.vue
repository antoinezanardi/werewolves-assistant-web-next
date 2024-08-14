<template>
  <div id="game-lobby-options-composition-tab">
    <GameOptionInputGroup
      id="game-lobby-options-hub-composition-tab-is-hidden-input-group"
      :option-description="isCompositionHiddenDescription"
      option-icon="eye-slash"
      option-icon-class="text-emerald-400"
      :option-label="$t('components.GameLobbyOptionsHubCompositionTab.options.isHidden.label')"
    >
      <AffirmativeToggleButton
        id="game-lobby-options-hub-composition-tab-is-hidden-input"
        v-model="isCompositionHiddenValue"
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

const isCompositionHiddenValue = computed<boolean>({
  get: () => createGameDto.value.options.composition.isHidden,
  set: value => {
    const localCreateGameDto = CreateGameDto.create(createGameDto.value);
    localCreateGameDto.options.composition.isHidden = value;
    setCreateGameDto(localCreateGameDto);
  },
});

const isCompositionHiddenDescription = computed<string>(() => {
  const booleanAsAffirmative = convertBooleanAsAffirmativeString(isCompositionHiddenValue.value);

  return t(`components.GameLobbyOptionsHubCompositionTab.options.isHidden.descriptions.${booleanAsAffirmative}`);
});
</script>