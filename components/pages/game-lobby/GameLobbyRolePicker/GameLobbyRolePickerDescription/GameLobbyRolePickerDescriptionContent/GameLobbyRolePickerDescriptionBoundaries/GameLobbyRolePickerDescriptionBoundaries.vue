<template>
  <div
    id="game-lobby-role-picker-description-boundaries"
  >
    <div
      id="role-count-in-party"
      class="flex gap-2 items-center"
    >
      <i class="fa-chess-pawn fas text-center text-info w-4"/>

      <span id="role-count">
        {{ t("components.GameLobbyRolePickerDescriptionBoundaries.roleCountInParty", { "count": roleCountInCreateGameDto }) }}
      </span>

      <div
        v-if="isRoleMaxInGameReached"
        id="role-count-max-reached"
        class="italic text-gray-400"
      >
        ({{ t("components.GameLobbyRolePickerDescriptionBoundaries.roleCountMaxReached") }})
      </div>
    </div>

    <div
      v-if="pickedRole.recommendedMinPlayers"
      id="recommended-role-min-in-game"
      class="flex gap-2 items-center"
    >
      <i class="fa-chess fas text-center text-warning w-4"/>

      <span>
        {{ t("components.GameLobbyRolePickerDescriptionBoundaries.recommendedMinPlayers", { "count": pickedRole.recommendedMinPlayers }) }}
      </span>
    </div>

    <div
      v-if="roleCountInCreateGameDto && !isRoleMinInGameReached"
      id="min-in-game-not-reached"
      class="flex gap-2 items-center"
    >
      <i class="fa-circle-exclamation fas text-center text-error w-4"/>

      <span>
        {{ t("components.GameLobbyRolePickerDescriptionBoundaries.minInGameNotReached", { "count": roleLeftCountToReachMinInCreateGameDto }) }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { GameLobbyRolePickerDescriptionBoundariesProps } from "~/components/pages/game-lobby/GameLobbyRolePicker/GameLobbyRolePickerDescription/GameLobbyRolePickerDescriptionContent/GameLobbyRolePickerDescriptionBoundaries/game-lobby-role-picker-description-boundaries.types";
import { useCreateGameDtoStore } from "~/stores/game/create-game-dto/useCreateGameDtoStore";

const props = defineProps<GameLobbyRolePickerDescriptionBoundariesProps>();

const createGameDtoStore = useCreateGameDtoStore();
const {
  getPlayersWithRoleNameInCreateGameDto,
  getRoleLeftCountToReachMinInCreateGameDto,
  isRoleMinReachedInCreateGameDto,
  isRoleMaxReachedInCreateGameDto,
} = createGameDtoStore;

const { t } = useI18n();

const roleCountInCreateGameDto = computed<number>(() => getPlayersWithRoleNameInCreateGameDto(props.pickedRole.name).length);

const isRoleMinInGameReached = computed<boolean>(() => isRoleMinReachedInCreateGameDto(props.pickedRole.name));

const roleLeftCountToReachMinInCreateGameDto = computed<number>(() => getRoleLeftCountToReachMinInCreateGameDto(props.pickedRole.name));

const isRoleMaxInGameReached = computed<boolean>(() => isRoleMaxReachedInCreateGameDto(props.pickedRole.name));
</script>