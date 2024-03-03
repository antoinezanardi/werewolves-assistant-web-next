<template>
  <div id="game-playground-player-card-vote-input">
    <VuePrimeFloatLabel class="mt-5">
      <VuePrimeAutoComplete
        v-model="votedPlayer"
        complete-on-focus
        data-key="name"
        :delay="100"
        dropdown
        force-selection
        input-id="player-vote-input"
        option-label="name"
        :suggestions="filteredVoteOptions"
        @complete="searchVoteOptions"
        @hide="handleHideEvent"
        @item-select="handleItemSelectEvent"
      >
        <template #option="slotProps">
          <div class="align-options-center flex">
            <RoleImage
              alt="Player role"
              class="me-2"
              :role-name="slotProps.option.role.current"
              size="small"
              sizes="30px"
            />

            <div>{{ slotProps.option.name }}</div>
          </div>
        </template>

        <template #empty>
          <div class="p-2">
            <i class="fa fa-ban me-2 text-error"/>

            <span>
              {{ $t("components.GamePlaygroundPlayerCardVoteInput.noAvailableOptions") }}
            </span>
          </div>
        </template>
      </VuePrimeAutoComplete>

      <label
        id="player-vote-input-label"
        for="player-vote-input"
      >
        {{ $t("components.GamePlaygroundPlayerCardVoteInput.voteFor") }}
      </label>
    </VuePrimeFloatLabel>
  </div>
</template>

<script setup lang="ts">
import Fuse from "fuse.js";
import { storeToRefs } from "pinia";
import type { AutoCompleteCompleteEvent, AutoCompleteItemSelectEvent } from "primevue/autocomplete";

import type { GamePlaygroundPlayerCardVoteInputProps } from "~/components/pages/game/GamePlaying/GamePlayground/GamePlaygroundContent/GamePlaygroundPlayerCard/GamePlaygroundPlayerCardVoteInput/game-playground-player-card-vote-input.types";
import RoleImage from "~/components/shared/role/RoleImage/RoleImage.vue";
import type { Player } from "~/composables/api/game/types/players/player.class";
import { useMakeGamePlayDtoStore } from "~/stores/game/make-game-play-dto/useMakeGamePlayDtoStore";
import { useGameStore } from "~/stores/game/useGameStore";

const props = defineProps<GamePlaygroundPlayerCardVoteInputProps>();

const gameStore = useGameStore();
const { game } = storeToRefs(gameStore);

const { addMakeGamePlayVoteDto, removeMakeGamePlayVoteDto } = useMakeGamePlayDtoStore();

const votedPlayer = ref<Player | null>(null);

const filteredVoteOptions = ref<Player[]>([]);

const voteOptions = computed<Player[]>(() => {
  if (game.value.currentPlay?.eligibleTargets?.interactablePlayers?.length === undefined) {
    return [];
  }
  const interactablePlayersWithoutSelf = game.value.currentPlay.eligibleTargets.interactablePlayers.filter(({ player }) => player._id !== props.player._id);

  return interactablePlayersWithoutSelf.map(({ player }) => player);
});

function searchVoteOptions({ query }: AutoCompleteCompleteEvent): void {
  filteredVoteOptions.value = [];
  if (!query.trim()) {
    filteredVoteOptions.value = voteOptions.value;

    return;
  }
  const fuse = new Fuse(voteOptions.value, { keys: ["name"] });
  filteredVoteOptions.value = fuse.search(query).map(({ item }) => item);
}

function handleHideEvent(): void {
  filteredVoteOptions.value = [];
}

function handleItemSelectEvent({ value }: AutoCompleteItemSelectEvent): void {
  const selectedPlayer = value as Player;
  addMakeGamePlayVoteDto({
    sourceId: props.player._id,
    targetId: selectedPlayer._id,
  });
}

watch(() => votedPlayer.value, (newValue: Player | null) => {
  if (newValue === null) {
    removeMakeGamePlayVoteDto(props.player._id);
  }
});
</script>