type GameLobbyHeaderSetupButtonsEmits = {
  gameOptionsButtonClick: [];
  positionCoordinatorButtonClick: [];
  additionalCardsManagerButtonClick: [];
};

type GameLobbyHeaderSetupButtonsExposed = {
  highlightPositionCoordinatorButton: () => void;
};

export type {
  GameLobbyHeaderSetupButtonsEmits,
  GameLobbyHeaderSetupButtonsExposed,
};