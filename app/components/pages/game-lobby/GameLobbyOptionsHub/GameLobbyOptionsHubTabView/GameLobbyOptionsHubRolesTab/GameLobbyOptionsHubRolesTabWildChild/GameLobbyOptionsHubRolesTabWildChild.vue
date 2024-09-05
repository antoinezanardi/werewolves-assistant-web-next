<template>
  <PrimeVueFieldset
    id="game-lobby-options-hub-roles-tab-wild-child"
    :pt="{ 'legend': 'ml-4 !p-3 !px-6' }"
  >
    <template #legend>
      <GameOptionRoleLegend role-name="wild-child"/>
    </template>

    <GameOptionInputGroup
      id="game-lobby-options-hub-roles-tab-wild-child-is-transformation-revealed-input-group"
      :option-description="isWildChildTransformationRevealedDescription"
      option-icon="bullhorn"
      option-icon-class="text-red-600"
      :option-label="$t('components.GameLobbyOptionsHubRolesTabWildChild.options.isTransformationRevealed.label')"
    >
      <AffirmativeToggleButton
        id="game-lobby-options-hub-roles-tab-wild-child-is-transformation-revealed-input"
        v-model="isWildChildTransformationRevealedValue"
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
import { CreateGameDto } from "~/composables/api/game/dto/create-game/create-game.dto";
import { useGameOptionsTexts } from "~/composables/api/game/game-options/useGameOptionsTexts";
import { useCreateGameDtoStore } from "~/stores/game/create-game-dto/useCreateGameDtoStore";

const createGameDtoStore = useCreateGameDtoStore();
const { setCreateGameDto } = createGameDtoStore;
const { createGameDto, createGameOptionsDto } = storeToRefs(createGameDtoStore);

const { getGameOptionText } = useGameOptionsTexts(createGameOptionsDto);

const isWildChildTransformationRevealedValue = computed<boolean>({
  get: () => createGameDto.value.options.roles.wildChild.isTransformationRevealed,
  set: (value: boolean) => {
    const localCreateGameDto = CreateGameDto.create(createGameDto.value);
    localCreateGameDto.options.roles.wildChild.isTransformationRevealed = value;
    setCreateGameDto(localCreateGameDto);
  },
});

const isWildChildTransformationRevealedDescription = computed<string>(() => getGameOptionText("roles.wildChild.isTransformationRevealed"));
</script>