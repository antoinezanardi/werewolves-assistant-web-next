import type { GameLobbyStartGameConfirmDialogStep } from "~/components/pages/game-lobby/GameLobbyFooter/GameLobbyStartGameButton/GameLobbyStartGameConfirmDialog/game-lobby-start-game-confirm-dialog.types";
import type GameLobbyStartGameConfirmDialogPlayersPositioned from "~/components/pages/game-lobby/GameLobbyFooter/GameLobbyStartGameButton/GameLobbyStartGameConfirmDialog/GameLobbyStartGameConfirmDialogContent/GameLobbyStartGameConfirmDialogPlayersPositioned/GameLobbyStartGameConfirmDialogPlayersPositioned.vue";

type GameLobbyStartGameConfirmDialogContentProps = {
  currentConfirmStep: GameLobbyStartGameConfirmDialogStep;
};

type GameLobbyStartGameConfirmDialogContentEmits = {
  confirmStep: [];
  rejectPlayersPositionStep: [];
};

type GameLobbyStartGameConfirmDialogStepComponents = typeof GameLobbyStartGameConfirmDialogPlayersPositioned;

export type {
  GameLobbyStartGameConfirmDialogContentProps,
  GameLobbyStartGameConfirmDialogContentEmits,
  GameLobbyStartGameConfirmDialogStepComponents,
};