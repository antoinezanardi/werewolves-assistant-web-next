import { defineStore } from "pinia";
import type { GameEvent } from "~/composables/api/game/game-event/game-event.class";
import { useCurrentGamePlay } from "~/composables/api/game/game-play/useCurrentGamePlay";
import { StoreIds } from "~/stores/enums/store.enum";
import { useGameStore } from "~/stores/game/useGameStore";

const useGameEventsStore = defineStore(StoreIds.GAME_EVENTS, () => {
  const currentGameEventIndex = ref<number>(0);

  const gameStore = useGameStore();

  const gameEvents = computed<GameEvent[] | undefined>(() => gameStore.game.events);

  const currentGameEvent = computed<GameEvent | undefined>(() => gameEvents.value?.[currentGameEventIndex.value]);
  const canGoToPreviousGameEvent = computed<boolean>(() => currentGameEventIndex.value > 0 && gameStore.makingGamePlayStatus !== "pending");
  const canGoToNextGameEvent = computed<boolean>(() => gameStore.makingGamePlayStatus !== "pending");

  function resetGameEventIndex(): void {
    currentGameEventIndex.value = 0;
  }

  async function goToNextGameEvent(): Promise<void> {
    if (!gameEvents.value) {
      return;
    }
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
      resetGameEventIndex();

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
    resetGameEventIndex,
    goToNextGameEvent,
    goToPreviousGameEvent,
  };
});

export { useGameEventsStore };