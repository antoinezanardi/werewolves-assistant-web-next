<template>
  <div
    id="game-lobby-position-coordinator-sorter-container"
    class="flex gap-4 h-full items-center justify-center"
  >
    <div class="flex flex-col gap-2 items-center justify-center w-2/12">
      <FontAwesomeIcon
        class="fa-2x"
        icon="arrow-up"
      />

      <span
        id="sorter-left-neighbors-text"
        class="text-center"
      >
        {{ $t("components.GameLobbyPositionCoordinatorSorter.leftNeighbors") }}
      </span>
    </div>

    <VueDraggable
      id="game-lobby-position-coordinator-sorter"
      v-model="createGameDto.players"
      :animation="200"
      class="max-h-full overflow-y-scroll w-8/12"
      item-key="name"
      tag="ul"
    >
      <template #item="{ element }">
        <GameLobbyPositionCoordinatorSorterElement
          class="game-lobby-position-coordinator-sorter-element"
          :player="element"
        />
      </template>
    </VueDraggable>

    <div class="flex flex-col gap-2 items-center justify-center w-2/12">
      <FontAwesomeIcon
        class="fa-2x"
        icon="arrow-down"
      />

      <span
        id="sorter-right-neighbors-text"
        class="text-center"
      >
        {{ $t("components.GameLobbyPositionCoordinatorSorter.rightNeighbors") }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { storeToRefs } from "pinia";
import GameLobbyPositionCoordinatorSorterElement from "~/components/pages/game-lobby/GameLobbyPositionCoordinator/GameLobbyPositionCoordinatorSorter/GameLobbyPositionCoordinatorSorterElement/GameLobbyPositionCoordinatorSorterElement.vue";
import { useCreateGameDtoStore } from "~/stores/game/create-game-dto/useCreateGameDtoStore";

const createGameDtoStore = useCreateGameDtoStore();
const { createGameDto } = storeToRefs(createGameDtoStore);
</script>