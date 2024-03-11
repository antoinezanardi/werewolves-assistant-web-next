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
import type { RoleName } from "~/composables/api/role/types/role.types";
import { useGameStore } from "~/stores/game/useGameStore";
import type { GamePlaySourceName } from "~/composables/api/game/types/game-play/game-play-source/game-play-source.types";

const gameStore = useGameStore();
const { game } = storeToRefs(gameStore);

const currentPlayRoleImageName = computed<RoleName | undefined>(() => {
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
    return "villager";
  }
  if (sourceName === "werewolves") {
    return "werewolf";
  }
  return sourceName as RoleName;
});
</script>