import { defineStore } from "pinia";
import { useGameEventsGenerator } from "~/composables/api/game/game-event/useGameEventsGenerator";
import { useCurrentGamePlay } from "~/composables/api/game/game-play/useCurrentGamePlay";
import type { Game } from "~/composables/api/game/types/game.class";
import { StoreIds } from "~/stores/enums/store.enum";
import type { GameEvent } from "~/stores/game/game-event/types/game-event.class";
import { useGameStore } from "~/stores/game/useGameStore";

const useGameEventsStore = defineStore(StoreIds.GAME_EVENTS, () => {
  const gameEvents = ref<GameEvent[]>([]);
  const currentGameEventIndex = ref<number>(0);

  const gameStore = useGameStore();

  const { generateGameEventsFromGame } = useGameEventsGenerator();

  const currentGameEvent = computed<GameEvent | undefined>(() => gameEvents.value[currentGameEventIndex.value]);
  const canGoToPreviousGameEvent = computed<boolean>(() => currentGameEventIndex.value > 0 && gameStore.makingGamePlayStatus !== "pending");
  const canGoToNextGameEvent = computed<boolean>(() => gameStore.makingGamePlayStatus !== "pending");

  function resetGameEvents(): void {
    gameEvents.value = [];
    currentGameEventIndex.value = 0;
  }

  function generateAndSetGameEventsFromGame(game: Game): void {
    resetGameEvents();
    gameEvents.value = generateGameEventsFromGame(game);
  }

  async function goToNextGameEvent(): Promise<void> {
    const { mustCurrentGamePlayBeSkipped } = useCurrentGamePlay(gameStore.game);
    const nextGameEvent = gameEvents.value[currentGameEventIndex.value + 1];
    const isLastGameEvent = currentGameEventIndex.value === gameEvents.value.length - 1;
    const isNextGameEventGameTurnStarts = gameEvents.value.length > currentGameEventIndex.value + 1 && nextGameEvent.type === "game-turn-starts";
    const isCurrentGamePlayBuryDeadBodiesAndNextEventIsGameTurnStarts = gameStore.game.currentPlay?.action === "bury-dead-bodies" && isNextGameEventGameTurnStarts;
    if (
      isCurrentGamePlayBuryDeadBodiesAndNextEventIsGameTurnStarts && mustCurrentGamePlayBeSkipped.value ||
      isLastGameEvent && mustCurrentGamePlayBeSkipped.value
    ) {
      await gameStore.skipGamePlay();
      currentGameEventIndex.value = 0;

      return;
    }
    currentGameEventIndex.value += 1;
  }

  function goToPreviousGameEvent(): void {
    currentGameEventIndex.value -= 1;
  }
  return {
    gameEvents,
    currentGameEventIndex,
    currentGameEvent,
    canGoToPreviousGameEvent,
    canGoToNextGameEvent,
    resetGameEvents,
    generateAndSetGameEventsFromGame,
    goToNextGameEvent,
    goToPreviousGameEvent,
  };
});

export { useGameEventsStore };