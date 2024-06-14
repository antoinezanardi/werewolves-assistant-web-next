<template>
  <VuePrimeFieldset
    id="game-lobby-options-hub-roles-tab-pied-piper"
    :pt="{ 'legend': 'ml-4 !p-3 !px-6' }"
  >
    <template #legend>
      <GameOptionRoleLegend role-name="pied-piper"/>
    </template>

    <GameOptionInputGroup
      id="game-lobby-options-hub-roles-tab-pied-piper-charmed-people-count-per-night-input-group"
      does-have-bottom-divider
      :option-description="piedPiperCharmedPeopleCountPerNightDescription"
      option-icon-class="fa fa-people-line text-pink-500"
      :option-label="$t('components.GameLobbyOptionsHubRolesTabPiedPiper.options.charmedPeopleCountPerNight.label')"
    >
      <VuePrimeFloatLabel>
        <label
          id="game-lobby-options-hub-roles-tab-pied-piper-charmed-people-count-per-night-label"
          for="game-lobby-options-hub-roles-tab-pied-piper-charmed-people-count-per-night-input"
        >
          {{ $t("components.GameLobbyOptionsHubRolesTabPiedPiper.options.charmedPeopleCountPerNight.label") }}
        </label>

        <VuePrimeInputNumber
          id="game-lobby-options-hub-roles-tab-pied-piper-charmed-people-count-per-night-input"
          v-model="piedPiperCharmedPeopleCountPerNightValue"
          class="w-full"
          :max="5"
          :min="1"
        />

        <VuePrimeSlider
          id="game-lobby-options-hub-roles-tab-pied-piper-charmed-people-count-per-night-slider"
          v-model="piedPiperCharmedPeopleCountPerNightValue"
          class="mt-4 w-full"
          :max="5"
          :min="1"
          :step="1"
        />
      </VuePrimeFloatLabel>
    </GameOptionInputGroup>

    <GameOptionInputGroup
      id="game-lobby-options-hub-roles-tab-pied-piper-is-powerless-on-werewolves-side-input-group"
      :option-description="isPiedPiperPowerlessOnWerewolvesSideDescription"
      option-icon-class="fa fa-ban text-red-500"
      :option-label="$t('components.GameLobbyOptionsHubRolesTabPiedPiper.options.isPowerlessOnWerewolvesSide.label')"
    >
      <AffirmativeToggleButton
        id="game-lobby-options-hub-roles-tab-pied-piper-is-powerless-on-werewolves-side-input"
        v-model="isPiedPiperPowerlessOnWerewolvesSideValue"
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

const piedPiperCharmedPeopleCountPerNightValue = computed<number>({
  get: () => createGameDto.value.options.roles.piedPiper.charmedPeopleCountPerNight,
  set: (value: number | null) => {
    if (value === null) {
      return;
    }
    const localCreateGameDto = CreateGameDto.create(createGameDto.value);
    localCreateGameDto.options.roles.piedPiper.charmedPeopleCountPerNight = value;
    setCreateGameDto(localCreateGameDto);
  },
});

const isPiedPiperPowerlessOnWerewolvesSideValue = computed<boolean>({
  get: () => createGameDto.value.options.roles.piedPiper.isPowerlessOnWerewolvesSide,
  set: (value: boolean) => {
    const localCreateGameDto = CreateGameDto.create(createGameDto.value);
    localCreateGameDto.options.roles.piedPiper.isPowerlessOnWerewolvesSide = value;
    setCreateGameDto(localCreateGameDto);
  },
});

const piedPiperCharmedPeopleCountPerNightDescription = computed<string>(() => {
  const tKey = "components.GameLobbyOptionsHubRolesTabPiedPiper.options.charmedPeopleCountPerNight.description";

  return t(tKey, { count: piedPiperCharmedPeopleCountPerNightValue.value });
});

const isPiedPiperPowerlessOnWerewolvesSideDescription = computed<string>(() => {
  const booleanAsAffirmative = convertBooleanAsAffirmativeString(isPiedPiperPowerlessOnWerewolvesSideValue.value);

  return t(`components.GameLobbyOptionsHubRolesTabPiedPiper.options.isPowerlessOnWerewolvesSide.descriptions.${booleanAsAffirmative}`);
});
</script>