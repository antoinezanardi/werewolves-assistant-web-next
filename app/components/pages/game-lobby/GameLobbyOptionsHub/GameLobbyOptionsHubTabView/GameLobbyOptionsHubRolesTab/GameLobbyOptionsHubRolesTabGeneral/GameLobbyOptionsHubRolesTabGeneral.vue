<template>
  <PrimeVueFieldset
    id="game-lobby-options-hub-roles-tab-general"
    :pt="{ 'legend': FIELD_SETS_LEGEND_CLASSES }"
  >
    <template #legend>
      <div class="flex gap-4 items-center">
        <RoleImage
          v-tilt
          class="!border-0"
        />

        <h2 id="game-lobby-options-hub-roles-tab-general-title">
          {{ $t('components.GameLobbyOptionsHubRolesTabGeneral.general') }}
        </h2>
      </div>
    </template>

    <GameOptionInputGroup
      id="game-lobby-options-hub-roles-tab-general-do-skip-call-if-no-target-input-group"
      does-have-bottom-divider
      :option-description="doSkipCallIfNoTargetDescription"
      option-icon="forward"
      option-icon-class="text-yellow-200"
      :option-label="$t('components.GameLobbyOptionsHubRolesTabGeneral.options.doSkipCallIfNoTarget.label')"
    >
      <AffirmativeToggleButton
        id="game-lobby-options-hub-roles-tab-general-do-skip-call-if-no-target-input"
        v-model="doSkipCallIfNoTargetValue"
        class="w-full"
      />
    </GameOptionInputGroup>

    <GameOptionInputGroup
      id="game-lobby-options-hub-roles-tab-general-are-revealed-on-death-input-group"
      :option-description="areRevealedOnDeathDescription"
      option-icon="skull"
      option-icon-class="text-gray-200"
      :option-label="$t('components.GameLobbyOptionsHubRolesTabGeneral.options.areRevealedOnDeath.label')"
    >
      <AffirmativeToggleButton
        id="game-lobby-options-hub-roles-tab-general-are-revealed-on-death-input"
        v-model="areRevealedOnDeathValue"
        class="w-full"
      />
    </GameOptionInputGroup>
  </PrimeVueFieldset>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";

import AffirmativeToggleButton from "~/components/shared/buttons/AffirmativeToggleButton/AffirmativeToggleButton.vue";
import GameOptionInputGroup from "~/components/shared/game/game-options/GameOptionInputGroup/GameOptionInputGroup.vue";
import { FIELD_SETS_LEGEND_CLASSES } from "~/components/shared/inputs/field-sets/field-sets.constants";
import RoleImage from "~/components/shared/role/RoleImage/RoleImage.vue";
import { CreateGameDto } from "~/composables/api/game/dto/create-game/create-game.dto";
import { useGameOptionsTexts } from "~/composables/api/game/game-options/useGameOptionsTexts";
import { useCreateGameDtoStore } from "~/stores/game/create-game-dto/useCreateGameDtoStore";

const createGameDtoStore = useCreateGameDtoStore();
const { setCreateGameDto } = createGameDtoStore;
const { createGameDto, createGameOptionsDto } = storeToRefs(createGameDtoStore);

const { getGameOptionText } = useGameOptionsTexts(createGameOptionsDto);

const doSkipCallIfNoTargetValue = computed<boolean>({
  get: () => createGameDto.value.options.roles.doSkipCallIfNoTarget,
  set: value => {
    const localCreateGameDto = CreateGameDto.create(createGameDto.value);
    localCreateGameDto.options.roles.doSkipCallIfNoTarget = value;
    setCreateGameDto(localCreateGameDto);
  },
});

const areRevealedOnDeathValue = computed<boolean>({
  get: () => createGameDto.value.options.roles.areRevealedOnDeath,
  set: value => {
    const localCreateGameDto = CreateGameDto.create(createGameDto.value);
    localCreateGameDto.options.roles.areRevealedOnDeath = value;
    setCreateGameDto(localCreateGameDto);
  },
});

const doSkipCallIfNoTargetDescription = computed<string>(() => getGameOptionText("roles.doSkipCallIfNoTarget"));

const areRevealedOnDeathDescription = computed<string>(() => getGameOptionText("roles.areRevealedOnDeath"));
</script>