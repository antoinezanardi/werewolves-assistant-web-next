<template>
  <VuePrimeFieldset
    id="game-lobby-options-hub-roles-tab-seer"
    :pt="{ 'legend': 'ml-4 !p-3 !px-6' }"
  >
    <template #legend>
      <GameOptionRoleLegend role-name="seer"/>
    </template>

    <GameOptionInputGroup
      id="game-lobby-options-hub-roles-tab-seer-is-talkative-input-group"
      does-have-bottom-divider
      :option-description="isSeerTalkativeDescription"
      option-icon-class="fa fa-comments text-purple-400"
      :option-label="$t('components.GameLobbyOptionsHubRolesTabSeer.options.isTalkative.label')"
    >
      <AffirmativeToggleButton
        id="game-lobby-options-hub-roles-tab-seer-is-talkative-input"
        v-model="isSeerTalkativeValue"
        class="w-full"
      />
    </GameOptionInputGroup>

    <GameOptionInputGroup
      id="game-lobby-options-hub-roles-tab-seer-can-see-roles-input-group"
      :option-description="canSeerSeeRolesDescription"
      option-icon-class="fa fa-eye text-purple-400"
      :option-label="$t('components.GameLobbyOptionsHubRolesTabSeer.options.canSeeRoles.label')"
    >
      <AffirmativeToggleButton
        id="game-lobby-options-hub-roles-tab-seer-can-see-roles-input"
        v-model="canSeerSeeRolesValue"
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

const isSeerTalkativeValue = computed<boolean>({
  get: () => createGameDto.value.options.roles.seer.isTalkative,
  set: (value: boolean) => {
    const localCreateGameDto = CreateGameDto.create(createGameDto.value);
    localCreateGameDto.options.roles.seer.isTalkative = value;
    setCreateGameDto(localCreateGameDto);
  },
});

const canSeerSeeRolesValue = computed<boolean>({
  get: () => createGameDto.value.options.roles.seer.canSeeRoles,
  set: (value: boolean) => {
    const localCreateGameDto = CreateGameDto.create(createGameDto.value);
    localCreateGameDto.options.roles.seer.canSeeRoles = value;
    setCreateGameDto(localCreateGameDto);
  },
});

const isSeerTalkativeDescription = computed<string>(() => {
  const booleanAsAffirmative = convertBooleanAsAffirmativeString(isSeerTalkativeValue.value);

  return t(`components.GameLobbyOptionsHubRolesTabSeer.options.isTalkative.descriptions.${booleanAsAffirmative}`);
});

const canSeerSeeRolesDescription = computed<string>(() => {
  const booleanAsAffirmative = convertBooleanAsAffirmativeString(canSeerSeeRolesValue.value);

  return t(`components.GameLobbyOptionsHubRolesTabSeer.options.canSeeRoles.descriptions.${booleanAsAffirmative}`);
});
</script>