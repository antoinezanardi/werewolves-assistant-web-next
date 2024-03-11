<template>
  <div
    id="current-play-expected-players-to-act"
    class="mx-auto overflow-x-auto text-center w-full whitespace-nowrap"
  >
    <GlowCapture>
      <div
        v-for="player in expectedPlayersToAct"
        :key="player._id"
        class="expected-player-to-act inline-block text-center w-44"
      >
        <GlowElement>
          <RoleImage
            class="glow:border-gray-400 mx-auto"
            definition="normal"
            :role-name="player.role.current"
            sizes="100"
          />
        </GlowElement>

        <div class="truncate w-full">
          {{ player.name }}
        </div>
      </div>
    </GlowCapture>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";

import RoleImage from "~/components/shared/role/RoleImage/RoleImage.vue";
import type { Player } from "~/composables/api/game/types/players/player.class";
import { useGameStore } from "~/stores/game/useGameStore";

const gameStore = useGameStore();
const { game } = storeToRefs(gameStore);

const expectedPlayersToAct = computed<Player[]>(() => game.value.currentPlay?.source.players ?? []);
</script>