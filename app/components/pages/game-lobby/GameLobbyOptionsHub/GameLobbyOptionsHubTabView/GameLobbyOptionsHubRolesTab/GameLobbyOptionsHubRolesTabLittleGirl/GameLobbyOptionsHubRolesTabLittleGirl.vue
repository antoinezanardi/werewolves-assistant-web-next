<template>
  <VuePrimeFieldset
    id="game-lobby-options-hub-roles-tab-little-girl"
    :pt="{ 'legend': 'ml-4 !p-3 !px-6' }"
  >
    <template #legend>
      <GameOptionRoleLegend role-name="little-girl"/>
    </template>

    <GameOptionInputGroup
      id="game-lobby-options-hub-roles-tab-little-girl-is-protected-by-defender-input-group"
      :option-description="isLittleGirlProtectedByDefenderDescription"
      option-icon-class="fa fa-shield-alt text-blue-500"
      :option-label="$t('components.GameLobbyOptionsHubRolesTabLittleGirl.options.isProtectedByDefender.label')"
    >
      <AffirmativeToggleButton
        id="game-lobby-options-hub-roles-tab-little-girl-is-protected-by-defender-input"
        v-model="isLittleGirlProtectedByDefenderValue"
        class="w-full"
      />
    </GameOptionInputGroup>
  </VuePrimeFieldset>
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

const isLittleGirlProtectedByDefenderValue = computed<boolean>({
  get: () => createGameDto.value.options.roles.littleGirl.isProtectedByDefender,
  set: (value: boolean) => {
    const localCreateGameDto = CreateGameDto.create(createGameDto.value);
    localCreateGameDto.options.roles.littleGirl.isProtectedByDefender = value;
    setCreateGameDto(localCreateGameDto);
  },
});

const isLittleGirlProtectedByDefenderDescription = computed<string>(() => {
  const booleanAsAffirmative = convertBooleanAsAffirmativeString(isLittleGirlProtectedByDefenderValue.value);

  return t(`components.GameLobbyOptionsHubRolesTabLittleGirl.options.isProtectedByDefender.descriptions.${booleanAsAffirmative}`);
});
</script>