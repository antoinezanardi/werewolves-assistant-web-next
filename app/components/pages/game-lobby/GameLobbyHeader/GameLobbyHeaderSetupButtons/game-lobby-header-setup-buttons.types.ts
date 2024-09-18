type GameLobbyHeaderSetupButtonsEmits = {
  gameOptionsButtonClick: [];
  positionCoordinatorButtonClick: [];
  additionalCardsManagerButtonClick: [];
};

type GameLobbyHeaderSetupButtonsExposed = {
  highlightGameOptionsButton: () => void;
  highlightPositionCoordinatorButton: () => void;
  highlightAdditionalCardsManagerButton: () => void;
};

export type {
  GameLobbyHeaderSetupButtonsEmits,
  GameLobbyHeaderSetupButtonsExposed,
};