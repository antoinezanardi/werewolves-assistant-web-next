type GameLobbyHeaderEmits = {
  gameOptionsButtonClick: [];
  positionCoordinatorButtonClick: [];
  additionalCardsManagerButtonClick: [];
};

type GameLobbyHeaderExposed = {
  highlightPositionCoordinatorButton: () => void;
};

export type {
  GameLobbyHeaderEmits,
  GameLobbyHeaderExposed,
};