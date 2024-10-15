<template>
  <ul
    id="players-horizontal-list"
    class="mx-auto overflow-x-auto scrollbar-thin text-center w-full whitespace-nowrap"
  >
    <GlowCapture>
      <li
        v-for="player in players"
        :key="player._id"
        class="inline-block p-2 player-in-list text-center"
      >
        <GlowElement>
          <RoleImage
            class="glow:border-gray-400 mx-auto role-image-in-list"
            definition="normal"
            :role-name="player.role.current"
            :sizes="roleImageSizesInPx"
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

const props = withDefaults(defineProps<PlayersHorizontalListProps>(), {
  roleImageSizes: 100,
});

const breakpoints = useBreakpoints(breakpointsTailwind);
const isSmallerThanMd = breakpoints.smaller(BreakpointTypes.MD);

const mdDivider = 1.25;

const roleImageSizes = computed<number>(() => (isSmallerThanMd.value ? props.roleImageSizes / mdDivider : props.roleImageSizes));

const roleImageSizesInPx = computed<string>(() => `${roleImageSizes.value}px`);
</script>