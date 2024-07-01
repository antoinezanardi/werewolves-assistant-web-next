<template>
  <div
    id="close-button-only-dialog-footer"
    class="w-full"
  >
    <PrimeVueDivider class="!my-2"/>

    <div class="flex justify-end w-full">
      <PrimeVueButton
        id="close-button-only-dialog-footer-close-button"
        :label="$t('shared.actions.close')"
        severity="secondary"
        size="small"
        @click="close"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { DialogFooterCloseButtonOnlyEmits } from "~/components/shared/dialogs/DialogFooterCloseButtonOnly/dialog-footer-close-button-only.types";

const emit = defineEmits<DialogFooterCloseButtonOnlyEmits>();

function close(): void {
  emit("closeDialog");
}
</script>