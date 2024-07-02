<template>
  <PrimeVueFieldset
    id="game-lobby-options-hub-roles-tab-witch"
    :pt="{ 'legend': 'ml-4 !p-3 !px-6' }"
  >
    <template #legend>
      <GameOptionRoleLegend role-name="witch"/>
    </template>

    <GameOptionInputGroup
      id="game-lobby-options-hub-roles-tab-witch-does-know-werewolves-targets-input-group"
      :option-description="doesWitchKnowWerewolvesTargetsDescription"
      option-icon-class="fa fa-wand-sparkles text-orange-600"
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
import { CreateGameDto } from "~/composables/api/game/dto/create-game/create-game.dto";
import { useStrings } from "~/composables/misc/useStrings";
import { useCreateGameDtoStore } from "~/stores/game/create-game-dto/useCreateGameDtoStore";

const createGameDtoStore = useCreateGameDtoStore();
const { setCreateGameDto } = createGameDtoStore;
const { createGameDto } = storeToRefs(createGameDtoStore);

const { t } = useI18n();

const { convertBooleanAsAffirmativeString } = useStrings();

const doesWitchKnowWerewolvesTargetsValue = computed<boolean>({
  get: () => createGameDto.value.options.roles.witch.doesKnowWerewolvesTargets,
  set: (value: boolean) => {
    const localCreateGameDto = CreateGameDto.create(createGameDto.value);
    localCreateGameDto.options.roles.witch.doesKnowWerewolvesTargets = value;
    setCreateGameDto(localCreateGameDto);
  },
});

const doesWitchKnowWerewolvesTargetsDescription = computed<string>(() => {
  const booleanAsAffirmative = convertBooleanAsAffirmativeString(doesWitchKnowWerewolvesTargetsValue.value);

  return t(`components.GameLobbyOptionsHubRolesTabWitch.options.doesKnowWerewolvesTargets.descriptions.${booleanAsAffirmative}`);
});
</script>