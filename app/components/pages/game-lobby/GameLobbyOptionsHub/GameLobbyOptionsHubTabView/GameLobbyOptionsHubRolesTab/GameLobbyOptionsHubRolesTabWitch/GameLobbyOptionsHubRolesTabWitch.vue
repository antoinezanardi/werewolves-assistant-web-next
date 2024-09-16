<template>
  <PrimeVueFieldset
    id="game-lobby-options-hub-roles-tab-witch"
    :pt="{ 'legend': FIELD_SETS_LEGEND_CLASSES }"
  >
    <template #legend>
      <GameOptionRoleLegend role-name="witch"/>
    </template>

    <GameOptionInputGroup
      id="game-lobby-options-hub-roles-tab-witch-does-know-werewolves-targets-input-group"
      :option-description="doesWitchKnowWerewolvesTargetsDescription"
      option-icon="wand-sparkles"
      option-icon-class="text-orange-600"
      :option-label="$t('components.GameLobbyOptionsHubRolesTabWitch.options.doesKnowWerewolvesTargets.label')"
    >
      <AffirmativeToggleButton
        id="game-lobby-options-hub-roles-tab-witch-does-know-werewolves-targets-input"
        v-model="doesWitchKnowWerewolvesTargetsValue"
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

const doesWitchKnowWerewolvesTargetsValue = computed<boolean>({
  get: () => createGameDto.value.options.roles.witch.doesKnowWerewolvesTargets,
  set: (value: boolean) => {
    const localCreateGameDto = CreateGameDto.create(createGameDto.value);
    localCreateGameDto.options.roles.witch.doesKnowWerewolvesTargets = value;
    setCreateGameDto(localCreateGameDto);
  },
});

const doesWitchKnowWerewolvesTargetsDescription = computed<string>(() => getGameOptionText("roles.witch.doesKnowWerewolvesTargets"));
</script>