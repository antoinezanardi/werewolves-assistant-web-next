import type { GamePhaseName } from "~/composables/api/game/types/game-phase/game-phase.types";

type UseGamePhase = {
  getGamePhaseWithTurnText: (phase: GamePhaseName, turn: number) => string;
};

function useGamePhase(): UseGamePhase {
  const { t } = useI18n();

  function getGamePhaseWithTurnText(phase: GamePhaseName, turn: number): string {
    const phaseText = t(`shared.game.phase.${phase}`);

    if (phase === "twilight") {
      return phaseText;
    }
    return `${phaseText} ${turn}`;
  }
  return { getGamePhaseWithTurnText };
}

export { useGamePhase };