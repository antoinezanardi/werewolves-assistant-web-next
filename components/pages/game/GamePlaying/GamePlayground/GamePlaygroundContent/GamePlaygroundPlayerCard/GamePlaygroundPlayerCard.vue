<template>
  <div
    id="game-playground-player-card"
    class="m-3"
    :data-testid="`game-playground-player-card-${props.player.name}`"
  >
    <PlayerCard
      id="player-card"
      :is-selected="isPlayerTargeted"
      :player-name="player.name"
      :player-role="player.role.current"
      @player-card-selector-click="handlePlayerCardSelectorClick"
    />

    <GamePlaygroundPlayerCardVoteInput
      v-if="game.currentPlay?.type === 'vote'"
      id="game-playground-player-card-vote-input"
      :player="player"
    />
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";

import type { GamePlaygroundPlayerCardProps } from "~/components/pages/game/GamePlaying/GamePlayground/GamePlaygroundContent/GamePlaygroundPlayerCard/game-playground-player-card.types";
import GamePlaygroundPlayerCardVoteInput from "~/components/pages/game/GamePlaying/GamePlayground/GamePlaygroundContent/GamePlaygroundPlayerCard/GamePlaygroundPlayerCardVoteInput/GamePlaygroundPlayerCardVoteInput.vue";
import PlayerCard from "~/components/shared/game/player/PlayerCard/PlayerCard.vue";
import type { WitchPotion } from "~/composables/api/game/types/game-play/game-play.types";
import { useMakeGamePlayDtoStore } from "~/stores/game/make-game-play-dto/useMakeGamePlayDtoStore";
import { useGameStore } from "~/stores/game/useGameStore";

const props = defineProps<GamePlaygroundPlayerCardProps>();

const gameStore = useGameStore();
const { game } = storeToRefs(gameStore);

const makeGamePlayDtoStore = useMakeGamePlayDtoStore();
const { makeGamePlayDto } = storeToRefs(makeGamePlayDtoStore);
const {
  addMakeGamePlayTargetDto,
  removeMakeGamePlayTargetDto,
  removeFirstMakeGamePlayTargetDto,
  removeFirstMakeGamePlayTargetDtoWithPotion,
} = makeGamePlayDtoStore;

const canPlayerBeTargeted = computed<boolean>(() => {
  const { type } = game.value.currentPlay ?? {};

  return type === "target" || type === "bury-dead-bodies";
});

const isPlayerTargeted = computed<boolean>(() => {
  if (!makeGamePlayDto.value.targets) {
    return false;
  }
  return makeGamePlayDto.value.targets.some(({ playerId }) => playerId === props.player._id);
});

function handleWitchGivesPotionClick(): void {
  const givenLifePotionTargets = makeGamePlayDto.value.targets?.filter(({ drankPotion }) => drankPotion === "life");
  const givenDeathPotionTargets = makeGamePlayDto.value.targets?.filter(({ drankPotion }) => drankPotion === "death");
  const drankPotion: WitchPotion = props.interaction === "give-life-potion" ? "life" : "death";
  if (props.interaction === "give-life-potion" && givenLifePotionTargets?.length === 1 ||
    props.interaction === "give-death-potion" && givenDeathPotionTargets?.length === 1) {
    removeFirstMakeGamePlayTargetDtoWithPotion(drankPotion);
  }
  addMakeGamePlayTargetDto({
    playerId: props.player._id,
    drankPotion,
  });
}

function handlePlayerCardSelectorClick(): void {
  const currentPlayInteraction = game.value.currentPlay?.source.interactions?.find(({ type }) => type === props.interaction);
  if (!currentPlayInteraction || !canPlayerBeTargeted.value) {
    return;
  }
  if (isPlayerTargeted.value) {
    removeMakeGamePlayTargetDto(props.player._id);

    return;
  }
  if (currentPlayInteraction.type === "give-life-potion" || currentPlayInteraction.type === "give-death-potion") {
    handleWitchGivesPotionClick();

    return;
  }
  if (makeGamePlayDto.value.targets?.length === currentPlayInteraction.boundaries.max) {
    removeFirstMakeGamePlayTargetDto();
  }
  addMakeGamePlayTargetDto({ playerId: props.player._id });
}
</script>