<template>
  <ul
    id="players-horizontal-list"
    class="mx-auto overflow-x-auto text-center w-full whitespace-nowrap"
  >
    <GlowCapture>
      <li
        v-for="player in players"
        :key="player._id"
        class="inline-block md:w-44 p-1 player-in-list text-center w-32"
      >
        <GlowElement>
          <RoleImage
            class="glow:border-gray-400 mx-auto role-image-in-list"
            definition="normal"
            :role-name="player.role.current"
            :sizes="roleImageSizes"
          />
        </GlowElement>

        <div class="truncate w-full">
          {{ player.name }}
        </div>
      </li>
    </GlowCapture>
  </ul>
</template>

<script setup lang="ts">
import { breakpointsTailwind, useBreakpoints } from "@vueuse/core";

import type { PlayersHorizontalListProps } from "~/components/shared/game/player/PlayersHorizontalList/players-horizontal-list.types";
import RoleImage from "~/components/shared/role/RoleImage/RoleImage.vue";
import { BreakpointTypes } from "~/utils/enums/breakpoint.enums";

defineProps<PlayersHorizontalListProps>();

const breakpoints = useBreakpoints(breakpointsTailwind);
const isSmallerThanMd = breakpoints.smaller(BreakpointTypes.MD);

const roleImageSizes = computed<string>(() => (isSmallerThanMd.value ? "50px" : "100px"));
</script>