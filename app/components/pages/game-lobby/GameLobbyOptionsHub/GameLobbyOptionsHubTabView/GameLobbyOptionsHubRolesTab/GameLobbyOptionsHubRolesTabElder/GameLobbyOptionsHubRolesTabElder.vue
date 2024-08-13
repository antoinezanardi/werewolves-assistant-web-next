<template>
  <PrimeVueFieldset
    id="game-lobby-options-hub-roles-tab-elder"
    :pt="{ 'legend': 'ml-4 !p-3 !px-6' }"
  >
    <template #legend>
      <GameOptionRoleLegend role-name="elder"/>
    </template>

    <GameOptionInputGroup
      id="game-lobby-options-hub-roles-tab-elder-lives-count-against-werewolves-input-group"
      does-have-bottom-divider
      :option-description="elderLivesCountAgainstWerewolvesDescription"
      option-icon="heart"
      option-icon-class="text-red-500"
      :option-label="$t('components.GameLobbyOptionsHubRolesTabElder.options.livesCountAgainstWerewolves.label')"
    >
      <PrimeVueFloatLabel>
        <label
          id="game-lobby-options-hub-roles-tab-elder-lives-count-against-werewolves-label"
          for="game-lobby-options-hub-roles-tab-elder-lives-count-against-werewolves-input"
        >
          {{ $t("components.GameLobbyOptionsHubRolesTabElder.options.livesCountAgainstWerewolves.label") }}
        </label>

        <PrimeVueInputNumber
          id="game-lobby-options-hub-roles-tab-elder-lives-count-against-werewolves-input"
          v-model="elderLivesCountAgainstWerewolvesValue"
          class="w-full"
          :max="5"
          :min="1"
        />
      </PrimeVueFloatLabel>

      <PrimeVueSlider
        id="game-lobby-options-hub-roles-tab-elder-lives-count-against-werewolves-slider"
        v-model="elderLivesCountAgainstWerewolvesValue"
        class="mt-4 w-full"
        :max="5"
        :min="1"
        :step="1"
      />
    </GameOptionInputGroup>

    <GameOptionInputGroup
      id="game-lobby-options-hub-roles-tab-elder-does-take-his-revenge-input-group"
      :option-description="doesElderTakeHisRevengeDescription"
      option-icon="bolt"
      option-icon-class="text-yellow-500"
      :option-label="$t('components.GameLobbyOptionsHubRolesTabElder.options.doesTakeHisRevenge.label')"
    >
      <AffirmativeToggleButton
        id="game-lobby-options-hub-roles-tab-elder-does-take-his-revenge-input"
        v-model="doesElderTakeHisRevengeValue"
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

const elderLivesCountAgainstWerewolvesValue = computed<number>({
  get: () => createGameDto.value.options.roles.elder.livesCountAgainstWerewolves,
  set: (value: number | null) => {
    if (value === null) {
      return;
    }
    const localCreateGameDto = CreateGameDto.create(createGameDto.value);
    localCreateGameDto.options.roles.elder.livesCountAgainstWerewolves = value;
    setCreateGameDto(localCreateGameDto);
  },
});

const doesElderTakeHisRevengeValue = computed<boolean>({
  get: () => createGameDto.value.options.roles.elder.doesTakeHisRevenge,
  set: (value: boolean) => {
    const localCreateGameDto = CreateGameDto.create(createGameDto.value);
    localCreateGameDto.options.roles.elder.doesTakeHisRevenge = value;
    setCreateGameDto(localCreateGameDto);
  },
});

const elderLivesCountAgainstWerewolvesDescription = computed<string>(() => {
  const tKey = "components.GameLobbyOptionsHubRolesTabElder.options.livesCountAgainstWerewolves.description";

  return t(tKey, { livesCount: elderLivesCountAgainstWerewolvesValue.value }, elderLivesCountAgainstWerewolvesValue.value);
});

const doesElderTakeHisRevengeDescription = computed<string>(() => {
  const booleanAsAffirmative = convertBooleanAsAffirmativeString(doesElderTakeHisRevengeValue.value);

  return t(`components.GameLobbyOptionsHubRolesTabElder.options.doesTakeHisRevenge.descriptions.${booleanAsAffirmative}`);
});
</script>