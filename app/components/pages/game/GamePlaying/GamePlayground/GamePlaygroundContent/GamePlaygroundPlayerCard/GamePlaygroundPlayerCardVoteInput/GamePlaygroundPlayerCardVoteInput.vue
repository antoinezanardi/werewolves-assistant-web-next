<template>
  <div id="game-playground-player-card-vote-input">
    <PrimeVueFloatLabel class="mt-5">
      <PrimeVueAutoComplete
        class="w-full"
        complete-on-focus
        data-key="name"
        :delay="100"
        dropdown
        force-selection
        input-id="player-vote-input"
        :model-value="votedPlayer"
        option-label="name"
        :suggestions="filteredVoteOptions"
        @change="onChangeFromPlayerVoteInput"
        @complete="onCompleteFromPlayerVoteInput"
        @hide="onHideFromPlayerVoteInput"
      >
        <template #option="slotProps">
          <div class="align-options-center flex">
            <RoleImage
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
      </PrimeVueAutoComplete>

      <label
        id="player-vote-input-label"
        for="player-vote-input"
      >
        {{ $t("components.GamePlaygroundPlayerCardVoteInput.voteFor") }}
      </label>
    </PrimeVueFloatLabel>
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
  const eligibleTargets = game.value.currentPlay?.source.interactions?.[0]?.eligibleTargets;
  if (eligibleTargets === undefined) {
    return undefined;
  }
  return eligibleTargets.filter(({ _id }) => _id !== props.player._id);
});

function onCompleteFromPlayerVoteInput({ query }: AutoCompleteCompleteEvent): void {
  const options: Player[] = voteOptions.value ?? [];
  if (!query.trim()) {
    filteredVoteOptions.value = options;

    return;
  }
  const fuse: Fuse<Player> = new Fuse(options, { keys: ["name"] });
  filteredVoteOptions.value = fuse.search(query).map(({ item }) => item);
}

function onHideFromPlayerVoteInput(): void {
  filteredVoteOptions.value = [];
}

function onChangeFromPlayerVoteInput({ value }: AutoCompleteChangeEvent): void {
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