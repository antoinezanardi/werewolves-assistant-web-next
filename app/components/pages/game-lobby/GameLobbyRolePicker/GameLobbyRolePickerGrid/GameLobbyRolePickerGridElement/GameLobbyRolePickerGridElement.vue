<template>
  <div
    id="game-lobby-role-picker-grid-element"
    class="flex flex-col items-center"
  >
    <button
      id="game-lobby-role-picker-grid-element-button"
      class="border-4 border-gray-600 hover:border-gray-400 relative rounded-lg"
      :class="{ '!border-gray-100': isPicked }"
      type="button"
      @click.prevent="onPickRoleFromGameLobbyRolePickerGridElementButton"
    >
      <RoleImage
        id="game-lobby-role-picker-grid-element-role-image"
        :alt="roleLabel"
        definition="normal"
        :role-name="role?.name"
        sizes="100px"
      />

      <GameLobbyRolePickerGridElementBadges
        aria-hidden="true"
        :role="role"
      />
    </button>

    <div
      id="game-lobby-role-picker-grid-element-role-name"
      class="cursor-pointer font-semibold mt-1 text-center"
      :class="{ 'italic text-gray-300': !role }"
      @click.prevent="onPickRoleFromGameLobbyRolePickerGridElementButton"
    >
      <i
        v-if="!role"
        id="shuffle-icon"
        class="fa-shuffle fas me-2"
      />

      <span>
        {{ roleLabel }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { draw } from "radash";

import type { GameLobbyRolePickerGridElementEmits, GameLobbyRolePickerGridElementProps } from "~/components/pages/game-lobby/GameLobbyRolePicker/GameLobbyRolePickerGrid/GameLobbyRolePickerGridElement/game-lobby-role-picker-grid-element.types";
import GameLobbyRolePickerGridElementBadges from "~/components/pages/game-lobby/GameLobbyRolePicker/GameLobbyRolePickerGrid/GameLobbyRolePickerGridElement/GameLobbyRolePickerGridElementBadges/GameLobbyRolePickerGridElementBadges.vue";
import RoleImage from "~/components/shared/role/RoleImage/RoleImage.vue";
import type { Role } from "~/composables/api/role/types/role.class";
import { useRoleName } from "~/composables/api/role/useRoleName";
import { useRolesStore } from "~/stores/role/useRolesStore";

const props = defineProps<GameLobbyRolePickerGridElementProps>();

const emit = defineEmits<GameLobbyRolePickerGridElementEmits>();

const rolesStore = useRolesStore();
const { roles } = storeToRefs(rolesStore);

const { t } = useI18n();

const { getRoleNameLabel } = useRoleName();

const roleLabel = computed<string>(() => {
  if (!props.role) {
    return t("components.GameLobbyRolePickerGridElement.random");
  }
  return getRoleNameLabel(props.role.name);
});

const isPicked = computed<boolean>(() => !!props.role && props.role.name === props.pickedRole?.name);

function onPickRoleFromGameLobbyRolePickerGridElementButton(): void {
  if (!roles.value) {
    return;
  }

  if (!props.role) {
    const rolesWithoutPickedRole = roles.value.filter(({ name }) => !props.pickedRole || name !== props.pickedRole.name);
    const randomRole = draw(rolesWithoutPickedRole) as Role;
    emit("pickRole", randomRole);

    return;
  }

  emit("pickRole", props.role);
}
</script>

<style lang="scss" scoped>
#game-lobby-role-picker-grid-element-button {
  transition: border-color 0.2s ease;
}
</style>