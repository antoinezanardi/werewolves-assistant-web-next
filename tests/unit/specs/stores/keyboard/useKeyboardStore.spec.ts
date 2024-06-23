import { createPinia, setActivePinia } from "pinia";
import { expect } from "vitest";
import type { Keyboard } from "~/stores/keyboard/types/keyboard.types";
import { useKeyboardStore } from "~/stores/keyboard/useKeyboardStore";

describe("Use Keyboard Store", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it("should have initial state when created.", () => {
    const keyboardStore = useKeyboardStore();

    expect(keyboardStore.keyboard).toStrictEqual<Keyboard>({
      shift: { isPressed: false },
      arrowRight: { isPressed: false },
      arrowLeft: { isPressed: false },
    });
  });
});