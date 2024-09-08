type GameEventWithTextsProps = {
  texts: string[];
};

type GameEventWithTextsEmits = {
  gameEventTextChange: [string];
};

export type {
  GameEventWithTextsProps,
  GameEventWithTextsEmits,
};