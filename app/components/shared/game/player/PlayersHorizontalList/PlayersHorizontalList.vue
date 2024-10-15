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
            :sizes="roleImageSizesWithSuffix"
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
import type { PlayersHorizontalListProps } from "~/components/shared/game/player/PlayersHorizontalList/players-horizontal-list.types";
import RoleImage from "~/components/shared/role/RoleImage/RoleImage.vue";
import { useAppBreakpoints } from "~/composables/style/useAppBreakpoints";

const props = withDefaults(defineProps<PlayersHorizontalListProps>(), {
  roleImageSizeInPx: 100,
});

const { isSmallerThanMdBreakpoint } = useAppBreakpoints();

const mdDivider = 1.25;

const roleImageSizes = computed<number>(() => (isSmallerThanMdBreakpoint.value ? props.roleImageSizeInPx / mdDivider : props.roleImageSizeInPx));

const roleImageSizesWithSuffix = computed<string>(() => `${roleImageSizes.value}px`);
</script>