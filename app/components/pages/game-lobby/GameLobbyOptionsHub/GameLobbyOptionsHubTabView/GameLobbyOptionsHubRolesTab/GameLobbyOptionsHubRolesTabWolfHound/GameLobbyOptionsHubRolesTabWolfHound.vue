<template>
  <PrimeVueFieldset
    id="game-lobby-options-hub-roles-tab-wolf-hound"
    :pt="{ 'legend': 'ml-4 !p-3 !px-6' }"
  >
    <template #legend>
      <GameOptionRoleLegend role-name="wolf-hound"/>
    </template>

    <GameOptionInputGroup
      id="game-lobby-options-hub-roles-tab-wolf-hound-is-chosen-side-revealed-input-group"
      does-have-bottom-divider
      :option-description="isWolfHoundChosenSideRevealedDescription"
      option-icon-class="fa fa-dog text-red-600"
      :option-label="$t('components.GameLobbyOptionsHubRolesTabWolfHound.options.isChosenSideRevealed.label')"
    >
      <AffirmativeToggleButton
        id="game-lobby-options-hub-roles-tab-wolf-hound-is-chosen-side-revealed-input"
        v-model="isWolfHoundChosenSideRevealedValue"
        class="w-full"
      />
    </GameOptionInputGroup>

    <GameOptionInputGroup
      id="game-lobby-options-hub-roles-tab-wolf-hound-is-side-randomly-chosen-input-group"
      :option-description="isWolfHoundSideRandomlyChosenDescription"
      option-icon-class="fa fa-random text-emerald-500"
      :option-label="$t('components.GameLobbyOptionsHubRolesTabWolfHound.options.isSideRandomlyChosen.label')"
    >
      <AffirmativeToggleButton
        id="game-lobby-options-hub-roles-tab-wolf-hound-is-side-randomly-chosen-input"
        v-model="isWolfHoundSideRandomlyChosenValue"
        class="w-full"
      />
    </GameOptionInputGroup>
  </PrimeVueFieldset>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import AffirmativeToggleButton from "~/components/shared/buttons/AffirmativeToggleButton/AffirmativeToggleButton.vue";
import GameOptionInputGroup from "~/components/shared/game/game-options/GameOptionInputGroup/GameOptionInputGroup.vue";
import GameOptionRoleLegend from "~/components/shared/game/game-options/GameOptionRoleLegend/GameOptionRoleLegend.vue";
import { CreateGameDto } from "~/composables/api/game/dto/create-game/create-game.dto";
import { useStrings } from "~/composables/misc/useStrings";
import { useCreateGameDtoStore } from "~/stores/game/create-game-dto/useCreateGameDtoStore";

const createGameDtoStore = useCreateGameDtoStore();
const { setCreateGameDto } = createGameDtoStore;
const { createGameDto } = storeToRefs(createGameDtoStore);

const { t } = useI18n();

const { convertBooleanAsAffirmativeString } = useStrings();

const isWolfHoundChosenSideRevealedValue = computed<boolean>({
  get: () => createGameDto.value.options.roles.wolfHound.isChosenSideRevealed,
  set: (value: boolean) => {
    const localCreateGameDto = CreateGameDto.create(createGameDto.value);
    localCreateGameDto.options.roles.wolfHound.isChosenSideRevealed = value;
    setCreateGameDto(localCreateGameDto);
  },
});

const isWolfHoundSideRandomlyChosenValue = computed<boolean>({
  get: () => createGameDto.value.options.roles.wolfHound.isSideRandomlyChosen,
  set: (value: boolean) => {
    const localCreateGameDto = CreateGameDto.create(createGameDto.value);
    localCreateGameDto.options.roles.wolfHound.isSideRandomlyChosen = value;
    setCreateGameDto(localCreateGameDto);
  },
});

const isWolfHoundChosenSideRevealedDescription = computed<string>(() => {
  const booleanAsAffirmative = convertBooleanAsAffirmativeString(isWolfHoundChosenSideRevealedValue.value);

  return t(`components.GameLobbyOptionsHubRolesTabWolfHound.options.isChosenSideRevealed.descriptions.${booleanAsAffirmative}`);
});

const isWolfHoundSideRandomlyChosenDescription = computed<string>(() => {
  const booleanAsAffirmative = convertBooleanAsAffirmativeString(isWolfHoundSideRandomlyChosenValue.value);

  return t(`components.GameLobbyOptionsHubRolesTabWolfHound.options.isSideRandomlyChosen.descriptions.${booleanAsAffirmative}`);
});
</script>