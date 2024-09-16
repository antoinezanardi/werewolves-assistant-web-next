<template>
  <PrimeVueFieldset
    id="game-lobby-options-hub-roles-tab-thief"
    :pt="{ 'legend': FIELD_SETS_LEGEND_CLASSES }"
  >
    <template #legend>
      <GameOptionRoleLegend role-name="thief"/>
    </template>

    <GameOptionInputGroup
      id="game-lobby-options-hub-roles-tab-thief-must-choose-between-werewolves-input-group"
      does-have-bottom-divider
      :option-description="mustThiefChooseBetweenWerewolvesDescription"
      option-icon="hands-bound"
      option-icon-class="text-cyan-500"
      :option-label="$t('components.GameLobbyOptionsHubRolesTabThief.options.mustChooseBetweenWerewolves.label')"
    >
      <AffirmativeToggleButton
        id="game-lobby-options-hub-roles-tab-thief-must-choose-between-werewolves-input"
        v-model="mustThiefChooseBetweenWerewolvesValue"
        class="w-full"
      />
    </GameOptionInputGroup>

    <GameOptionInputGroup
      id="game-lobby-options-hub-roles-tab-thief-is-chosen-card-revealed-input-group"
      :option-description="isThiefChosenCardRevealedDescription"
      option-icon="mask"
      option-icon-class="text-cyan-500"
      :option-label="$t('components.GameLobbyOptionsHubRolesTabThief.options.isChosenCardRevealed.label')"
    >
      <AffirmativeToggleButton
        id="game-lobby-options-hub-roles-tab-thief-is-chosen-card-revealed-input"
        v-model="isThiefChosenCardRevealedValue"
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

const mustThiefChooseBetweenWerewolvesValue = computed<boolean>({
  get: () => createGameDto.value.options.roles.thief.mustChooseBetweenWerewolves,
  set: (value: boolean) => {
    const localCreateGameDto = CreateGameDto.create(createGameDto.value);
    localCreateGameDto.options.roles.thief.mustChooseBetweenWerewolves = value;
    setCreateGameDto(localCreateGameDto);
  },
});

const isThiefChosenCardRevealedValue = computed<boolean>({
  get: () => createGameDto.value.options.roles.thief.isChosenCardRevealed,
  set: (value: boolean) => {
    const localCreateGameDto = CreateGameDto.create(createGameDto.value);
    localCreateGameDto.options.roles.thief.isChosenCardRevealed = value;
    setCreateGameDto(localCreateGameDto);
  },
});

const mustThiefChooseBetweenWerewolvesDescription = computed<string>(() => getGameOptionText("roles.thief.mustChooseBetweenWerewolves"));

const isThiefChosenCardRevealedDescription = computed<string>(() => getGameOptionText("roles.thief.isChosenCardRevealed"));
</script>