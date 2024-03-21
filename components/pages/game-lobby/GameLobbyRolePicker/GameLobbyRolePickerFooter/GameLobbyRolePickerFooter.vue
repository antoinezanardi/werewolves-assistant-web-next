<template>
  <div
    id="game-lobby-role-picker-footer"
    class="text-center w-full"
  >
    <VuePrimeDivider/>

    <VuePrimeButton
      id="game-lobby-role-picker-footer-button"
      :disabled="!canRoleBePicked"
      :label="$t('components.GameLobbyRolePickerFooter.pickRole')"
      @click="pickRoleForPlayer"
    />
  </div>
</template>

<script setup lang="ts">
import type { GameLobbyRolePickerFooterEmits, GameLobbyRolePickerFooterProps } from "~/components/pages/game-lobby/GameLobbyRolePicker/GameLobbyRolePickerFooter/game-lobby-role-picker-footer.types";
import { CreateGamePlayerDto } from "~/composables/api/game/dto/create-game/create-game-player/create-game-player.dto";
import { useCreateGameDtoStore } from "~/stores/game/create-game-dto/useCreateGameDtoStore";

const props = defineProps<GameLobbyRolePickerFooterProps>();

const emit = defineEmits<GameLobbyRolePickerFooterEmits>();

const createGameDtoStore = useCreateGameDtoStore();
const { updatePlayerInCreateGameDto } = createGameDtoStore;

const isPlayerRoleChanged = computed<boolean>(() => props.player.role.name !== props.pickedRole?.name);

const canRoleBePicked = computed<boolean>(() => !!props.pickedRole && isPlayerRoleChanged.value);

function pickRoleForPlayer(): void {
  if (!props.pickedRole) {
    return;
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