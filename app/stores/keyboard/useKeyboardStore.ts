import { defineStore } from "pinia";
import { StoreIds } from "~/stores/enums/store.enum";
import type { Keyboard } from "~/stores/keyboard/types/keyboard.types";

const useKeyboardStore = defineStore(StoreIds.KEYBOARD, () => {
  const {
    shift,
    arrowright,
    arrowleft,
    enter,
  } = useMagicKeys();

  const keyboard = computed<Keyboard>(() => ({
    shift: { isPressed: shift.value },
    enter: { isPressed: enter.value },
    arrowRight: { isPressed: arrowright.value },
    arrowLeft: { isPressed: arrowleft.value },
  }));

  return { keyboard };
});

export { useKeyboardStore };