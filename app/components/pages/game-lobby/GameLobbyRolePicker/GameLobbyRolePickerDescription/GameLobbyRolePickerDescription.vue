<template>
  <div
    id="game-lobby-role-picker-description"
    ref="gameLobbyRolePickerDescription"
    class="border-gray-600 border-r flex flex-col gap-2 items-center pe-4"
    data-testid="game-lobby-role-picker-description"
  >
    <RoleFlippingImage
      class="rounded-2xl"
      :role-name="pickedRole?.name"
      sizes="200px"
    />

    <div
      v-if="!pickedRole"
      id="no-picked-role-container"
      class="flex flex-col gap-4 items-center justify-center"
    >
      <h3>
        {{ $t("components.GameLobbyRolePickerDescription.pickARole") }}
      </h3>

      <FontAwesomeIcon
        class="animate__animated animate__headShake animate__infinite animate__slow fa-3x"
        icon="circle-chevron-right"
      />
    </div>

    <GameLobbyRolePickerDescriptionContent
      v-else
      id="game-lobby-role-picker-description-content"
      :picked-role="pickedRole"
    />
  </div>
</template>

<script setup lang="ts">
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import type { GameLobbyRolePickerDescriptionProps } from "~/components/pages/game-lobby/GameLobbyRolePicker/GameLobbyRolePickerDescription/game-lobby-role-picker-description.types";
import GameLobbyRolePickerDescriptionContent from "~/components/pages/game-lobby/GameLobbyRolePicker/GameLobbyRolePickerDescription/GameLobbyRolePickerDescriptionContent/GameLobbyRolePickerDescriptionContent.vue";
import RoleFlippingImage from "~/components/shared/role/RoleImage/RoleFlippingImage/RoleFlippingImage.vue";

const props = defineProps<GameLobbyRolePickerDescriptionProps>();

const gameLobbyRolePickerDescription = ref<HTMLElement | null>(null);
const { y: yScroll } = useScroll(gameLobbyRolePickerDescription, { behavior: "smooth" });

watch(() => props.pickedRole, () => {
  yScroll.value = 0;
});
</script>