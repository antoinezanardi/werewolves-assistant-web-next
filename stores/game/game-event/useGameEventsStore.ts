import { defineStore } from "pinia";
import type { Game } from "~/composables/api/game/types/game.class";
import { StoreIds } from "~/stores/enums/store.enum";
import { GameEvent } from "~/stores/game/game-event/types/game-event.class";

const useGameEventsStore = defineStore(StoreIds.GAME_EVENTS, () => {
  const gameEvents = ref<GameEvent[]>([]);
  const currentGameEventIndex = ref<number>(0);
  const currentGameEvent = computed<GameEvent | undefined>(() => gameEvents.value[currentGameEventIndex.value]);
  const canGoToPreviousGameEvent = computed<boolean>(() => currentGameEventIndex.value > 0);

  function resetGameEvents(): void {
    gameEvents.value = [];
    currentGameEventIndex.value = 0;
  }

  function generateAndSetGameEventsFromGame(game: Game): void {
    resetGameEvents();
    if (game.tick === 1) {
      gameEvents.value.push(GameEvent.create({ type: "game-starts" }));
    }
    if (game.phase.tick === 1) {
      gameEvents.value.push(GameEvent.create({ type: "game-phase-starts" }));
    }
    gameEvents.value.push(GameEvent.create({ type: "game-turn-starts" }));
  }

  function goToNextGameEvent(): void {
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
    resetGameEvents,
    generateAndSetGameEventsFromGame,
    goToNextGameEvent,
    goToPreviousGameEvent,
  };
});

export { useGameEventsStore };