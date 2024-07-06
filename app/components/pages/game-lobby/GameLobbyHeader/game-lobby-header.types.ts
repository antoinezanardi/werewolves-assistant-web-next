type GameLobbyHeaderEmits = {
  gameOptionsButtonClick: [];
  positionCoordinatorButtonClick: [];
};

type GameLobbyHeaderExposed = {
  highlightPositionCoordinatorButton: () => void;
};

export type {
  GameLobbyHeaderEmits,
  GameLobbyHeaderExposed,
};