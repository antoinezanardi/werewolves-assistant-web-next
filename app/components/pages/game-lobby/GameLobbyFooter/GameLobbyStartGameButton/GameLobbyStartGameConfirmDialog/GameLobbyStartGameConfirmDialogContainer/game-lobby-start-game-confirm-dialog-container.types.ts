import type { GameLobbyStartGameConfirmDialogStep } from "~/components/pages/game-lobby/GameLobbyFooter/GameLobbyStartGameButton/GameLobbyStartGameConfirmDialog/game-lobby-start-game-confirm-dialog.types";

type GameLobbyStartGameConfirmDialogContainerProps = {
  currentConfirmStep: GameLobbyStartGameConfirmDialogStep;
  rejectCallback: () => void;
};

type GameLobbyStartGameConfirmDialogContainerEmits = {
  confirmStep: [];
  confirmStartGame: [];
  rejectStartGame: [];
  rejectPlayersPositionStep: [rejectCallback: () => void];
  rejectThiefAdditionalCardsPlacedStep: [rejectCallback: () => void];
  rejectActorAdditionalCardsPlacedStep: [rejectCallback: () => void];
};

export type {
  GameLobbyStartGameConfirmDialogContainerProps,
  GameLobbyStartGameConfirmDialogContainerEmits,
};