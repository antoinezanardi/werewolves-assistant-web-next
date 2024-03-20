<template>
  <div id="game-playground-content">
    <Component
      :is="gamePlaygroundTypeComponentToRender"
      id="game-playground-type"
      class="h-full w-full"
    />
  </div>
</template>

<script lang="ts" setup>
import { storeToRefs } from "pinia";

import GameBuryDeadBodiesPlayground from "~/components/pages/game/GamePlaying/GamePlayground/GamePlaygroundContent/GameBuryDeadBodiesPlayground/GameBuryDeadBodiesPlayground.vue";
import GameChooseCardPlayground from "~/components/pages/game/GamePlaying/GamePlayground/GamePlaygroundContent/GameChooseCardPlayground/GameChooseCardPlayground.vue";
import GameChooseSidePlayground from "~/components/pages/game/GamePlaying/GamePlayground/GamePlaygroundContent/GameChooseSidePlayground/GameChooseSidePlayground.vue";
import GameNoActionPlayground from "~/components/pages/game/GamePlaying/GamePlayground/GamePlaygroundContent/GameNoActionPlayground/GameNoActionPlayground.vue";
import GameRequestAnotherVotePlayground from "~/components/pages/game/GamePlaying/GamePlayground/GamePlaygroundContent/GameRequestAnotherVotePlayground/GameRequestAnotherVotePlayground.vue";
import GameTargetPlayground from "~/components/pages/game/GamePlaying/GamePlayground/GamePlaygroundContent/GameTargetPlayground/GameTargetPlayground.vue";
import GameUsePotionsPlayground from "~/components/pages/game/GamePlaying/GamePlayground/GamePlaygroundContent/GameUsePotionsPlayground/GameUsePotionsPlayground.vue";
import GameVotePlayground from "~/components/pages/game/GamePlaying/GamePlayground/GamePlaygroundContent/GameVotePlayground/GameVotePlayground.vue";
import type { GamePlayType } from "~/composables/api/game/types/game-play/game-play.types";
import { useGameStore } from "~/stores/game/useGameStore";

type GamePlaygroundTypeComponent =
  | typeof GameBuryDeadBodiesPlayground
  | typeof GameChooseCardPlayground
  | typeof GameChooseSidePlayground
  | typeof GameNoActionPlayground
  | typeof GameRequestAnotherVotePlayground
  | typeof GameTargetPlayground
  | typeof GameUsePotionsPlayground
  | typeof GameVotePlayground;

const gameStore = useGameStore();
const { game } = storeToRefs(gameStore);

const gamePlaygroundTypeComponentToRender = computed<GamePlaygroundTypeComponent | undefined>(() => {
  const { currentPlay } = game.value;
  if (currentPlay?.action === "use-potions") {
    return GameUsePotionsPlayground;
  }
  const currentGamePlayTypeComponents: Record<GamePlayType, GamePlaygroundTypeComponent> = {
    "bury-dead-bodies": GameBuryDeadBodiesPlayground,
    "choose-card": GameChooseCardPlayground,
    "choose-side": GameChooseSidePlayground,
    "no-action": GameNoActionPlayground,
    "request-another-vote": GameRequestAnotherVotePlayground,
    "target": GameTargetPlayground,
    "vote": GameVotePlayground,
  };

  return currentPlay?.type ? currentGamePlayTypeComponents[currentPlay.type] : undefined;
});
</script>