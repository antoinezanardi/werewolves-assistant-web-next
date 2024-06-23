type Keyboard = {
  shift: KeyboardKey;
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