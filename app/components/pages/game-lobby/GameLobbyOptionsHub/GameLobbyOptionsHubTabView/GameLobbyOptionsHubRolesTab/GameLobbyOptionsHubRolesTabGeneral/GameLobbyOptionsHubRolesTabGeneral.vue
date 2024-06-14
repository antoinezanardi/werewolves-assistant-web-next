<template>
  <VuePrimeFieldset
    id="game-lobby-options-hub-roles-tab-general"
    :pt="{ 'legend': 'ml-4 !p-3 !px-6' }"
  >
    <template #legend>
      <div class="flex gap-4 items-center">
        <RoleImage class="!border-0"/>

        <h2 id="game-lobby-options-hub-roles-tab-general-title">
          {{ $t('components.GameLobbyOptionsHubRolesTabGeneral.general') }}
        </h2>
      </div>
    </template>

    <GameOptionInputGroup
      id="game-lobby-options-hub-roles-tab-general-do-skip-call-if-no-target-input-group"
      does-have-bottom-divider
      :option-description="doSkipCallIfNoTargetDescription"
      option-icon-class="fa fa-forward text-yellow-200"
      :option-label="$t('components.GameLobbyOptionsHubRolesTabGeneral.options.doSkipCallIfNoTarget.label')"
    >
      <AffirmativeToggleButton
        id="game-lobby-options-hub-roles-tab-general-do-skip-call-if-no-target-input"
        v-model="doSkipCallIfNoTargetValue"
        class="w-full"
      />
    </GameOptionInputGroup>

    <GameOptionInputGroup
      id="game-lobby-options-hub-roles-tab-general-are-revealed-on-death-input-group"
      :option-description="areRevealedOnDeathDescription"
      option-icon-class="fa fa-skull text-gray-200"
      :option-label="$t('components.GameLobbyOptionsHubRolesTabGeneral.options.areRevealedOnDeath.label')"
    >
      <AffirmativeToggleButton
        id="game-lobby-options-hub-roles-tab-general-are-revealed-on-death-input"
        v-model="areRevealedOnDeathValue"
        class="w-full"
      />
    </GameOptionInputGroup>
  </VuePrimeFieldset>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import AffirmativeToggleButton from "~/components/shared/buttons/AffirmativeToggleButton/AffirmativeToggleButton.vue";
import GameOptionInputGroup from "~/components/shared/game/game-options/GameOptionInputGroup/GameOptionInputGroup.vue";
import RoleImage from "~/components/shared/role/RoleImage/RoleImage.vue";
import { CreateGameDto } from "~/composables/api/game/dto/create-game/create-game.dto";
import { useStrings } from "~/composables/misc/useStrings";
import { useCreateGameDtoStore } from "~/stores/game/create-game-dto/useCreateGameDtoStore";

const createGameDtoStore = useCreateGameDtoStore();
const { setCreateGameDto } = createGameDtoStore;
const { createGameDto } = storeToRefs(createGameDtoStore);

const { t } = useI18n();

const { convertBooleanAsAffirmativeString } = useStrings();

const doSkipCallIfNoTargetValue = computed<boolean>({
  get: () => createGameDto.value.options.roles.doSkipCallIfNoTarget,
  set: value => {
    const localCreateGameDto = CreateGameDto.create(createGameDto.value);
    localCreateGameDto.options.roles.doSkipCallIfNoTarget = value;
    setCreateGameDto(localCreateGameDto);
  },
});

const areRevealedOnDeathValue = computed<boolean>({
  get: () => createGameDto.value.options.roles.areRevealedOnDeath,
  set: value => {
    const localCreateGameDto = CreateGameDto.create(createGameDto.value);
    localCreateGameDto.options.roles.areRevealedOnDeath = value;
    setCreateGameDto(localCreateGameDto);
  },
});

const doSkipCallIfNoTargetDescription = computed<string>(() => {
  const booleanAsAffirmative = convertBooleanAsAffirmativeString(doSkipCallIfNoTargetValue.value);

  return t(`components.GameLobbyOptionsHubRolesTabGeneral.options.doSkipCallIfNoTarget.descriptions.${booleanAsAffirmative}`);
});

const areRevealedOnDeathDescription = computed<string>(() => {
  const booleanAsAffirmative = convertBooleanAsAffirmativeString(areRevealedOnDeathValue.value);

  return t(`components.GameLobbyOptionsHubRolesTabGeneral.options.areRevealedOnDeath.descriptions.${booleanAsAffirmative}`);
});
</script>