<template>
  <div
    id="game-lobby-role-picker-description"
    ref="gameLobbyRolePickerDescription"
    class="border-gray-600 flex flex-col gap-2 items-center md:border-r pe-4"
    data-testid="game-lobby-role-picker-description"
  >
    <RoleFlippingImage
      id="role-flipping-image"
      v-tilt
      class="mt-3 rounded-2xl"
      :role-name="pickedRole?.name"
      :sizes="roleFlippingImageSizes"
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
        class="!hidden animate__animated animate__headShake animate__infinite animate__slow fa-3x md:!inline"
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
import { useScroll } from "@vueuse/core";

import type { GameLobbyRolePickerDescriptionProps } from "~/components/pages/game-lobby/GameLobbyRolePicker/GameLobbyRolePickerDescription/game-lobby-role-picker-description.types";
import GameLobbyRolePickerDescriptionContent from "~/components/pages/game-lobby/GameLobbyRolePicker/GameLobbyRolePickerDescription/GameLobbyRolePickerDescriptionContent/GameLobbyRolePickerDescriptionContent.vue";
import RoleFlippingImage from "~/components/shared/role/RoleImage/RoleFlippingImage/RoleFlippingImage.vue";
import { useAppBreakpoints } from "~/composables/style/useAppBreakpoints";

const props = defineProps<GameLobbyRolePickerDescriptionProps>();

const { isSmallerThanMdBreakpoint } = useAppBreakpoints();

const roleFlippingImageSizes = computed<string>(() => (isSmallerThanMdBreakpoint.value ? "75px" : "200px"));

const gameLobbyRolePickerDescription = ref<HTMLElement | null>(null);

const { y: yScroll } = useScroll(gameLobbyRolePickerDescription, { behavior: "smooth" });

watch(() => props.pickedRole, () => {
  yScroll.value = 0;
});
</script>