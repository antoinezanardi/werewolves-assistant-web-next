<template>
  <PrimeVueFieldset
    id="game-lobby-options-hub-roles-tab-fox"
    :pt="{ 'legend': FIELD_SETS_LEGEND_CLASSES }"
  >
    <template #legend>
      <GameOptionRoleLegend role-name="fox"/>
    </template>

    <GameOptionInputGroup
      id="game-lobby-options-hub-roles-tab-fox-is-powerless-if-misses-werewolf-input-group"
      :option-description="isFoxPowerlessIfMissesWerewolfDescription"
      option-icon="ban"
      option-icon-class="text-red-500"
      :option-label="$t('components.GameLobbyOptionsHubRolesTabFox.options.isPowerlessIfMissesWerewolf.label')"
    >
      <AffirmativeToggleButton
        id="game-lobby-options-hub-roles-tab-fox-is-powerless-if-misses-werewolf-input"
        v-model="isFoxPowerlessIfMissesWerewolfValue"
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

const isFoxPowerlessIfMissesWerewolfValue = computed<boolean>({
  get: () => createGameDto.value.options.roles.fox.isPowerlessIfMissesWerewolf,
  set: (value: boolean) => {
    const localCreateGameDto = CreateGameDto.create(createGameDto.value);
    localCreateGameDto.options.roles.fox.isPowerlessIfMissesWerewolf = value;
    setCreateGameDto(localCreateGameDto);
  },
});

const isFoxPowerlessIfMissesWerewolfDescription = computed<string>(() => getGameOptionText("roles.fox.isPowerlessIfMissesWerewolf"));
</script>