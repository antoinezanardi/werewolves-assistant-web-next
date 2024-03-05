<template>
  <div
    id="game-current-play-expected-player-role-image"
    class="flex justify-end"
  >
    <RoleImage
      :alt="$t('components.gamePlaygroundHeaderCard.roleImageAlt')"
      definition="small"
      :role-name="currentPlayRoleImageName"
    />
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";

import RoleImage from "~/components/shared/role/RoleImage/RoleImage.vue";
import { RoleNames } from "~/composables/api/role/enums/role.enums";
import { useGameStore } from "~/stores/game/useGameStore";
import type { GamePlaySourceName } from "~/composables/api/game/types/game-play/game-play-source/game-play-source.types";

const gameStore = useGameStore();
const { game } = storeToRefs(gameStore);

const currentPlayRoleImageName = computed<RoleNames | undefined>(() => {
  const { currentPlay } = game.value;
  if (!currentPlay) {
    return undefined;
  }
  const { name: sourceName } = currentPlay.source;
  const villagerImageSpecificGamePlaySourceNames: GamePlaySourceName[] = [
    "sheriff",
    "survivors",
    "charmed",
    "lovers",
  ];
  if (villagerImageSpecificGamePlaySourceNames.includes(sourceName)) {
    return RoleNames.VILLAGER;
  }
  if (sourceName === "werewolves") {
    return RoleNames.WEREWOLF;
  }
  return sourceName as RoleNames;
});
</script>