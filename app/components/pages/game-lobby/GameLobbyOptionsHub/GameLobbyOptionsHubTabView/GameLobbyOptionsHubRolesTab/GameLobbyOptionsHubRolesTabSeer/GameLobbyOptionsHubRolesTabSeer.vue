<template>
  <PrimeVueFieldset
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
      option-icon="comments"
      option-icon-class="text-purple-400"
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
      option-icon="eye"
      option-icon-class="text-purple-400"
      :option-label="$t('components.GameLobbyOptionsHubRolesTabSeer.options.canSeeRoles.label')"
    >
      <AffirmativeToggleButton
        id="game-lobby-options-hub-roles-tab-seer-can-see-roles-input"
        v-model="canSeerSeeRolesValue"
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

const isSeerTalkativeDescription = computed<string>(() => getGameOptionText("roles.seer.isTalkative"));

const canSeerSeeRolesDescription = computed<string>(() => getGameOptionText("roles.seer.canSeeRoles"));
</script>