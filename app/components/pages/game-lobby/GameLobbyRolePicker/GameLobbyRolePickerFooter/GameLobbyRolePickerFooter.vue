<template>
  <div
    id="game-lobby-role-picker-footer"
    class="text-center w-full"
  >
    <PrimeVueDivider class="!my-2"/>

    <PrimeVueButton
      id="game-lobby-role-picker-footer-button"
      :disabled="!canRoleBePicked"
      :label="$t('components.GameLobbyRolePickerFooter.pickRole')"
      @click="onClickFromGameLobbyRolePickerFooterButton"
    />
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import type { GameLobbyRolePickerFooterEmits, GameLobbyRolePickerFooterProps } from "~/components/pages/game-lobby/GameLobbyRolePicker/GameLobbyRolePickerFooter/game-lobby-role-picker-footer.types";
import { CreateGamePlayerDto } from "~/composables/api/game/dto/create-game/create-game-player/create-game-player.dto";
import type { Role } from "~/composables/api/role/types/role.class";
import { useRoleName } from "~/composables/api/role/useRoleName";
import { useStrings } from "~/composables/misc/useStrings";
import { usePrimeVueToasts } from "~/composables/prime-vue/usePrimeVueToasts";
import { useCreateGameDtoStore } from "~/stores/game/create-game-dto/useCreateGameDtoStore";

const props = defineProps<GameLobbyRolePickerFooterProps>();

const emit = defineEmits<GameLobbyRolePickerFooterEmits>();

const createGameDtoStore = useCreateGameDtoStore();
const {
  updatePlayerInCreateGameDto,
  isRoleMaxReachedInCreateGameDto,
  getPlayersWithRoleNameInCreateGameDto,
  removeObsoleteAdditionalCardsFromCreateGameDto,
} = createGameDtoStore;
const { createGameDto } = storeToRefs(createGameDtoStore);

const { addInfoToast } = usePrimeVueToasts();

const { t } = useI18n();

const { getDefiniteRoleNameLabel } = useRoleName();

const { lowerCaseFirstLetter } = useStrings();

const isPlayerRoleChanged = computed<boolean>(() => props.player?.role.name !== props.pickedRole?.name);

const canRoleBePicked = computed<boolean>(() => !!props.player && !!props.pickedRole && isPlayerRoleChanged.value);

function swapRoleWithFirstPlayerWithRole(pickedRole: Role, sourcePlayer: CreateGamePlayerDto): void {
  const players = getPlayersWithRoleNameInCreateGameDto(pickedRole.name);
  if (players.length === 0) {
    return;
  }
  const firstPlayer = players[0];
  const updatedPlayer = CreateGamePlayerDto.create({
    ...firstPlayer,
    role: { name: sourcePlayer.role.name },
    side: {
      original: sourcePlayer.side.original,
      current: sourcePlayer.side.current,
    },
  });
  updatePlayerInCreateGameDto(updatedPlayer);
}

function deleteGameAdditionalCardWithRoleIfPresent(role: Role): void {
  if (!createGameDto.value.additionalCards) {
    return;
  }
  const additionalCardIndex = createGameDto.value.additionalCards.findIndex(card => card.roleName === role.name);
  if (additionalCardIndex === -1) {
    return;
  }
  const additionalCard = createGameDto.value.additionalCards[additionalCardIndex];
  createGameDto.value.additionalCards = createGameDto.value.additionalCards.toSpliced(additionalCardIndex, 1);
  const recipientDefiniteRoleName = lowerCaseFirstLetter(getDefiniteRoleNameLabel(additionalCard.recipient, 1));
  const additionalCardDefiniteRoleName = lowerCaseFirstLetter(getDefiniteRoleNameLabel(additionalCard.roleName, 1));
  addInfoToast({
    summary: t("components.GameLobbyRolePickerFooter.additionalCardRemoved"),
    detail: t("components.GameLobbyRolePickerFooter.roleAdditionalCardRemovedForRecipient", {
      roleName: additionalCardDefiniteRoleName,
      recipient: recipientDefiniteRoleName,
    }),
    life: 5000,
  });
}

function onClickFromGameLobbyRolePickerFooterButton(): void {
  if (!props.pickedRole || !props.player) {
    return;
  }
  if (isRoleMaxReachedInCreateGameDto(props.pickedRole.name)) {
    swapRoleWithFirstPlayerWithRole(props.pickedRole, props.player);
  }
  deleteGameAdditionalCardWithRoleIfPresent(props.pickedRole);
  const updatedPlayer = CreateGamePlayerDto.create({
    ...props.player,
    role: { name: props.pickedRole.name },
    side: {
      original: props.pickedRole.side,
      current: props.pickedRole.side,
    },
  });
  updatePlayerInCreateGameDto(updatedPlayer);
  removeObsoleteAdditionalCardsFromCreateGameDto();
  emit("playerUpdate", updatedPlayer);
}
</script>