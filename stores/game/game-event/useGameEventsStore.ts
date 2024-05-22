import { defineStore } from "pinia";
import type { Game } from "~/composables/api/game/types/game.class";
import { StoreIds } from "~/stores/enums/store.enum";
import { GameEvent } from "~/stores/game/game-event/types/game-event.class";
import type { GameEventType } from "~/stores/game/game-event/types/game-event.types";

const useGameEventsStore = defineStore(StoreIds.GAME_EVENTS, () => {
  const gameEvents = ref<GameEvent[]>([]);
  const currentGameEventIndex = ref<number>(0);
  const currentGameEvent = computed<GameEvent | undefined>(() => gameEvents.value[currentGameEventIndex.value]);
  const canGoToNextGameEvent = computed<boolean>(() => currentGameEventIndex.value < gameEvents.value.length - 1);
  const canGoToPreviousGameEvent = computed<boolean>(() => currentGameEventIndex.value > 0);

  function resetGameEvents(): void {
    gameEvents.value = [];
    currentGameEventIndex.value = 0;
  }

  function generateAndSetGameEventsFromGame(game: Game): void {
    resetGameEvents();
    if (game.tick === 1) {
      gameEvents.value.push(GameEvent.create({ type: "game-starts" }));
    } else if (game.phase.tick === 1) {
      const gameEventStartingPhaseType: GameEventType = game.phase.name === "day" ? "day-rises" : "night-falls";
      gameEvents.value.push(GameEvent.create({ type: gameEventStartingPhaseType }));
    }
    gameEvents.value.push(GameEvent.create({ type: "turn-starts" }));
  }

  function nextGameEvent(): void {
    currentGameEventIndex.value += 1;
  }

  function previousGameEvent(): void {
    currentGameEventIndex.value -= 1;
  }
  return {
    gameEvents,
    currentGameEvent,
    canGoToNextGameEvent,
    canGoToPreviousGameEvent,
    resetGameEvents,
    generateAndSetGameEventsFromGame,
    nextGameEvent,
    previousGameEvent,
  };
});

export { useGameEventsStore };