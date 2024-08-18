type GameLobbyHeaderEmits = {
  gameOptionsButtonClick: [];
  positionCoordinatorButtonClick: [];
  additionalCardsManagerButtonClick: [];
};

type GameLobbyHeaderExposed = {
  highlightPositionCoordinatorButton: () => void;
  highlightAdditionalCardsManagerButton: () => void;
};

export type {
  GameLobbyHeaderEmits,
  GameLobbyHeaderExposed,
};