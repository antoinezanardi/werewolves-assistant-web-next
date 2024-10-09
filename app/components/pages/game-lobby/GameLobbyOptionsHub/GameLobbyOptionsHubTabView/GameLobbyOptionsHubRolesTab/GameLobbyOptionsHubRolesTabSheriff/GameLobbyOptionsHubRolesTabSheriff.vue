<template>
  <PrimeVueFieldset
    id="game-lobby-options-hub-roles-tab-sheriff"
    :pt="{ 'legend': FIELD_SETS_LEGEND_CLASSES }"
  >
    <template #legend>
      <div class="flex gap-4 items-center">
        <NuxtImg
          :alt="$t('components.GameLobbyOptionsHubRolesTabSheriff.sheriffAlt')"
          class="duration-300 ease-in-out transition-all"
          :class="{ 'grayscale': !isSheriffEnabledValue }"
          height="50px"
          placeholder="/svg/misc/ripples.svg"
          placeholder-class="w-50 h-50"
          src="/svg/game/player/player-attribute/sheriff.svg"
          width="50px"
        />

        <h2 id="game-lobby-options-hub-roles-tab-sheriff-title">
          {{ $t('components.GameLobbyOptionsHubRolesTabSheriff.sheriff') }}
        </h2>
      </div>
    </template>

    <GameOptionInputGroup
      id="game-lobby-options-hub-roles-tab-sheriff-is-enabled-input-group"
      does-have-bottom-divider
      :option-description="isSheriffEnabledDescription"
      option-icon="crown"
      option-icon-class="text-amber-300"
      :option-label="$t('components.GameLobbyOptionsHubRolesTabSheriff.options.isEnabled.label')"
    >
      <AffirmativeToggleButton
        id="game-lobby-options-hub-roles-tab-sheriff-is-sheriff-enabled-input"
        v-model="isSheriffEnabledValue"
        class="w-full"
      />
    </GameOptionInputGroup>

    <GameOptionInputGroup
      id="game-lobby-options-hub-roles-tab-sheriff-must-settle-votes-input-group"
      does-have-bottom-divider
      :option-description="mustSheriffSettleVotesDescription"
      option-icon="gavel"
      option-icon-class="text-amber-800"
      :option-label="$t('components.GameLobbyOptionsHubRolesTabSheriff.options.mustSettleTieInVotes.label')"
    >
      <AffirmativeToggleButton
        id="game-lobby-options-hub-roles-tab-sheriff-must-settle-votes-input"
        v-model="mustSheriffSettleVotesValue"
        class="w-full"
      />
    </GameOptionInputGroup>

    <GameOptionInputGroup
      id="game-lobby-options-hub-roles-tab-sheriff-has-doubled-vote-input-group"
      does-have-bottom-divider
      :option-description="doesSheriffHaveDoubledVoteDescription"
      option-icon="balance-scale"
      option-icon-class="text-amber-500"
      :option-label="$t('components.GameLobbyOptionsHubRolesTabSheriff.options.hasDoubledVote.label')"
    >
      <AffirmativeToggleButton
        id="game-lobby-options-hub-roles-tab-sheriff-has-doubled-vote-input"
        v-model="doesSheriffHaveDoubledVoteValue"
        class="w-full"
      />
    </GameOptionInputGroup>

    <GameLobbyOptionsHubRolesTabSheriffElection/>
  </PrimeVueFieldset>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";

import GameLobbyOptionsHubRolesTabSheriffElection from "~/components/pages/game-lobby/GameLobbyOptionsHub/GameLobbyOptionsHubTabView/GameLobbyOptionsHubRolesTab/GameLobbyOptionsHubRolesTabSheriff/GameLobbyOptionsHubRolesTabSheriffElection/GameLobbyOptionsHubRolesTabSheriffElection.vue";
import AffirmativeToggleButton from "~/components/shared/buttons/AffirmativeToggleButton/AffirmativeToggleButton.vue";
import GameOptionInputGroup from "~/components/shared/game/game-options/GameOptionInputGroup/GameOptionInputGroup.vue";
import { FIELD_SETS_LEGEND_CLASSES } from "~/components/shared/inputs/field-sets/field-sets.constants";
import { CreateGameDto } from "~/composables/api/game/dto/create-game/create-game.dto";
import { useGameOptionsTexts } from "~/composables/api/game/game-options/useGameOptionsTexts";
import { useCreateGameDtoStore } from "~/stores/game/create-game-dto/useCreateGameDtoStore";

const createGameDtoStore = useCreateGameDtoStore();
const { setCreateGameDto } = createGameDtoStore;
const { createGameDto, createGameOptionsDto } = storeToRefs(createGameDtoStore);

const { getGameOptionText } = useGameOptionsTexts(createGameOptionsDto);

const isSheriffEnabledValue = computed<boolean>({
  get: () => createGameDto.value.options.roles.sheriff.isEnabled,
  set: (value: boolean) => {
    const localCreateGameDto = CreateGameDto.create(createGameDto.value);
    localCreateGameDto.options.roles.sheriff.isEnabled = value;
    setCreateGameDto(localCreateGameDto);
  },
});

const mustSheriffSettleVotesValue = computed<boolean>({
  get: () => createGameDto.value.options.roles.sheriff.mustSettleTieInVotes,
  set: (value: boolean) => {
    const localCreateGameDto = CreateGameDto.create(createGameDto.value);
    localCreateGameDto.options.roles.sheriff.mustSettleTieInVotes = value;
    setCreateGameDto(localCreateGameDto);
  },
});

const doesSheriffHaveDoubledVoteValue = computed<boolean>({
  get: () => createGameDto.value.options.roles.sheriff.hasDoubledVote,
  set: (value: boolean) => {
    const localCreateGameDto = CreateGameDto.create(createGameDto.value);
    localCreateGameDto.options.roles.sheriff.hasDoubledVote = value;
    setCreateGameDto(localCreateGameDto);
  },
});

const isSheriffEnabledDescription = computed<string>(() => getGameOptionText("roles.sheriff.isEnabled"));

const mustSheriffSettleVotesDescription = computed<string>(() => getGameOptionText("roles.sheriff.mustSettleTieInVotes"));

const doesSheriffHaveDoubledVoteDescription = computed<string>(() => getGameOptionText("roles.sheriff.hasDoubledVote"));
</script>