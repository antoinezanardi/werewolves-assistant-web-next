import type { GameLobbyStartGameConfirmDialogStep } from "~/components/pages/game-lobby/GameLobbyFooter/GameLobbyStartGameButton/GameLobbyStartGameConfirmDialog/game-lobby-start-game-confirm-dialog.types";

type GameLobbyStartGameConfirmDialogContainerProps = {
  rejectCallback: () => void;
  currentConfirmStep: GameLobbyStartGameConfirmDialogStep;
};

type GameLobbyStartGameConfirmDialogContainerEmits = {
  confirmStep: [];
  confirmStartGame: [];
  rejectPlayersPositionStep: [];
};

export type {
  GameLobbyStartGameConfirmDialogContainerProps,
  GameLobbyStartGameConfirmDialogContainerEmits,
};