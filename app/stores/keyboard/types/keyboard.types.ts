type Keyboard = {
  shift: KeyboardKey;
  enter: KeyboardKey;
  arrowRight: KeyboardKey;
  arrowLeft: KeyboardKey;
};

type KeyboardKey = {
  isPressed: boolean;
};

export type {
  Keyboard,
  KeyboardKey,
};