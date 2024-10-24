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
  highlightGroupOrganizerButton: () => void;
};

export type {
  GameLobbyHeaderSetupButtonsEmits,
  GameLobbyHeaderSetupButtonsExposed,
};