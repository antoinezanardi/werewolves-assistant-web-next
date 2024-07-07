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
import type { GameLobbyRolePickerFooterEmits, GameLobbyRolePickerFooterProps } from "~/components/pages/game-lobby/GameLobbyRolePicker/GameLobbyRolePickerFooter/game-lobby-role-picker-footer.types";
import { CreateGamePlayerDto } from "~/composables/api/game/dto/create-game/create-game-player/create-game-player.dto";
import type { Role } from "~/composables/api/role/types/role.class";
import { useCreateGameDtoStore } from "~/stores/game/create-game-dto/useCreateGameDtoStore";

const props = defineProps<GameLobbyRolePickerFooterProps>();

const emit = defineEmits<GameLobbyRolePickerFooterEmits>();

const createGameDtoStore = useCreateGameDtoStore();
const {
  updatePlayerInCreateGameDto,
  isRoleMaxReachedInCreateGameDto,
  getPlayersWithRoleNameInCreateGameDto,
} = createGameDtoStore;

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

function onClickFromGameLobbyRolePickerFooterButton(): void {
  if (!props.pickedRole || !props.player) {
    return;
  }
  if (isRoleMaxReachedInCreateGameDto(props.pickedRole.name)) {
    swapRoleWithFirstPlayerWithRole(props.pickedRole, props.player);
  }
  const updatedPlayer = CreateGamePlayerDto.create({
    ...props.player,
    role: { name: props.pickedRole.name },
    side: {
      original: props.pickedRole.side,
      current: props.pickedRole.side,
    },
  });
  updatePlayerInCreateGameDto(updatedPlayer);
  emit("playerUpdate", updatedPlayer);
}
</script>