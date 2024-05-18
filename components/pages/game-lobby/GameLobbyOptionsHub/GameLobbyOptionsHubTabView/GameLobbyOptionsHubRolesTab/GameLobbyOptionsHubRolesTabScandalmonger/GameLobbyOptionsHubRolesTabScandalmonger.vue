<template>
  <VuePrimeFieldset
    id="game-lobby-options-hub-roles-tab-scandalmonger"
    :pt="{ 'legend': 'ml-4 !p-3 !px-6' }"
  >
    <template #legend>
      <GameOptionRoleLegend role-name="scandalmonger"/>
    </template>

    <GameOptionInputGroup
      id="game-lobby-options-hub-roles-tab-scandalmonger-mark-penalty-input-group"
      :option-description="scandalmongerMarkPenaltyDescription"
      option-icon-class="fa fa-feather text-cyan-700"
      :option-label="$t('components.GameLobbyOptionsHubRolesTabScandalmonger.options.markPenalty.label')"
    >
      <VuePrimeFloatLabel>
        <label
          id="game-lobby-options-hub-roles-tab-scandalmonger-mark-penalty-label"
          for="game-lobby-options-hub-roles-tab-scandalmonger-mark-penalty-input"
        >
          {{ $t("components.GameLobbyOptionsHubRolesTabScandalmonger.options.markPenalty.label") }}
        </label>

        <VuePrimeInputNumber
          id="game-lobby-options-hub-roles-tab-scandalmonger-mark-penalty-input"
          v-model="scandalmongerMarkPenaltyValue"
          class="w-full"
          :max="5"
          :min="1"
        />

        <VuePrimeSlider
          id="game-lobby-options-hub-roles-tab-scandalmonger-mark-penalty-slider"
          v-model="scandalmongerMarkPenaltyValue"
          class="mt-4 w-full"
          :max="5"
          :min="1"
          :step="1"
        />
      </VuePrimeFloatLabel>
    </GameOptionInputGroup>
  </VuePrimeFieldset>
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

const scandalmongerMarkPenaltyValue = computed<number>({
  get: () => createGameDto.value.options.roles.scandalmonger.markPenalty,
  set: (value: number | null) => {
    if (value === null) {
      return;
    }
    const localCreateGameDto = CreateGameDto.create(createGameDto.value);
    localCreateGameDto.options.roles.scandalmonger.markPenalty = value;
    setCreateGameDto(localCreateGameDto);
  },
});

const scandalmongerMarkPenaltyDescription = computed<string>(() => {
  const tKey = "components.GameLobbyOptionsHubRolesTabScandalmonger.options.markPenalty.description";

  return t(tKey, { markPenalty: scandalmongerMarkPenaltyValue.value }, scandalmongerMarkPenaltyValue.value);
});
</script>