<template>
  <VuePrimeFieldset
    id="game-lobby-options-hub-roles-tab-actor"
    :pt="{ 'legend': 'ml-4 !p-3 !px-6' }"
  >
    <template #legend>
      <GameOptionRoleLegend role-name="actor"/>
    </template>

    <GameOptionInputGroup
      id="game-lobby-options-hub-roles-tab-actor-is-powerless-on-werewolves-side-input-group"
      :option-description="isActorPowerlessOnWerewolvesSideDescription"
      option-icon-class="fa fa-ban text-red-500"
      :option-label="$t('components.GameLobbyOptionsHubRolesTabActor.options.isPowerlessOnWerewolvesSide.label')"
    >
      <AffirmativeToggleButton
        id="game-lobby-options-hub-roles-tab-actor-is-powerless-on-werewolves-side-input"
        v-model="isActorPowerlessOnWerewolvesSideValue"
        class="w-full"
      />
    </GameOptionInputGroup>
  </VuePrimeFieldset>
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

const isActorPowerlessOnWerewolvesSideValue = computed<boolean>({
  get: () => createGameDto.value.options.roles.actor.isPowerlessOnWerewolvesSide,
  set: (value: boolean) => {
    const localCreateGameDto = CreateGameDto.create(createGameDto.value);
    localCreateGameDto.options.roles.actor.isPowerlessOnWerewolvesSide = value;
    setCreateGameDto(localCreateGameDto);
  },
});

const isActorPowerlessOnWerewolvesSideDescription = computed<string>(() => {
  const booleanAsAffirmative = convertBooleanAsAffirmativeString(isActorPowerlessOnWerewolvesSideValue.value);

  return t(`components.GameLobbyOptionsHubRolesTabActor.options.isPowerlessOnWerewolvesSide.descriptions.${booleanAsAffirmative}`);
});
</script>