<template>
  <div
    id="close-button-only-dialog-footer"
    class="w-full"
  >
    <VuePrimeDivider class="!my-2"/>

    <div class="flex justify-end w-full">
      <VuePrimeButton
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
import type { CloseButtonOnlyDialogFooterEmits } from "~/components/shared/dialogs/CloseButtonOnlyDialogFooter/close-button-only-dialog-footer.types";

const emit = defineEmits<CloseButtonOnlyDialogFooterEmits>();

function close(): void {
  emit("closeDialog");
}
</script>