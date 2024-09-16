<template>
  <PrimeVueFieldset
    id="game-lobby-options-hub-roles-tab-prejudiced-manipulator"
    :pt="{ 'legend': FIELD_SETS_LEGEND_CLASSES }"
  >
    <template #legend>
      <GameOptionRoleLegend role-name="prejudiced-manipulator"/>
    </template>

    <GameOptionInputGroup
      id="game-lobby-options-hub-roles-tab-prejudiced-manipulator-is-powerless-on-werewolves-side-input-group"
      :option-description="isPrejudicedManipulatorPowerlessOnWerewolvesSideDescription"
      option-icon="ban"
      option-icon-class="text-red-500"
      :option-label="$t('components.GameLobbyOptionsHubRolesTabPrejudicedManipulator.options.isPowerlessOnWerewolvesSide.label')"
    >
      <AffirmativeToggleButton
        id="game-lobby-options-hub-roles-tab-prejudiced-manipulator-is-powerless-on-werewolves-side-input"
        v-model="isPrejudicedManipulatorPowerlessOnWerewolvesSideValue"
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
import { FIELD_SETS_LEGEND_CLASSES } from "~/components/shared/inputs/field-sets/field-sets.constants";
import { CreateGameDto } from "~/composables/api/game/dto/create-game/create-game.dto";
import { useGameOptionsTexts } from "~/composables/api/game/game-options/useGameOptionsTexts";
import { useCreateGameDtoStore } from "~/stores/game/create-game-dto/useCreateGameDtoStore";

const createGameDtoStore = useCreateGameDtoStore();
const { setCreateGameDto } = createGameDtoStore;
const { createGameDto, createGameOptionsDto } = storeToRefs(createGameDtoStore);

const { getGameOptionText } = useGameOptionsTexts(createGameOptionsDto);

const isPrejudicedManipulatorPowerlessOnWerewolvesSideValue = computed<boolean>({
  get: () => createGameDto.value.options.roles.prejudicedManipulator.isPowerlessOnWerewolvesSide,
  set: (value: boolean) => {
    const localCreateGameDto = CreateGameDto.create(createGameDto.value);
    localCreateGameDto.options.roles.prejudicedManipulator.isPowerlessOnWerewolvesSide = value;
    setCreateGameDto(localCreateGameDto);
  },
});

const isPrejudicedManipulatorPowerlessOnWerewolvesSideDescription = computed<string>(() => getGameOptionText("roles.prejudicedManipulator.isPowerlessOnWerewolvesSide"));
</script>