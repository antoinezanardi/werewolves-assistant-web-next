import type { GameLobbyStartGameConfirmDialogStep } from "~/components/pages/game-lobby/GameLobbyFooter/GameLobbyStartGameButton/GameLobbyStartGameConfirmDialog/game-lobby-start-game-confirm-dialog.types";
import type GameLobbyStartGameConfirmDialogPlayersPositioned from "~/components/pages/game-lobby/GameLobbyFooter/GameLobbyStartGameButton/GameLobbyStartGameConfirmDialog/GameLobbyStartGameConfirmDialogContent/GameLobbyStartGameConfirmDialogPlayersPositioned/GameLobbyStartGameConfirmDialogPlayersPositioned.vue";
import type GameLobbyStartGameConfirmDialogPlayersReady from "~/components/pages/game-lobby/GameLobbyFooter/GameLobbyStartGameButton/GameLobbyStartGameConfirmDialog/GameLobbyStartGameConfirmDialogContent/GameLobbyStartGameConfirmDialogPlayersReady/GameLobbyStartGameConfirmDialogPlayersReady.vue";

type GameLobbyStartGameConfirmDialogContentProps = {
  currentConfirmStep: GameLobbyStartGameConfirmDialogStep;
};

type GameLobbyStartGameConfirmDialogContentEmits = {
  confirmStep: [],
  rejectPlayersPositionStep: [],
};

type GameLobbyStartGameConfirmDialogStepComponents =
  | typeof GameLobbyStartGameConfirmDialogPlayersPositioned
  | typeof GameLobbyStartGameConfirmDialogPlayersReady;

export type {
  GameLobbyStartGameConfirmDialogContentProps,
  GameLobbyStartGameConfirmDialogContentEmits,
  GameLobbyStartGameConfirmDialogStepComponents,
};