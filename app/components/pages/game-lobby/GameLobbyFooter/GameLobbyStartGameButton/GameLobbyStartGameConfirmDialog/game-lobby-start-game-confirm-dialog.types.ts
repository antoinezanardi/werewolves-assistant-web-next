import type { TupleToUnion } from "type-fest";
import type { GAME_LOBBY_START_GAME_CONFIRM_DIALOG_STEPS } from "~/components/pages/game-lobby/GameLobbyFooter/GameLobbyStartGameButton/GameLobbyStartGameConfirmDialog/game-lobby-start-game-confirm-dialog.constants";

type GameLobbyStartGameConfirmDialogEmits = {
  confirmStartGame: [];
  rejectPlayersPositionStep: [];
  rejectThiefAdditionalCardsPlacedStep: [];
  rejectActorAdditionalCardsPlacedStep: [];
};

type GameLobbyStartGameConfirmDialogExposed = {
  open: () => void;
};

type GameLobbyStartGameConfirmDialogStep = TupleToUnion<typeof GAME_LOBBY_START_GAME_CONFIRM_DIALOG_STEPS>;

export type {
  GameLobbyStartGameConfirmDialogEmits,
  GameLobbyStartGameConfirmDialogExposed,
  GameLobbyStartGameConfirmDialogStep,
};