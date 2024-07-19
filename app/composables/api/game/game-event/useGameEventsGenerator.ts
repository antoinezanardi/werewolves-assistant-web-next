import { useGameLastHistoryRecord } from "~/composables/api/game/game-history-record/useGameLastHistoryRecord";
import { useCurrentGamePlay } from "~/composables/api/game/game-play/useCurrentGamePlay";
import type { GamePlaySourceName } from "~/composables/api/game/types/game-play/game-play-source/game-play-source.types";
import type { GamePlayAction } from "~/composables/api/game/types/game-play/game-play.types";
import type { Game } from "~/composables/api/game/types/game.class";
import { GameEvent } from "~/stores/game/game-event/types/game-event.class";

type UseGameEventsGenerator = {
  getLastGameHistoryRecordCharmEvents: (source: GamePlaySourceName) => GameEvent[];
  getLastGameActionEvents: (game: Game) => GameEvent[];
  getRevealedRolePlayerGameEvents: (game: Game) => GameEvent[];
  getDeadPlayerGameEvents: (game: Game) => GameEvent[];
  generateGameEventsFromGame: (game: Game) => GameEvent[];
};

function useGameEventsGenerator(): UseGameEventsGenerator {
  function getLastGameHistoryRecordCharmEvents(source: GamePlaySourceName): GameEvent[] {
    const sourcesGameEvents: Partial<Record<GamePlaySourceName, GameEvent[]>> = {
      "pied-piper": [GameEvent.create({ type: "pied-piper-has-charmed" })],
      "cupid": [GameEvent.create({ type: "cupid-has-charmed" })],
    };

    return sourcesGameEvents[source] ?? [];
  }

  function getLastGameActionEvents(game: Game): GameEvent[] {
    const { lastGameHistoryRecord } = game;
    if (!lastGameHistoryRecord) {
      return [];
    }
    const { source, action, voting } = lastGameHistoryRecord.play;
    if (action === "elect-sheriff" && voting?.result === "sheriff-election" || action === "delegate") {
      return [GameEvent.create({ type: "sheriff-promotion" })];
    }
    const actionsGameEvents: Partial<Record<GamePlayAction, GameEvent[]>> = {
      "look": [GameEvent.create({ type: "seer-has-seen" })],
      "mark": [GameEvent.create({ type: "scandalmonger-has-marked" })],
      "infect": [GameEvent.create({ type: "accursed-wolf-father-may-have-infected" })],
      "choose-side": [GameEvent.create({ type: "wolf-hound-has-chosen-side" })],
      "charm": getLastGameHistoryRecordCharmEvents(source.name),
    };

    return actionsGameEvents[action] ?? [];
  }

  function getRevealedRolePlayerGameEvents(game: Game): GameEvent[] {
    const { lastGameHistoryRecord } = game;
    if (lastGameHistoryRecord?.revealedPlayers?.some(player => player.role.current === "idiot") === true) {
      return [GameEvent.create({ type: "idiot-is-spared" })];
    }
    return [];
  }

  function getDeadPlayerGameEvents(game: Game): GameEvent[] {
    const { getEligibleTargetsWithInteractionInCurrentGamePlay } = useCurrentGamePlay(game);
    const deadPlayers = getEligibleTargetsWithInteractionInCurrentGamePlay("bury");

    return deadPlayers.map(player => GameEvent.create({ type: "player-dies", players: [player] }));
  }

  function getLastGameHistoryRecordPlayerAttributeAlterationEvents(game: Game): GameEvent[] {
    const { doesHavePlayerAttributeAlteration } = useGameLastHistoryRecord(game);
    const hasElderTakenRevenge = doesHavePlayerAttributeAlteration("powerless", "elder", "attached");
    if (hasElderTakenRevenge) {
      return [GameEvent.create({ type: "elder-has-taken-revenge" })];
    }
    return [];
  }

  function generateGameEventsFromGame(game: Game): GameEvent[] {
    const gameEvents: GameEvent[] = [];
    if (game.tick === 1) {
      gameEvents.push(GameEvent.create({ type: "game-starts" }));
      if (game.players.some(player => player.role.current === "villager-villager")) {
        gameEvents.push(GameEvent.create({ type: "villager-villager-introduction" }));
      }
    }
    gameEvents.push(...getRevealedRolePlayerGameEvents(game));
    gameEvents.push(...getLastGameActionEvents(game));
    gameEvents.push(...getLastGameHistoryRecordPlayerAttributeAlterationEvents(game));
    if (game.phase.tick === 1 && game.phase.name !== "twilight") {
      gameEvents.push(GameEvent.create({ type: "game-phase-starts" }));
    }
    if (game.currentPlay?.action === "bury-dead-bodies") {
      gameEvents.push(...getDeadPlayerGameEvents(game));
    }
    gameEvents.push(GameEvent.create({ type: "game-turn-starts" }));

    return gameEvents;
  }
  return {
    getLastGameHistoryRecordCharmEvents,
    getLastGameActionEvents,
    getRevealedRolePlayerGameEvents,
    getDeadPlayerGameEvents,
    generateGameEventsFromGame,
  };
}

export { useGameEventsGenerator };