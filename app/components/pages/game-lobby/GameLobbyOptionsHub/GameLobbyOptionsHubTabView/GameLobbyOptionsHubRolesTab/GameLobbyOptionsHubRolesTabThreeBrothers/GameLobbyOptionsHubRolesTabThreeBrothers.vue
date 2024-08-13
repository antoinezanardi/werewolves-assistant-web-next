<template>
  <PrimeVueFieldset
    id="game-lobby-options-hub-roles-tab-three-brothers"
    :pt="{ 'legend': 'ml-4 !p-3 !px-6' }"
  >
    <template #legend>
      <GameOptionRoleLegend role-name="three-brothers"/>
    </template>

    <GameOptionInputGroup
      id="game-lobby-options-hub-roles-tab-three-brothers-waking-up-interval-input-group"
      :option-description="threeBrothersWakingUpIntervalDescription"
      option-icon="clock-rotate-left"
      option-icon-class="text-blue-400"
      :option-label="$t('components.GameLobbyOptionsHubRolesTabThreeBrothers.options.wakingUpInterval.label')"
    >
      <PrimeVueFloatLabel>
        <label
          id="game-lobby-options-hub-roles-tab-three-brothers-waking-up-interval-label"
          for="game-lobby-options-hub-roles-tab-three-brothers-waking-up-interval-input"
        >
          {{ $t("components.GameLobbyOptionsHubRolesTabThreeBrothers.options.wakingUpInterval.label") }}
        </label>

        <PrimeVueInputNumber
          id="game-lobby-options-hub-roles-tab-three-brothers-waking-up-interval-input"
          v-model="threeBrothersWakingUpIntervalValue"
          class="w-full"
          :max="5"
          :min="0"
        />
      </PrimeVueFloatLabel>

      <PrimeVueSlider
        id="game-lobby-options-hub-roles-tab-three-brothers-waking-up-interval-slider"
        v-model="threeBrothersWakingUpIntervalValue"
        class="mt-4 w-full"
        :max="5"
        :min="0"
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

const threeBrothersWakingUpIntervalValue = computed<number>({
  get: () => createGameDto.value.options.roles.threeBrothers.wakingUpInterval,
  set: (value: number | null) => {
    if (value === null) {
      return;
    }
    const localCreateGameDto = CreateGameDto.create(createGameDto.value);
    localCreateGameDto.options.roles.threeBrothers.wakingUpInterval = value;
    setCreateGameDto(localCreateGameDto);
  },
});

const threeBrothersWakingUpIntervalDescription = computed<string>(() => {
  const tKey = "components.GameLobbyOptionsHubRolesTabThreeBrothers.options.wakingUpInterval.description";

  return t(tKey, { interval: threeBrothersWakingUpIntervalValue.value }, threeBrothersWakingUpIntervalValue.value);
});
</script>