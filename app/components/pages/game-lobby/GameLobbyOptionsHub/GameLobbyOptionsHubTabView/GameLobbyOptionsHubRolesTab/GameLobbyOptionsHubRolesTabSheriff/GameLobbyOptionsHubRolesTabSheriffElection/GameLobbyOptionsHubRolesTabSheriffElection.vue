<template>
  <GameOptionInputGroup
    id="game-lobby-options-hub-roles-tab-sheriff-election-input-group"
    :option-description="sheriffElectionTurnDescription"
    option-icon="clock"
    option-icon-class="text-white"
    :option-label="$t('components.GameLobbyOptionsHubRolesTabSheriffElection.options.electedAt.label')"
  >
    <PrimeVueToggleButton
      id="game-lobby-options-hub-roles-tab-sheriff-election-phase-input"
      v-model="sheriffPhaseNameElectionValueAsBoolean"
      class="mb-8 w-full"
      :off-label="$t('shared.game.phase.night')"
      :on-label="$t('shared.game.phase.day')"
    >
      <template #icon>
        <FontAwesomeIcon
          :class="sheriffPhaseNameElectionValueIconAndIconClass.iconClass"
          :icon="sheriffPhaseNameElectionValueIconAndIconClass.icon"
        />
      </template>
    </PrimeVueToggleButton>

    <PrimeVueFloatLabel>
      <label
        id="game-lobby-options-hub-roles-tab-sheriff-election-turn-label"
        for="game-lobby-options-hub-roles-tab-sheriff-election-turn-input"
      >
        {{ $t("components.GameLobbyOptionsHubRolesTabSheriffElection.options.electedAt.turn.label") }}
      </label>

      <PrimeVueInputNumber
        id="game-lobby-options-hub-roles-tab-sheriff-election-turn-input"
        v-model="sheriffElectionTurnValue"
        class="w-full"
        :max="10"
        :min="1"
      />
    </PrimeVueFloatLabel>

    <PrimeVueSlider
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
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { storeToRefs } from "pinia";
import GameOptionInputGroup from "~/components/shared/game/game-options/GameOptionInputGroup/GameOptionInputGroup.vue";
import { CreateGameDto } from "~/composables/api/game/dto/create-game/create-game.dto";
import { useCreateGameDtoStore } from "~/stores/game/create-game-dto/useCreateGameDtoStore";
import type { IconAndIconClass } from "~/utils/types/icon.types";

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

const sheriffPhaseNameElectionValueIconAndIconClass = computed<IconAndIconClass>(() => {
  if (sheriffPhaseNameElectionValueAsBoolean.value) {
    return {
      icon: "fa-sun",
      iconClass: "text-day",
    };
  }
  return {
    icon: "fa-moon",
    iconClass: "text-night",
  };
});

const sheriffElectionTurnDescription = computed<string>(() => {
  const phaseLabel = t(`shared.game.definitePhase.${createGameDto.value.options.roles.sheriff.electedAt.phaseName}`);

  return t("components.GameLobbyOptionsHubRolesTabSheriffElection.options.electedAt.description", {
    turn: sheriffElectionTurnValue.value,
    phase: phaseLabel.toLowerCase(),
  });
});
</script>