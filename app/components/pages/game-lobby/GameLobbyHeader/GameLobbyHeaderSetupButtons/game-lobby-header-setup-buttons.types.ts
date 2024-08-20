type GameLobbyHeaderSetupButtonsEmits = {
  gameOptionsButtonClick: [];
  positionCoordinatorButtonClick: [];
  additionalCardsManagerButtonClick: [];
};

type GameLobbyHeaderSetupButtonsExposed = {
  highlightPositionCoordinatorButton: () => void;
  highlightAdditionalCardsManagerButton: () => void;
};

export type {
  GameLobbyHeaderSetupButtonsEmits,
  GameLobbyHeaderSetupButtonsExposed,
};