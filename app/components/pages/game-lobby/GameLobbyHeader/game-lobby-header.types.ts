type GameLobbyHeaderEmits = {
  gameOptionsButtonClick: [];
  positionCoordinatorButtonClick: [];
  additionalCardsManagerButtonClick: [];
};

type GameLobbyHeaderExposed = {
  highlightGameOptionsButton: () => void;
  highlightPositionCoordinatorButton: () => void;
  highlightAdditionalCardsManagerButton: () => void;
};

export type {
  GameLobbyHeaderEmits,
  GameLobbyHeaderExposed,
};