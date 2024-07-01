<template>
  <PrimeVueFieldset
    id="game-lobby-options-hub-roles-tab-thief"
    :pt="{ 'legend': 'ml-4 !p-3 !px-6' }"
  >
    <template #legend>
      <GameOptionRoleLegend role-name="thief"/>
    </template>

    <GameOptionInputGroup
      id="game-lobby-options-hub-roles-tab-thief-must-choose-between-werewolves-input-group"
      does-have-bottom-divider
      :option-description="mustThiefChooseBetweenWerewolvesDescription"
      option-icon-class="fa fa-hands-bound text-cyan-500"
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
      option-icon-class="fa fa-mask text-cyan-500"
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
import { CreateGameDto } from "~/composables/api/game/dto/create-game/create-game.dto";
import { useStrings } from "~/composables/misc/useStrings";
import { useCreateGameDtoStore } from "~/stores/game/create-game-dto/useCreateGameDtoStore";

const createGameDtoStore = useCreateGameDtoStore();
const { setCreateGameDto } = createGameDtoStore;
const { createGameDto } = storeToRefs(createGameDtoStore);

const { t } = useI18n();

const { convertBooleanAsAffirmativeString } = useStrings();

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

const mustThiefChooseBetweenWerewolvesDescription = computed<string>(() => {
  const booleanAsAffirmative = convertBooleanAsAffirmativeString(mustThiefChooseBetweenWerewolvesValue.value);

  return t(`components.GameLobbyOptionsHubRolesTabThief.options.mustChooseBetweenWerewolves.descriptions.${booleanAsAffirmative}`);
});

const isThiefChosenCardRevealedDescription = computed<string>(() => {
  const booleanAsAffirmative = convertBooleanAsAffirmativeString(isThiefChosenCardRevealedValue.value);

  return t(`components.GameLobbyOptionsHubRolesTabThief.options.isChosenCardRevealed.descriptions.${booleanAsAffirmative}`);
});
</script>