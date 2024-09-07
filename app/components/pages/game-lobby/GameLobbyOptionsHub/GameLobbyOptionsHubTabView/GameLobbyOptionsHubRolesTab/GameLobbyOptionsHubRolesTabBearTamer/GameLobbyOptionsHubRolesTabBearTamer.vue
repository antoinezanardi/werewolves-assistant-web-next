<template>
  <PrimeVueFieldset
    id="game-lobby-options-hub-roles-tab-bear-tamer"
    :pt="{ 'legend': 'ml-4 !p-3 !px-6' }"
  >
    <template #legend>
      <GameOptionRoleLegend role-name="bear-tamer"/>
    </template>

    <GameOptionInputGroup
      id="game-lobby-options-hub-roles-tab-bear-tamer-does-growl-on-werewolves-side-input-group"
      :option-description="doesBearTamerGrowlOnWerewolvesSideDescription"
      option-icon="paw"
      option-icon-class="text-amber-700"
      :option-label="$t('components.GameLobbyOptionsHubRolesTabBearTamer.options.doesGrowlOnWerewolvesSide.label')"
    >
      <AffirmativeToggleButton
        id="game-lobby-options-hub-roles-tab-bear-tamer-does-growl-on-werewolves-side-input"
        v-model="doesBearTamerGrowlOnWerewolvesSideValue"
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
import { useGameOptionsTexts } from "~/composables/api/game/game-options/useGameOptionsTexts";
import { useCreateGameDtoStore } from "~/stores/game/create-game-dto/useCreateGameDtoStore";

const createGameDtoStore = useCreateGameDtoStore();
const { setCreateGameDto } = createGameDtoStore;
const { createGameDto, createGameOptionsDto } = storeToRefs(createGameDtoStore);

const { getGameOptionText } = useGameOptionsTexts(createGameOptionsDto);

const doesBearTamerGrowlOnWerewolvesSideValue = computed<boolean>({
  get: () => createGameDto.value.options.roles.bearTamer.doesGrowlOnWerewolvesSide,
  set: (value: boolean) => {
    const localCreateGameDto = CreateGameDto.create(createGameDto.value);
    localCreateGameDto.options.roles.bearTamer.doesGrowlOnWerewolvesSide = value;
    setCreateGameDto(localCreateGameDto);
  },
});

const doesBearTamerGrowlOnWerewolvesSideDescription = computed<string>(() => getGameOptionText("roles.bearTamer.doesGrowlOnWerewolvesSide"));
</script>