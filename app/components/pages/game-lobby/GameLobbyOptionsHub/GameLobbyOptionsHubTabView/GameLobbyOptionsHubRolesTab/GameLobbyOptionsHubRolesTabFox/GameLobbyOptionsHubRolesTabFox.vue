<template>
  <PrimeVueFieldset
    id="game-lobby-options-hub-roles-tab-fox"
    :pt="{ 'legend': 'ml-4 !p-3 !px-6' }"
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
import { CreateGameDto } from "~/composables/api/game/dto/create-game/create-game.dto";
import { useStrings } from "~/composables/misc/useStrings";
import { useCreateGameDtoStore } from "~/stores/game/create-game-dto/useCreateGameDtoStore";

const createGameDtoStore = useCreateGameDtoStore();
const { setCreateGameDto } = createGameDtoStore;
const { createGameDto } = storeToRefs(createGameDtoStore);

const { t } = useI18n();
const { convertBooleanAsAffirmativeString } = useStrings();

const isFoxPowerlessIfMissesWerewolfValue = computed<boolean>({
  get: () => createGameDto.value.options.roles.fox.isPowerlessIfMissesWerewolf,
  set: (value: boolean) => {
    const localCreateGameDto = CreateGameDto.create(createGameDto.value);
    localCreateGameDto.options.roles.fox.isPowerlessIfMissesWerewolf = value;
    setCreateGameDto(localCreateGameDto);
  },
});

const isFoxPowerlessIfMissesWerewolfDescription = computed<string>(() => {
  const booleanAsAffirmative = convertBooleanAsAffirmativeString(isFoxPowerlessIfMissesWerewolfValue.value);

  return t(`components.GameLobbyOptionsHubRolesTabFox.options.isPowerlessIfMissesWerewolf.descriptions.${booleanAsAffirmative}`);
});
</script>