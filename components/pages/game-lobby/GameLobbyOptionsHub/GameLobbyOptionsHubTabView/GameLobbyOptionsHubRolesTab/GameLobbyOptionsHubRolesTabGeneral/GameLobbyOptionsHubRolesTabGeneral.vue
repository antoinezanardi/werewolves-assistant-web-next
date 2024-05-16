<template>
  <VuePrimeFieldset
    id="game-lobby-options-hub-roles-tab-general"
    :pt="{ 'legend': 'ml-4' }"
  >
    <template #legend>
      <div class="flex gap-2 items-center">
        <RoleImage/>

        <h2>
          {{ $t('components.GameLobbyOptionsHubRolesTabGeneral.general') }}
        </h2>
      </div>
    </template>

    <GameOptionInputGroup
      does-have-bottom-divider
      :option-description="doSkipCallIfNoTargetDescription"
      option-icon-class="fa fa-forward text-yellow-200"
      :option-label="$t('components.GameLobbyOptionsHubRolesTabGeneral.options.doSkipCallIfNoTarget.label')"
    >
      <VuePrimeToggleButton
        v-model="doSkipCallIfNoTargetValue"
        class="w-full"
        off-icon="fa fa-thumbs-down !text-white"
        off-label="No"
        on-icon="fa fa-thumbs-up !text-white"
        on-label="Yes"
      />
    </GameOptionInputGroup>

    <GameOptionInputGroup
      :option-description="areRevealedOnDeathDescription"
      option-icon-class="fa fa-skull-crossbones text-yellow-200"
      :option-label="$t('components.GameLobbyOptionsHubRolesTabGeneral.options.areRevealedOnDeath.label')"
    >
      <VuePrimeToggleButton
        v-model="areRevealedOnDeathValue"
        class="w-full"
        off-icon="fa fa-thumbs-down !text-white"
        off-label="No"
        on-icon="fa fa-thumbs-up !text-white"
        on-label="Yes"
      />
    </GameOptionInputGroup>
  </VuePrimeFieldset>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import GameOptionInputGroup from "~/components/shared/game/game-options/GameOptionInputGroup/GameOptionInputGroup.vue";
import RoleImage from "~/components/shared/role/RoleImage/RoleImage.vue";
import { CreateGameDto } from "~/composables/api/game/dto/create-game/create-game.dto";
import { useCreateGameDtoStore } from "~/stores/game/create-game-dto/useCreateGameDtoStore";

const createGameDtoStore = useCreateGameDtoStore();
const { setCreateGameDto } = createGameDtoStore;
const { createGameDto } = storeToRefs(createGameDtoStore);

const { t } = useI18n();

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
  const booleanAsAffirmative = doSkipCallIfNoTargetValue.value ? "yes" : "no";

  return t(`components.GameLobbyOptionsHubRolesTabGeneral.options.doSkipCallIfNoTarget.descriptions.${booleanAsAffirmative}`);
});

const areRevealedOnDeathDescription = computed<string>(() => {
  const booleanAsAffirmative = areRevealedOnDeathValue.value ? "yes" : "no";

  return t(`components.GameLobbyOptionsHubRolesTabGeneral.options.areRevealedOnDeath.descriptions.${booleanAsAffirmative}`);
});
</script>