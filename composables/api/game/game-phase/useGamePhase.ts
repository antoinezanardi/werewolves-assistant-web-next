import type { GamePhase } from "~/composables/api/game/types/game.types";

type UseGamePhase = {
  getGamePhaseWithTurnText: (phase: GamePhase, turn: number) => string;
};

function useGamePhase(): UseGamePhase {
  const { t } = useI18n();

  function getGamePhaseWithTurnText(phase: GamePhase, turn: number): string {
    const phaseText = t(`shared.game.phase.${phase}`);

    return `${phaseText} ${turn}`;
  }
  return { getGamePhaseWithTurnText };
}

export { useGamePhase };