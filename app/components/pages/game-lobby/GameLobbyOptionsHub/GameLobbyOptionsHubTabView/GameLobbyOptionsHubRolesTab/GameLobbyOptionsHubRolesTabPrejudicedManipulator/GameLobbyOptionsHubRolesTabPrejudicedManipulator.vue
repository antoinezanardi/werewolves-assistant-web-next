<template>
  <VuePrimeFieldset
    id="game-lobby-options-hub-roles-tab-prejudiced-manipulator"
    :pt="{ 'legend': 'ml-4 !p-3 !px-6' }"
  >
    <template #legend>
      <GameOptionRoleLegend role-name="prejudiced-manipulator"/>
    </template>

    <GameOptionInputGroup
      id="game-lobby-options-hub-roles-tab-prejudiced-manipulator-is-powerless-on-werewolves-side-input-group"
      :option-description="isPrejudicedManipulatorPowerlessOnWerewolvesSideDescription"
      option-icon-class="fa fa-ban text-red-500"
      :option-label="$t('components.GameLobbyOptionsHubRolesTabPrejudicedManipulator.options.isPowerlessOnWerewolvesSide.label')"
    >
      <AffirmativeToggleButton
        id="game-lobby-options-hub-roles-tab-prejudiced-manipulator-is-powerless-on-werewolves-side-input"
        v-model="isPrejudicedManipulatorPowerlessOnWerewolvesSideValue"
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

const isPrejudicedManipulatorPowerlessOnWerewolvesSideValue = computed<boolean>({
  get: () => createGameDto.value.options.roles.prejudicedManipulator.isPowerlessOnWerewolvesSide,
  set: (value: boolean) => {
    const localCreateGameDto = CreateGameDto.create(createGameDto.value);
    localCreateGameDto.options.roles.prejudicedManipulator.isPowerlessOnWerewolvesSide = value;
    setCreateGameDto(localCreateGameDto);
  },
});

const isPrejudicedManipulatorPowerlessOnWerewolvesSideDescription = computed<string>(() => {
  const booleanAsAffirmative = convertBooleanAsAffirmativeString(isPrejudicedManipulatorPowerlessOnWerewolvesSideValue.value);

  return t(`components.GameLobbyOptionsHubRolesTabPrejudicedManipulator.options.isPowerlessOnWerewolvesSide.descriptions.${booleanAsAffirmative}`);
});
</script>