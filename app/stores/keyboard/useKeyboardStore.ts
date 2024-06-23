import { defineStore } from "pinia";
import { useMagicKeys } from "@vueuse/core";
import { StoreIds } from "~/stores/enums/store.enum";
import type { Keyboard } from "~/stores/keyboard/types/keyboard.types";

const useKeyboardStore = defineStore(StoreIds.KEYBOARD, () => {
  const { shift, arrowright, arrowleft } = useMagicKeys();

  const keyboard = computed<Keyboard>(() => ({
    shift: { isPressed: shift.value },
    arrowRight: { isPressed: arrowright.value },
    arrowLeft: { isPressed: arrowleft.value },
  }));

  return { keyboard };
});

export { useKeyboardStore };