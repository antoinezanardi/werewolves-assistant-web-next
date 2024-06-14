<template>
  <VuePrimeFieldset
    id="game-lobby-options-hub-roles-tab-cupid"
    :pt="{ 'legend': 'ml-4 !p-3 !px-6' }"
  >
    <template #legend>
      <GameOptionRoleLegend role-name="cupid"/>
    </template>

    <GameOptionInputGroup
      id="game-lobby-options-hub-roles-tab-cupid-must-win-with-lovers-input-group"
      does-have-bottom-divider
      :option-description="mustCupidWinWithLoversDescription"
      option-icon-class="fa fa-heart text-red-500"
      :option-label="$t('components.GameLobbyOptionsHubRolesTabCupid.options.mustWinWithLovers.label')"
    >
      <AffirmativeToggleButton
        id="game-lobby-options-hub-roles-tab-cupid-must-win-with-lovers-input"
        v-model="mustCupidWinWithLoversValue"
        class="w-full"
      />
    </GameOptionInputGroup>

    <GameOptionInputGroup
      id="game-lobby-options-hub-roles-tab-cupid-do-lovers-reveal-role-to-each-other-input-group"
      :option-description="doLoversRevealRoleToEachOtherDescription"
      option-icon-class="fa fa-hand-holding-heart text-red-500"
      :option-label="$t('components.GameLobbyOptionsHubRolesTabCupid.options.lovers.doRevealRoleToEachOther.label')"
    >
      <AffirmativeToggleButton
        id="game-lobby-options-hub-roles-tab-cupid-do-lovers-reveal-role-to-each-other-input"
        v-model="doLoversRevealRoleToEachOtherValue"
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

const mustCupidWinWithLoversValue = computed<boolean>({
  get: () => createGameDto.value.options.roles.cupid.mustWinWithLovers,
  set: (value: boolean) => {
    const localCreateGameDto = CreateGameDto.create(createGameDto.value);
    localCreateGameDto.options.roles.cupid.mustWinWithLovers = value;
    setCreateGameDto(localCreateGameDto);
  },
});

const doLoversRevealRoleToEachOtherValue = computed<boolean>({
  get: () => createGameDto.value.options.roles.cupid.lovers.doRevealRoleToEachOther,
  set: (value: boolean) => {
    const localCreateGameDto = CreateGameDto.create(createGameDto.value);
    localCreateGameDto.options.roles.cupid.lovers.doRevealRoleToEachOther = value;
    setCreateGameDto(localCreateGameDto);
  },
});

const mustCupidWinWithLoversDescription = computed<string>(() => {
  const booleanAsAffirmative = convertBooleanAsAffirmativeString(mustCupidWinWithLoversValue.value);

  return t(`components.GameLobbyOptionsHubRolesTabCupid.options.mustWinWithLovers.descriptions.${booleanAsAffirmative}`);
});

const doLoversRevealRoleToEachOtherDescription = computed<string>(() => {
  const booleanAsAffirmative = convertBooleanAsAffirmativeString(doLoversRevealRoleToEachOtherValue.value);

  return t(`components.GameLobbyOptionsHubRolesTabCupid.options.lovers.doRevealRoleToEachOther.descriptions.${booleanAsAffirmative}`);
});
</script>