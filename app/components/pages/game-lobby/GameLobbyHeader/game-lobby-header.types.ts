type GameLobbyHeaderEmits = {
  gameOptionsButtonClick: [];
  positionCoordinatorButtonClick: [];
  additionalCardsManagerButtonClick: [];
  groupOrganizerButtonClick: [];
};

type GameLobbyHeaderExposed = {
  highlightGameOptionsButton: () => void;
  highlightPositionCoordinatorButton: () => void;
  highlightAdditionalCardsManagerButton: () => void;
  highlightGroupOrganizerButton: () => void;
};

export type {
  GameLobbyHeaderEmits,
  GameLobbyHeaderExposed,
};