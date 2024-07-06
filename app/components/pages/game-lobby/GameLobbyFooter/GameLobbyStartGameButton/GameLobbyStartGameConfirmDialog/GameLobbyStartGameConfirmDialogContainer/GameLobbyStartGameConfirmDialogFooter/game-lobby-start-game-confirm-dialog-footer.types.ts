import type { GameLobbyStartGameConfirmDialogStep } from "~/components/pages/game-lobby/GameLobbyFooter/GameLobbyStartGameButton/GameLobbyStartGameConfirmDialog/game-lobby-start-game-confirm-dialog.types";

type GameLobbyStartGameConfirmDialogFooterProps = {
  currentConfirmStep: GameLobbyStartGameConfirmDialogStep;
  acceptCallback: () => void;
  rejectCallback: () => void;
};

export type {
  GameLobbyStartGameConfirmDialogFooterProps,
};