<template>
  <PrimeVueFieldset
    id="game-lobby-options-hub-roles-tab-werewolf"
    :pt="{ 'legend': FIELD_SETS_LEGEND_CLASSES }"
  >
    <template #legend>
      <GameOptionRoleLegend role-name="werewolf"/>
    </template>

    <GameOptionInputGroup
      id="game-lobby-options-hub-roles-tab-werewolf-can-eat-each-other-input-group"
      :option-description="canWerewolfEatEachOtherDescription"
      option-icon="utensils"
      option-icon-class="text-gray-500"
      :option-label="$t('components.GameLobbyOptionsHubRolesTabWerewolf.options.canEatEachOther.label')"
    >
      <AffirmativeToggleButton
        id="game-lobby-options-hub-roles-tab-werewolf-can-eat-each-other-input"
        v-model="canWerewolfEatEachOtherValue"
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

const canWerewolfEatEachOtherValue = computed<boolean>({
  get: () => createGameDto.value.options.roles.werewolf.canEatEachOther,
  set: (value: boolean) => {
    const localCreateGameDto = CreateGameDto.create(createGameDto.value);
    localCreateGameDto.options.roles.werewolf.canEatEachOther = value;
    setCreateGameDto(localCreateGameDto);
  },
});

const canWerewolfEatEachOtherDescription = computed<string>(() => getGameOptionText("roles.werewolf.canEatEachOther"));
</script>