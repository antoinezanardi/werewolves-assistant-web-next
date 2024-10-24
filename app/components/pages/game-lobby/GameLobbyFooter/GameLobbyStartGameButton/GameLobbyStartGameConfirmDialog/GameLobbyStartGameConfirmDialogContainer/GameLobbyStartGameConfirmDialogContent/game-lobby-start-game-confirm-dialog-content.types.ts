import type { GameLobbyStartGameConfirmDialogStep } from "~/components/pages/game-lobby/GameLobbyFooter/GameLobbyStartGameButton/GameLobbyStartGameConfirmDialog/game-lobby-start-game-confirm-dialog.types";

type GameLobbyStartGameConfirmDialogContentProps = {
  currentConfirmStep: GameLobbyStartGameConfirmDialogStep;
};

type GameLobbyStartGameConfirmDialogContentEmits = {
  confirmStep: [];
  rejectPlayersPositionStep: [];
  rejectThiefAdditionalCardsPlacedStep: [];
  rejectActorAdditionalCardsPlacedStep: [];
  rejectGameOptionsChangedStep: [];
  rejectPlayersGroupedStep: [];
};

export type {
  GameLobbyStartGameConfirmDialogContentProps,
  GameLobbyStartGameConfirmDialogContentEmits,
};