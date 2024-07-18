type GameEventTextsManagerProps = {
  texts: string[];
};

type GameEventTextsManagerEmits = {
  gameEventTextChange: [string | undefined];
};

export type {
  GameEventTextsManagerProps,
  GameEventTextsManagerEmits,
};