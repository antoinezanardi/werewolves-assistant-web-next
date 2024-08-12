<template>
  <PrimeVueConfirmDialog
    id="game-playing-before-leave-confirm-dialog"
    group="game-playing-before-leave-confirm-dialog"
  />
</template>

<script setup lang="ts">
import type { RouteLocationNormalizedGeneric } from "#vue-router";
import { useConfirm } from "primevue/useconfirm";

const router = useRouter();

const desiredDestinationFullPath = ref<string>("");

const doesConfirmToLeave = ref<boolean>(false);

const { require: confirmRequire } = useConfirm();

const { t } = useI18n();

async function acceptLeavingCallback(): Promise<void> {
  doesConfirmToLeave.value = true;
  await router.push(desiredDestinationFullPath.value);
}

function open(): void {
  confirmRequire({
    group: "game-playing-before-leave-confirm-dialog",
    accept: acceptLeavingCallback,
    header: t("components.GamePlayingBeforeLeaveConfirmDialog.gameIsStillPlaying"),
    message: t("components.GamePlayingBeforeLeaveConfirmDialog.doYouWantToLeaveGame"),
    acceptLabel: t("components.GamePlayingBeforeLeaveConfirmDialog.iWantToLeave"),
    rejectLabel: t("components.GamePlayingBeforeLeaveConfirmDialog.stayInGame"),
    defaultFocus: "reject",
    acceptIcon: "fa fa-sign-out",
    rejectIcon: "fa fa-times",
    acceptClass: "p-button-danger",
    rejectClass: "p-button-secondary",
  });
}

function onBeforeEachRouteLeaving(guard: RouteLocationNormalizedGeneric): boolean {
  if (doesConfirmToLeave.value) {
    return true;
  }
  desiredDestinationFullPath.value = guard.fullPath;
  open();

  return false;
}

onBeforeRouteLeave(onBeforeEachRouteLeaving);
</script>