<template>
  <PrimeVueFieldset
    id="game-lobby-options-hub-roles-tab-white-werewolf"
    :pt="{ 'legend': 'ml-4 !p-3 !px-6' }"
  >
    <template #legend>
      <GameOptionRoleLegend role-name="white-werewolf"/>
    </template>

    <GameOptionInputGroup
      id="game-lobby-options-hub-roles-tab-white-werewolf-waking-up-interval-input-group"
      :option-description="whiteWerewolfWakingUpIntervalDescription"
      option-icon="clock-rotate-left"
      option-icon-class="text-white"
      :option-label="$t('components.GameLobbyOptionsHubRolesTabWhiteWerewolf.options.wakingUpInterval.label')"
    >
      <PrimeVueFloatLabel>
        <label
          id="game-lobby-options-hub-roles-tab-white-werewolf-waking-up-interval-label"
          for="game-lobby-options-hub-roles-tab-white-werewolf-waking-up-interval-input"
        >
          {{ $t("components.GameLobbyOptionsHubRolesTabWhiteWerewolf.options.wakingUpInterval.label") }}
        </label>

        <PrimeVueInputNumber
          id="game-lobby-options-hub-roles-tab-white-werewolf-waking-up-interval-input"
          v-model="whiteWerewolfWakingUpIntervalValue"
          class="w-full"
          :max="5"
          :min="1"
        />
      </PrimeVueFloatLabel>

      <PrimeVueSlider
        id="game-lobby-options-hub-roles-tab-white-werewolf-waking-up-interval-slider"
        v-model="whiteWerewolfWakingUpIntervalValue"
        class="mt-4 w-full"
        :max="5"
        :min="1"
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

const whiteWerewolfWakingUpIntervalValue = computed<number>({
  get: () => createGameDto.value.options.roles.whiteWerewolf.wakingUpInterval,
  set: (value: number | null) => {
    if (value === null) {
      return;
    }
    const localCreateGameDto = CreateGameDto.create(createGameDto.value);
    localCreateGameDto.options.roles.whiteWerewolf.wakingUpInterval = value;
    setCreateGameDto(localCreateGameDto);
  },
});

const whiteWerewolfWakingUpIntervalDescription = computed<string>(() => {
  const tKey = "components.GameLobbyOptionsHubRolesTabWhiteWerewolf.options.wakingUpInterval.description";

  return t(tKey, { interval: whiteWerewolfWakingUpIntervalValue.value }, whiteWerewolfWakingUpIntervalValue.value);
});
</script>