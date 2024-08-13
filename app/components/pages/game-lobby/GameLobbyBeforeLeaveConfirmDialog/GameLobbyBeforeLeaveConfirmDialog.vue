<template>
  <PrimeVueConfirmDialog
    id="game-lobby-before-leave-confirm-dialog"
    group="game-lobby-before-leave-confirm-dialog"
  >
    <template #accepticon>
      <FontAwesomeIcon icon="sign-out"/>
    </template>

    <template #rejecticon>
      <FontAwesomeIcon icon="times"/>
    </template>
  </PrimeVueConfirmDialog>
</template>

<script setup lang="ts">
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import type { RouteLocationNormalizedGeneric } from "#vue-router";
import { storeToRefs } from "pinia";
import { useConfirm } from "primevue/useconfirm";
import { DEFAULT_CONFIRM_DIALOG_OPTIONS } from "~/composables/prime-vue/constants/prime-vue.constants";
import { useCreateGameDtoStore } from "~/stores/game/create-game-dto/useCreateGameDtoStore";

const router = useRouter();

const desiredDestinationFullPath = ref<string>("");

const doesConfirmToLeave = ref<boolean>(false);

const { require: confirmRequire } = useConfirm();

const createGameDtoStore = useCreateGameDtoStore();
const { createGameDto } = storeToRefs(createGameDtoStore);

const { t } = useI18n();

async function acceptLeavingCallback(): Promise<void> {
  doesConfirmToLeave.value = true;
  await router.push(desiredDestinationFullPath.value);
}

function open(): void {
  confirmRequire({
    group: "game-lobby-before-leave-confirm-dialog",
    accept: acceptLeavingCallback,
    header: t("components.GameLobbyBeforeLeaveConfirmDialog.youStartedComposition"),
    message: t("components.GameLobbyBeforeLeaveConfirmDialog.doYouWantToLeaveLobby"),
    acceptLabel: t("components.GameLobbyBeforeLeaveConfirmDialog.iWantToLeave"),
    rejectLabel: t("components.GameLobbyBeforeLeaveConfirmDialog.stayInLobby"),
    ...DEFAULT_CONFIRM_DIALOG_OPTIONS,
  });
}

function onBeforeEachRouteLeaving(guard: RouteLocationNormalizedGeneric): boolean {
  const isCompositionEmpty = createGameDto.value.players.length === 0;
  const isDestinationGamePage = guard.name === "game-id";
  if (isCompositionEmpty || isDestinationGamePage || doesConfirmToLeave.value) {
    return true;
  }
  desiredDestinationFullPath.value = guard.fullPath;
  open();

  return false;
}

onBeforeRouteLeave(onBeforeEachRouteLeaving);
</script>