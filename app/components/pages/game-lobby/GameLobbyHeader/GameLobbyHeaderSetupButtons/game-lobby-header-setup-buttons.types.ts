type GameLobbyHeaderSetupButtonsEmits = {
  gameOptionsButtonClick: [];
  positionCoordinatorButtonClick: [];
  additionalCardsManagerButtonClick: [];
  groupOrganizerButtonClick: [];
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