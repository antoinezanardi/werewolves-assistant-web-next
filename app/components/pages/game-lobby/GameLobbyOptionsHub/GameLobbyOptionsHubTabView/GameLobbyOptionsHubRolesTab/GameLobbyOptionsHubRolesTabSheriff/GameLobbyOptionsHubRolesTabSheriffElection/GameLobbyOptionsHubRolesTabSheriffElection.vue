<template>
  <GameOptionInputGroup
    id="game-lobby-options-hub-roles-tab-sheriff-election-input-group"
    :option-description="sheriffElectionTurnDescription"
    option-icon-class="fa fa-clock text-white"
    :option-label="$t('components.GameLobbyOptionsHubRolesTabSheriffElection.options.electedAt.label')"
  >
    <VuePrimeToggleButton
      id="game-lobby-options-hub-roles-tab-sheriff-election-phase-input"
      v-model="sheriffPhaseNameElectionValueAsBoolean"
      class="mb-8 w-full"
      off-icon="fa fa-moon !text-white"
      :off-label="$t('shared.game.phase.night')"
      on-icon="fa fa-sun !text-white"
      :on-label="$t('shared.game.phase.day')"
    />

    <VuePrimeFloatLabel>
      <label
        id="game-lobby-options-hub-roles-tab-sheriff-election-turn-label"
        for="game-lobby-options-hub-roles-tab-sheriff-election-turn-input"
      >
        {{ $t("components.GameLobbyOptionsHubRolesTabSheriffElection.options.electedAt.turn.label") }}
      </label>

      <VuePrimeInputNumber
        id="game-lobby-options-hub-roles-tab-sheriff-election-turn-input"
        v-model="sheriffElectionTurnValue"
        class="w-full"
        :max="10"
        :min="1"
      />
    </VuePrimeFloatLabel>

    <VuePrimeSlider
      id="game-lobby-options-hub-roles-tab-sheriff-election-turn-slider"
      v-model="sheriffElectionTurnValue"
      class="mt-4 w-full"
      :max="10"
      :min="1"
      :step="1"
    />
  </GameOptionInputGroup>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import GameOptionInputGroup from "~/components/shared/game/game-options/GameOptionInputGroup/GameOptionInputGroup.vue";
import { CreateGameDto } from "~/composables/api/game/dto/create-game/create-game.dto";
import { useCreateGameDtoStore } from "~/stores/game/create-game-dto/useCreateGameDtoStore";

const createGameDtoStore = useCreateGameDtoStore();
const { setCreateGameDto } = createGameDtoStore;
const { createGameDto } = storeToRefs(createGameDtoStore);

const { t } = useI18n();

const sheriffElectionTurnValue = computed<number>({
  get: () => createGameDto.value.options.roles.sheriff.electedAt.turn,
  set: (value: number | null) => {
    if (value === null) {
      return;
    }
    const localCreateGameDto = CreateGameDto.create(createGameDto.value);
    localCreateGameDto.options.roles.sheriff.electedAt.turn = value;
    setCreateGameDto(localCreateGameDto);
  },
});

const sheriffPhaseNameElectionValueAsBoolean = computed<boolean>({
  get: () => createGameDto.value.options.roles.sheriff.electedAt.phaseName === "day",
  set: (value: boolean) => {
    const localCreateGameDto = CreateGameDto.create(createGameDto.value);
    localCreateGameDto.options.roles.sheriff.electedAt.phaseName = value ? "day" : "night";
    setCreateGameDto(localCreateGameDto);
  },
});

const sheriffElectionTurnDescription = computed<string>(() => {
  const phaseLabel = t(`shared.game.definitePhase.${createGameDto.value.options.roles.sheriff.electedAt.phaseName}`);

  return t("components.GameLobbyOptionsHubRolesTabSheriffElection.options.electedAt.description", {
    turn: sheriffElectionTurnValue.value,
    phase: phaseLabel.toLowerCase(),
  });
});
</script>