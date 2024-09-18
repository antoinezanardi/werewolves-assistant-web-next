<template>
  <PrimeVueFieldset
    id="game-lobby-options-hub-roles-tab-three-brothers"
    :pt="{ 'legend': FIELD_SETS_LEGEND_CLASSES }"
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
      <PrimeVueFloatLabel class="!mt-4 md:!mt-0">
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
import { FIELD_SETS_LEGEND_CLASSES } from "~/components/shared/inputs/field-sets/field-sets.constants";
import { CreateGameDto } from "~/composables/api/game/dto/create-game/create-game.dto";
import { useGameOptionsTexts } from "~/composables/api/game/game-options/useGameOptionsTexts";
import { useCreateGameDtoStore } from "~/stores/game/create-game-dto/useCreateGameDtoStore";

const createGameDtoStore = useCreateGameDtoStore();
const { setCreateGameDto } = createGameDtoStore;
const { createGameDto, createGameOptionsDto } = storeToRefs(createGameDtoStore);

const { getGameOptionText } = useGameOptionsTexts(createGameOptionsDto);

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

const threeBrothersWakingUpIntervalDescription = computed<string>(() => getGameOptionText("roles.threeBrothers.wakingUpInterval"));
</script>