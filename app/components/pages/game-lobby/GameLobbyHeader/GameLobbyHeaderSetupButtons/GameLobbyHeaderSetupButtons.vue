<template>
  <PrimeVueButtonGroup class="text-center w-full">
    <TransitionGroup
      name="fade-list"
      tag="div"
    >
      <GameLobbyHeaderOptionsButton
        id="game-lobby-header-options-button"
        key="game-options-button"
        ref="gameLobbyHeaderOptionsButton"
        class="fade-list-item h-10 md:h-auto md:w-auto w-1/4"
        @game-options-button-click="onGameOptionsButtonClickFromGameOptionButton"
      />

      <GameLobbyHeaderPositionCoordinatorButton
        v-if="isPositionCoordinatorVisible"
        id="game-lobby-header-position-coordinator-button"
        key="game-position-coordinator-button"
        ref="gameLobbyHeaderPositionCoordinatorButton"
        class="fade-list-item h-10 md:h-auto md:w-auto w-1/4"
        @position-coordinator-button-click="onPositionCoordinatorButtonClickFromGamePositionCoordinatorButton"
      />

      <GameLobbyHeaderAdditionalCardsManagerButton
        v-if="isAdditionalCardsManagerVisible"
        id="game-lobby-header-additional-cards-manager-button"
        key="game-additional-cards-manager-button"
        ref="gameLobbyHeaderAdditionalCardsManagerButton"
        class="fade-list-item h-10 md:h-auto md:w-auto w-1/4"
        @additional-cards-manager-button-click="onAdditionalCardsManagerButtonClickFromGameAdditionalCardsManagerButton"
      />

      <GameLobbyHeaderGroupOrganizerButton
        v-if="isGroupOrganizerVisible"
        id="game-lobby-header-group-organizer-button"
        key="game-group-organizer-button"
        ref="gameLobbyHeaderGroupOrganizerButton"
        class="fade-list-item h-10 md:h-auto md:w-auto w-1/4"
        @group-organizer-button-click="onGroupOrganizerButtonClickFromGameGroupOrganizerButton"
      />
    </TransitionGroup>
  </PrimeVueButtonGroup>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import type { ComponentPublicInstance } from "vue";

import type { GameLobbyHeaderSetupButtonsEmits, GameLobbyHeaderSetupButtonsExposed } from "~/components/pages/game-lobby/GameLobbyHeader/GameLobbyHeaderSetupButtons/game-lobby-header-setup-buttons.types";
import GameLobbyHeaderAdditionalCardsManagerButton from "~/components/pages/game-lobby/GameLobbyHeader/GameLobbyHeaderSetupButtons/GameLobbyHeaderAdditionalCardsManagerButton/GameLobbyHeaderAdditionalCardsManagerButton.vue";
import GameLobbyHeaderGroupOrganizerButton from "~/components/pages/game-lobby/GameLobbyHeader/GameLobbyHeaderSetupButtons/GameLobbyHeaderGroupOrganizerButton/GameLobbyHeaderGroupOrganizerButton.vue";
import GameLobbyHeaderOptionsButton from "~/components/pages/game-lobby/GameLobbyHeader/GameLobbyHeaderSetupButtons/GameLobbyHeaderOptionsButton/GameLobbyHeaderOptionsButton.vue";
import GameLobbyHeaderPositionCoordinatorButton from "~/components/pages/game-lobby/GameLobbyHeader/GameLobbyHeaderSetupButtons/GameLobbyHeaderPositionCoordinatorButton/GameLobbyHeaderPositionCoordinatorButton.vue";
import { useAnimateCss } from "~/composables/style/useAnimateCss";
import { useCreateGameDtoStore } from "~/stores/game/create-game-dto/useCreateGameDtoStore";

const emit = defineEmits<GameLobbyHeaderSetupButtonsEmits>();

const createGameDtoStore = useCreateGameDtoStore();
const { getPlayersWithRoleNameInCreateGameDto } = createGameDtoStore;
const { createGameDto, doesCreateGameDtoContainAdditionalCardsDependantRoles } = storeToRefs(createGameDtoStore);

const minPlayerToDisplayPositionCoordinator = 2;

const { animateElementOnce } = useAnimateCss();

const gameLobbyHeaderOptionsButton = ref<ComponentPublicInstance | null>(null);

const gameLobbyHeaderPositionCoordinatorButton = ref<ComponentPublicInstance | null>(null);

const gameLobbyHeaderAdditionalCardsManagerButton = ref<ComponentPublicInstance | null>(null);

const gameLobbyHeaderGroupOrganizerButton = ref<ComponentPublicInstance | null>(null);

const isPositionCoordinatorVisible = computed<boolean>(() => createGameDto.value.players.length >= minPlayerToDisplayPositionCoordinator);

const isAdditionalCardsManagerVisible = computed<boolean>(() => doesCreateGameDtoContainAdditionalCardsDependantRoles.value);

const isGroupOrganizerVisible = computed<boolean>(() => getPlayersWithRoleNameInCreateGameDto("prejudiced-manipulator").length > 0);

function onGameOptionsButtonClickFromGameOptionButton(): void {
  emit("gameOptionsButtonClick");
}

function onPositionCoordinatorButtonClickFromGamePositionCoordinatorButton(): void {
  emit("positionCoordinatorButtonClick");
}

function onAdditionalCardsManagerButtonClickFromGameAdditionalCardsManagerButton(): void {
  emit("additionalCardsManagerButtonClick");
}

function onGroupOrganizerButtonClickFromGameGroupOrganizerButton(): void {
  emit("groupOrganizerButtonClick");
}

async function highlightGameOptionsButton(): Promise<void> {
  if (!gameLobbyHeaderOptionsButton.value) {
    throw createError("Game Lobby Header Options Button is not defined");
  }
  await animateElementOnce((gameLobbyHeaderOptionsButton.value.$el as HTMLElement), "heartBeat");
}

async function highlightPositionCoordinatorButton(): Promise<void> {
  if (!gameLobbyHeaderPositionCoordinatorButton.value) {
    throw createError("Game Lobby Header Position Coordinator Button is not defined");
  }
  await animateElementOnce((gameLobbyHeaderPositionCoordinatorButton.value.$el as HTMLElement), "heartBeat");
}

async function highlightAdditionalCardsManagerButton(): Promise<void> {
  if (!gameLobbyHeaderAdditionalCardsManagerButton.value) {
    throw createError("Game Lobby Header Additional Cards Manager Button is not defined");
  }
  await animateElementOnce((gameLobbyHeaderAdditionalCardsManagerButton.value.$el as HTMLElement), "heartBeat");
}

async function highlightGroupOrganizerButton(): Promise<void> {
  if (!gameLobbyHeaderGroupOrganizerButton.value) {
    throw createError("Game Lobby Header Group Organizer Button is not defined");
  }
  await animateElementOnce((gameLobbyHeaderGroupOrganizerButton.value.$el as HTMLElement), "heartBeat");
}

defineExpose<GameLobbyHeaderSetupButtonsExposed>({
  highlightGameOptionsButton,
  highlightPositionCoordinatorButton,
  highlightAdditionalCardsManagerButton,
  highlightGroupOrganizerButton,
});
</script>