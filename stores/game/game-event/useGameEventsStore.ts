import { defineStore } from "pinia";
import { useCurrentGamePlay } from "~/composables/api/game/game-play/useCurrentGamePlay";
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

  function getDeadPlayerGameEvents(game: Game): GameEvent[] {
    const { getEligibleTargetsWithInteractionInCurrentGamePlay } = useCurrentGamePlay(ref(game));
    const deadPlayers = getEligibleTargetsWithInteractionInCurrentGamePlay("bury");

    return deadPlayers.map(player => GameEvent.create({ type: "player-dies", players: [player] }));
  }

  function generateAndSetGameEventsFromGame(game: Game): void {
    resetGameEvents();
    if (game.tick === 1) {
      gameEvents.value.push(GameEvent.create({ type: "game-starts" }));
    }
    if (game.phase.tick === 1 && game.phase.name !== "twilight") {
      gameEvents.value.push(GameEvent.create({ type: "game-phase-starts" }));
    }
    if (game.currentPlay?.action === "bury-dead-bodies") {
      gameEvents.value.push(...getDeadPlayerGameEvents(game));
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