<template>
  <PrimeVueFieldset
    id="game-lobby-options-hub-roles-tab-big-bad-wolf"
    :pt="{ 'legend': 'ml-4 !p-3 !px-6' }"
  >
    <template #legend>
      <GameOptionRoleLegend role-name="big-bad-wolf"/>
    </template>

    <GameOptionInputGroup
      id="game-lobby-options-hub-roles-tab-big-bad-wolf-is-powerless-if-werewolf-dies-input-group"
      :option-description="isBigBadWolfPowerlessIfWerewolfDiesDescription"
      option-icon="ban"
      option-icon-class="text-red-700"
      :option-label="$t('components.GameLobbyOptionsHubRolesTabBigBadWolf.options.isPowerlessIfWerewolfDies.label')"
    >
      <AffirmativeToggleButton
        id="game-lobby-options-hub-roles-tab-big-bad-wolf-is-powerless-if-werewolf-dies-input"
        v-model="isBigBadWolfPowerlessIfWerewolfDiesValue"
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

const isBigBadWolfPowerlessIfWerewolfDiesValue = computed<boolean>({
  get: () => createGameDto.value.options.roles.bigBadWolf.isPowerlessIfWerewolfDies,
  set: (value: boolean) => {
    const localCreateGameDto = CreateGameDto.create(createGameDto.value);
    localCreateGameDto.options.roles.bigBadWolf.isPowerlessIfWerewolfDies = value;
    setCreateGameDto(localCreateGameDto);
  },
});

const isBigBadWolfPowerlessIfWerewolfDiesDescription = computed<string>(() => {
  const booleanAsAffirmative = convertBooleanAsAffirmativeString(isBigBadWolfPowerlessIfWerewolfDiesValue.value);

  return t(`components.GameLobbyOptionsHubRolesTabBigBadWolf.options.isPowerlessIfWerewolfDies.descriptions.${booleanAsAffirmative}`);
});
</script>