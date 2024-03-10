<template>
  <div id="game-playground-player-card-vote-input">
    <VuePrimeFloatLabel class="mt-5">
      <VuePrimeAutoComplete
        complete-on-focus
        data-key="name"
        :delay="100"
        dropdown
        force-selection
        input-id="player-vote-input"
        :model-value="votedPlayer"
        option-label="name"
        :suggestions="filteredVoteOptions"
        @change="handleUpdateModelValueEvent"
        @complete="searchVoteOptions"
        @hide="handleHideEvent"
      >
        <template #option="slotProps">
          <div class="align-options-center flex">
            <RoleImage
              alt="Player role"
              class="me-2"
              :role-name="slotProps.option.role.current"
              size="small"
              sizes="30"
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
import type { AutoCompleteChangeEvent, AutoCompleteCompleteEvent } from "primevue/autocomplete";

import type { GamePlaygroundPlayerCardVoteInputProps } from "~/components/pages/game/GamePlaying/GamePlayground/GamePlaygroundContent/GamePlaygroundPlayerCard/GamePlaygroundPlayerCardVoteInput/game-playground-player-card-vote-input.types";
import RoleImage from "~/components/shared/role/RoleImage/RoleImage.vue";
import type { Player } from "~/composables/api/game/types/players/player.class";
import { useMakeGamePlayDtoStore } from "~/stores/game/make-game-play-dto/useMakeGamePlayDtoStore";
import { useGameStore } from "~/stores/game/useGameStore";

const props = defineProps<GamePlaygroundPlayerCardVoteInputProps>();

const gameStore = useGameStore();
const { game } = storeToRefs(gameStore);

const { addMakeGamePlayVoteDto, removeMakeGamePlayVoteDto } = useMakeGamePlayDtoStore();

const filteredVoteOptions = ref<Player[]>([]);

const votedPlayer = ref<Player | string | null>(null);

const voteOptions = computed<Player[] | undefined>(() => {
  if (game.value.currentPlay?.eligibleTargets?.interactablePlayers === undefined) {
    return undefined;
  }
  const interactablePlayersWithoutSelf = game.value.currentPlay.eligibleTargets.interactablePlayers.filter(({ player }) => player._id !== props.player._id);

  return interactablePlayersWithoutSelf.map(({ player }) => player);
});

function searchVoteOptions({ query }: AutoCompleteCompleteEvent): void {
  const options: Player[] = voteOptions.value ?? [];
  if (!query.trim()) {
    filteredVoteOptions.value = options;

    return;
  }
  const fuse: Fuse<Player> = new Fuse(options, { keys: ["name"] });
  filteredVoteOptions.value = fuse.search(query).map(({ item }) => item);
}

function handleHideEvent(): void {
  filteredVoteOptions.value = [];
}

function handleUpdateModelValueEvent({ value }: AutoCompleteChangeEvent): void {
  votedPlayer.value = value as Player | string | null;
  if (typeof votedPlayer.value === "string") {
    return;
  }
  if (votedPlayer.value === null) {
    removeMakeGamePlayVoteDto(props.player._id);

    return;
  }
  removeMakeGamePlayVoteDto(props.player._id);
  addMakeGamePlayVoteDto({
    sourceId: props.player._id,
    targetId: votedPlayer.value._id,
  });
}
</script>