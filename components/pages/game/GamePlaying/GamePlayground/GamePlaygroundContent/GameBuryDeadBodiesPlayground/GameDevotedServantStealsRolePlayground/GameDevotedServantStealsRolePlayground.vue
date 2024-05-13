<template>
  <div
    id="game-devoted-servant-steal-role-playground"
    class="flex flex-col items-center"
  >
    <GlowCapture>
      <GlowElement>
        <RoleImage
          class="glow:border-gray-400"
          definition="normal"
          role-name="devoted-servant"
          sizes="175"
        />
      </GlowElement>
    </GlowCapture>

    <h3
      id="devoted-servant-steals-role-question"
      class="my-4"
    >
      {{ doesDevotedServantStealRoleQuestion }}
    </h3>

    <div
      id="targets"
      class="flex items-center justify-center"
    >
      <GamePlaygroundPlayerCard
        v-for="target in eliminatedPlayers"
        :key="target._id"
        class="target"
        interaction="steal-role"
        :player="target"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";

import GamePlaygroundPlayerCard from "~/components/pages/game/GamePlaying/GamePlayground/GamePlaygroundContent/GamePlaygroundPlayerCard/GamePlaygroundPlayerCard.vue";
import RoleImage from "~/components/shared/role/RoleImage/RoleImage.vue";
import { useCurrentGamePlay } from "~/composables/api/game/game-play/useCurrentGamePlay";
import type { Player } from "~/composables/api/game/types/players/player.class";
import { useGameStore } from "~/stores/game/useGameStore";

const gameStore = useGameStore();
const { game } = storeToRefs(gameStore);

const { t } = useI18n();

const { getEligibleTargetsWithInteractionInCurrentGamePlay } = useCurrentGamePlay(game);

const eliminatedPlayers = computed<Player[] | undefined>(() => getEligibleTargetsWithInteractionInCurrentGamePlay("steal-role"));

const doesDevotedServantStealRoleQuestion = computed<string>(() => {
  const eliminatedPlayersCount = eliminatedPlayers.value?.length ?? 0;

  return t("components.GameDevotedServantStealsRolePlayground.doesDevotedServantStealRole", eliminatedPlayersCount);
});
</script>