import type { ConfirmationOptions } from "primevue/confirmationoptions";
import type { ToastMessageOptions } from "primevue/toast";

const DEFAULT_PRIME_VUE_TOAST_OPTIONS: ToastMessageOptions = {
  life: 4000,
  closable: true,
} as const;

const DEFAULT_CONFIRM_DIALOG_OPTIONS: ConfirmationOptions = {
  defaultFocus: "reject",
  acceptClass: "p-button-danger",
  rejectClass: "p-button-secondary",
} as const;

export {
  DEFAULT_PRIME_VUE_TOAST_OPTIONS,
  DEFAULT_CONFIRM_DIALOG_OPTIONS,
};