<template>
  <PrimeVueConfirmDialog
    id="game-playing-before-leave-confirm-dialog"
    group="game-playing-before-leave-confirm-dialog"
  />
</template>

<script setup lang="ts">
import type { RouteLocationNormalizedGeneric } from "#vue-router";
import { useConfirm } from "primevue/useconfirm";
import { DEFAULT_CONFIRM_DIALOG_OPTIONS } from "~/composables/prime-vue/constants/prime-vue.constants";

const router = useRouter();

const desiredDestinationFullPath = ref<string>("");

const doesConfirmToLeaveGame = ref<boolean>(false);

const { require: confirmRequire } = useConfirm();

const { t } = useI18n();

async function acceptLeavingGameCallback(): Promise<void> {
  doesConfirmToLeaveGame.value = true;
  await router.push(desiredDestinationFullPath.value);
}

function openConfirmLeaveGameDialog(): void {
  confirmRequire({
    group: "game-playing-before-leave-confirm-dialog",
    accept: acceptLeavingGameCallback,
    header: t("components.GamePlayingBeforeLeaveConfirmDialog.gameIsStillPlaying"),
    message: t("components.GamePlayingBeforeLeaveConfirmDialog.doYouWantToLeaveGame"),
    acceptLabel: t("components.GamePlayingBeforeLeaveConfirmDialog.iWantToLeave"),
    rejectLabel: t("components.GamePlayingBeforeLeaveConfirmDialog.stayInGame"),
    ...DEFAULT_CONFIRM_DIALOG_OPTIONS,
  });
}

function onBeforeEachRouteLeaving(guard: RouteLocationNormalizedGeneric): boolean {
  if (doesConfirmToLeaveGame.value) {
    return true;
  }
  desiredDestinationFullPath.value = guard.fullPath;
  openConfirmLeaveGameDialog();

  return false;
}

onBeforeRouteLeave(onBeforeEachRouteLeaving);
</script>