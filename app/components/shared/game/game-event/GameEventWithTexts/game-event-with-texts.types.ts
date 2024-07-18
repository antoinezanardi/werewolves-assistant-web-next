type GameEventWithTextsProps = {
  texts: string[];
};

type GameEventWithTextsEmits = {
  gameEventTextChange: [string | undefined];
};

export type {
  GameEventWithTextsProps,
  GameEventWithTextsEmits,
};