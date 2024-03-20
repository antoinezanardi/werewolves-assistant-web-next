<template>
  <div
    id="players-horizontal-list"
    class="mx-auto overflow-x-auto text-center w-full whitespace-nowrap"
  >
    <GlowCapture>
      <div
        v-for="player in players"
        :key="player._id"
        class="inline-block player-in-list text-center w-44"
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
import type { PlayersHorizontalListProps } from "~/components/shared/game/player/PlayersHorizontalList/players-horizontal-list.types";
import RoleImage from "~/components/shared/role/RoleImage/RoleImage.vue";

defineProps<PlayersHorizontalListProps>();
</script>