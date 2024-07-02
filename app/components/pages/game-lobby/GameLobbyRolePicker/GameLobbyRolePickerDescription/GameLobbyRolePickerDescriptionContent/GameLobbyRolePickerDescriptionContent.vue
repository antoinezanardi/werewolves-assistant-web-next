<template>
  <div
    id="game-lobby-role-picker-description-content"
    class="flex flex-col gap-4 items-center w-full"
  >
    <h3 id="role-name">
      {{ roleName }}
    </h3>

    <RoleSideBadge
      id="role-side-badge"
      :role-side="pickedRole.side"
      size="large"
    />

    <div class="flex gap-2 items-center justify-between w-full">
      <RoleOriginBadge
        id="role-origin-badge"
        :role-origin="pickedRole.origin"
      />

      <RoleTypeBadge
        id="role-type-badge"
        class="role-type-badge"
        :role-type="pickedRole.type"
      />
    </div>

    <GameLobbyRolePickerDescriptionBoundaries
      id="game-lobby-role-picker-description-boundaries"
      class="w-full"
      :picked-role="pickedRole"
    />

    <PrimeVueDivider class="!my-2"/>

    <RoleDescriptionLines
      id="role-description-lines"
      :role="pickedRole"
    />
  </div>
</template>

<script setup lang="ts">
import type { GameLobbyRolePickerDescriptionContentProps } from "~/components/pages/game-lobby/GameLobbyRolePicker/GameLobbyRolePickerDescription/GameLobbyRolePickerDescriptionContent/game-lobby-role-picker-description-content.types";
import GameLobbyRolePickerDescriptionBoundaries from "~/components/pages/game-lobby/GameLobbyRolePicker/GameLobbyRolePickerDescription/GameLobbyRolePickerDescriptionContent/GameLobbyRolePickerDescriptionBoundaries/GameLobbyRolePickerDescriptionBoundaries.vue";
import RoleDescriptionLines from "~/components/shared/role/RoleDescriptionLines/RoleDescriptionLines.vue";
import RoleOriginBadge from "~/components/shared/role/RoleOriginBadge/RoleOriginBadge.vue";
import RoleSideBadge from "~/components/shared/role/RoleSideBadge/RoleSideBadge.vue";
import RoleTypeBadge from "~/components/shared/role/RoleTypeBadge/RoleTypeBadge.vue";
import { useRoleName } from "~/composables/api/role/useRoleName";

const props = defineProps<GameLobbyRolePickerDescriptionContentProps>();

const { getRoleNameLabel } = useRoleName();

const roleName = computed(() => getRoleNameLabel(props.pickedRole.name));
</script>