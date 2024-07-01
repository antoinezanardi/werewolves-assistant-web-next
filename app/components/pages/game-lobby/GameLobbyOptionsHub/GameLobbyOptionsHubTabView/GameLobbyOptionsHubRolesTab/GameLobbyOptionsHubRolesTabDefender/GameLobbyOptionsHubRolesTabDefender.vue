<template>
  <PrimeVueFieldset
    id="game-lobby-options-hub-roles-tab-defender"
    :pt="{ 'legend': 'ml-4 !p-3 !px-6' }"
  >
    <template #legend>
      <GameOptionRoleLegend role-name="defender"/>
    </template>

    <GameOptionInputGroup
      id="game-lobby-options-hub-roles-tab-defender-can-protect-twice-input-group"
      :option-description="canDefenderProtectTwiceDescription"
      option-icon-class="fa fa-shield-heart text-amber-400"
      :option-label="$t('components.GameLobbyOptionsHubRolesTabDefender.options.canProtectTwice.label')"
    >
      <AffirmativeToggleButton
        id="game-lobby-options-hub-roles-tab-defender-can-protect-twice-input"
        v-model="canDefenderProtectTwiceValue"
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

const canDefenderProtectTwiceValue = computed<boolean>({
  get: () => createGameDto.value.options.roles.defender.canProtectTwice,
  set: (value: boolean) => {
    const localCreateGameDto = CreateGameDto.create(createGameDto.value);
    localCreateGameDto.options.roles.defender.canProtectTwice = value;
    setCreateGameDto(localCreateGameDto);
  },
});

const canDefenderProtectTwiceDescription = computed<string>(() => {
  const booleanAsAffirmative = convertBooleanAsAffirmativeString(canDefenderProtectTwiceValue.value);

  return t(`components.GameLobbyOptionsHubRolesTabDefender.options.canProtectTwice.descriptions.${booleanAsAffirmative}`);
});
</script>