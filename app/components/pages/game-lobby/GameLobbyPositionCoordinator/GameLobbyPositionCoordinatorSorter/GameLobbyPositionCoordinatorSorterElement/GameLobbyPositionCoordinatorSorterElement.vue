<template>
  <li
    :key="player.name"
    class="border-2 border-gray-700 cursor-move flex gap-2 items-center rounded-md shadow-black shadow-md w-full"
  >
    <div
      class="h-8 w-8"
      :style="{ 'background-color': playerColor }"
    />

    <RoleImage
      class="h-8 w-8"
      definition="small"
      :role-name="player.role.name"
    />

    <div class="grow truncate">
      {{ player.name }}
    </div>

    <i class="fa fa-bars me-2"/>
  </li>
</template>

<script setup lang="ts">
import stringToColor from "string-to-color";
import type { GameLobbyPositionCoordinatorSorterElementProps } from "~/components/pages/game-lobby/GameLobbyPositionCoordinator/GameLobbyPositionCoordinatorSorter/GameLobbyPositionCoordinatorSorterElement/game-lobby-position-coordinator-sorter-element.types";
import RoleImage from "~/components/shared/role/RoleImage/RoleImage.vue";

const props = defineProps<GameLobbyPositionCoordinatorSorterElementProps>();

const playerColor = computed<string>(() => stringToColor(props.player.name));
</script>