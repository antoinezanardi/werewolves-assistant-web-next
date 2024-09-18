<template>
  <PrimeVueFieldset
    id="game-lobby-options-hub-roles-tab-idiot"
    :pt="{ 'legend': FIELD_SETS_LEGEND_CLASSES }"
  >
    <template #legend>
      <GameOptionRoleLegend role-name="idiot"/>
    </template>

    <GameOptionInputGroup
      id="game-lobby-options-hub-roles-tab-idiot-does-die-on-elder-death-input-group"
      :option-description="doesIdiotDieOnElderDeathDescription"
      option-icon="skull-crossbones"
      option-icon-class="text-red-500"
      :option-label="$t('components.GameLobbyOptionsHubRolesTabIdiot.options.doesDieOnElderDeath.label')"
    >
      <AffirmativeToggleButton
        id="game-lobby-options-hub-roles-tab-idiot-does-die-on-elder-death-input"
        v-model="doesIdiotDieOnElderDeathValue"
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

const doesIdiotDieOnElderDeathValue = computed<boolean>({
  get: () => createGameDto.value.options.roles.idiot.doesDieOnElderDeath,
  set: (value: boolean) => {
    const localCreateGameDto = CreateGameDto.create(createGameDto.value);
    localCreateGameDto.options.roles.idiot.doesDieOnElderDeath = value;
    setCreateGameDto(localCreateGameDto);
  },
});

const doesIdiotDieOnElderDeathDescription = computed<string>(() => getGameOptionText("roles.idiot.doesDieOnElderDeath"));
</script>