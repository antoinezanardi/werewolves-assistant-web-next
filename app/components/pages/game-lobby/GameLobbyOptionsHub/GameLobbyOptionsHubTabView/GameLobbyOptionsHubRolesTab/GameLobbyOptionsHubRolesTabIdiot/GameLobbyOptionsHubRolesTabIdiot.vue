<template>
  <VuePrimeFieldset
    id="game-lobby-options-hub-roles-tab-idiot"
    :pt="{ 'legend': 'ml-4 !p-3 !px-6' }"
  >
    <template #legend>
      <GameOptionRoleLegend role-name="idiot"/>
    </template>

    <GameOptionInputGroup
      id="game-lobby-options-hub-roles-tab-idiot-does-die-on-elder-death-input-group"
      :option-description="doesIdiotDieOnElderDeathDescription"
      option-icon-class="fa fa-skull-crossbones text-red-500"
      :option-label="$t('components.GameLobbyOptionsHubRolesTabIdiot.options.doesDieOnElderDeath.label')"
    >
      <AffirmativeToggleButton
        id="game-lobby-options-hub-roles-tab-idiot-does-die-on-elder-death-input"
        v-model="doesIdiotDieOnElderDeathValue"
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

const doesIdiotDieOnElderDeathValue = computed<boolean>({
  get: () => createGameDto.value.options.roles.idiot.doesDieOnElderDeath,
  set: (value: boolean) => {
    const localCreateGameDto = CreateGameDto.create(createGameDto.value);
    localCreateGameDto.options.roles.idiot.doesDieOnElderDeath = value;
    setCreateGameDto(localCreateGameDto);
  },
});

const doesIdiotDieOnElderDeathDescription = computed<string>(() => {
  const booleanAsAffirmative = convertBooleanAsAffirmativeString(doesIdiotDieOnElderDeathValue.value);

  return t(`components.GameLobbyOptionsHubRolesTabIdiot.options.doesDieOnElderDeath.descriptions.${booleanAsAffirmative}`);
});
</script>