import { defineStore } from "pinia";
import { useCurrentGamePlay } from "~/composables/api/game/game-play/useCurrentGamePlay";
import type { Game } from "~/composables/api/game/types/game.class";
import { StoreIds } from "~/stores/enums/store.enum";
import { GameEvent } from "~/stores/game/game-event/types/game-event.class";
import { useGameStore } from "~/stores/game/useGameStore";

const useGameEventsStore = defineStore(StoreIds.GAME_EVENTS, () => {
  const gameEvents = ref<GameEvent[]>([]);
  const currentGameEventIndex = ref<number>(0);

  const gameStore = useGameStore();

  const currentGameEvent = computed<GameEvent | undefined>(() => gameEvents.value[currentGameEventIndex.value]);
  const canGoToPreviousGameEvent = computed<boolean>(() => currentGameEventIndex.value > 0 && gameStore.makingGamePlayStatus !== "pending");
  const canGoToNextGameEvent = computed<boolean>(() => gameStore.makingGamePlayStatus !== "pending");

  function resetGameEvents(): void {
    gameEvents.value = [];
    currentGameEventIndex.value = 0;
  }

  function getLastGameHistoryRecordEvents(game: Game): GameEvent[] {
    const { lastGameHistoryRecord } = game;
    if (!lastGameHistoryRecord) {
      return [];
    }
    const { action, voting } = lastGameHistoryRecord.play;
    if (action === "look") {
      return [GameEvent.create({ type: "seer-has-seen" })];
    } else if (action === "elect-sheriff" && voting?.result === "sheriff-election") {
      return [GameEvent.create({ type: "sheriff-has-been-elected", players: voting.nominatedPlayers })];
    }
    return [];
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
    gameEvents.value.push(...getLastGameHistoryRecordEvents(game));
    if (game.phase.tick === 1 && game.phase.name !== "twilight") {
      gameEvents.value.push(GameEvent.create({ type: "game-phase-starts" }));
    }
    if (game.currentPlay?.action === "bury-dead-bodies") {
      gameEvents.value.push(...getDeadPlayerGameEvents(game));
    }
    gameEvents.value.push(GameEvent.create({ type: "game-turn-starts" }));
  }

  async function goToNextGameEvent(): Promise<void> {
    const { mustCurrentGamePlayBeSkipped } = useCurrentGamePlay(ref(gameStore.game));
    const nextGameEvent = gameEvents.value[currentGameEventIndex.value + 1];
    if (gameEvents.value.length > currentGameEventIndex.value + 1 && nextGameEvent.type === "game-turn-starts" && mustCurrentGamePlayBeSkipped.value) {
      await gameStore.skipGamePlay();

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