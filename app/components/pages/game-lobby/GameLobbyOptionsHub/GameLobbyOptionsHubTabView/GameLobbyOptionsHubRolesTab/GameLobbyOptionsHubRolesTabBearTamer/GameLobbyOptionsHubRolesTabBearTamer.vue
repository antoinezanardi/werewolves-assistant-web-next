<template>
  <PrimeVueFieldset
    id="game-lobby-options-hub-roles-tab-bear-tamer"
    :pt="{ 'legend': 'ml-4 !p-3 !px-6' }"
  >
    <template #legend>
      <GameOptionRoleLegend role-name="bear-tamer"/>
    </template>

    <GameOptionInputGroup
      id="game-lobby-options-hub-roles-tab-bear-tamer-does-growl-on-werewolves-side-input-group"
      :option-description="doesBearTamerGrowlOnWerewolvesSideDescription"
      option-icon-class="fa fa-paw text-amber-700"
      :option-label="$t('components.GameLobbyOptionsHubRolesTabBearTamer.options.doesGrowlOnWerewolvesSide.label')"
    >
      <AffirmativeToggleButton
        id="game-lobby-options-hub-roles-tab-bear-tamer-does-growl-on-werewolves-side-input"
        v-model="doesBearTamerGrowlOnWerewolvesSideValue"
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

const doesBearTamerGrowlOnWerewolvesSideValue = computed<boolean>({
  get: () => createGameDto.value.options.roles.bearTamer.doesGrowlOnWerewolvesSide,
  set: (value: boolean) => {
    const localCreateGameDto = CreateGameDto.create(createGameDto.value);
    localCreateGameDto.options.roles.bearTamer.doesGrowlOnWerewolvesSide = value;
    setCreateGameDto(localCreateGameDto);
  },
});

const doesBearTamerGrowlOnWerewolvesSideDescription = computed<string>(() => {
  const booleanAsAffirmative = convertBooleanAsAffirmativeString(doesBearTamerGrowlOnWerewolvesSideValue.value);

  return t(`components.GameLobbyOptionsHubRolesTabBearTamer.options.doesGrowlOnWerewolvesSide.descriptions.${booleanAsAffirmative}`);
});
</script>