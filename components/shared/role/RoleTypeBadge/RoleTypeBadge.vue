<template>
  <VuePrimeBadge
    v-p-tooltip="$t(`components.RoleTypeBadge.descriptions.${roleType}`)"
    :aria-label="$t(`components.RoleTypeBadge.roleType`)"
    class="role-type-badge"
    :severity="roleTypeBadgeAttributes.severity"
    size="large"
    :value="$t(`shared.role.type.${roleType}`)"
  />
</template>

<script setup lang="ts">
import type { BadgeProps } from "primevue/badge";

import type { RoleTypeBadgeProps } from "~/components/shared/role/RoleTypeBadge/role-type-badge-types";
import { RoleTypes } from "~/composables/api/role/enums/role.enums";

const props = defineProps<RoleTypeBadgeProps>();

const roleTypeBadgeAttributes = computed<BadgeProps>(() => {
  const roleTypesBadgeAttributes: Record<RoleTypes, BadgeProps> = {
    [RoleTypes.VILLAGER]: { severity: "success" },
    [RoleTypes.WEREWOLF]: { severity: "danger" },
    [RoleTypes.LONELY]: { severity: "info" },
    [RoleTypes.AMBIGUOUS]: { severity: "warning" },
  };

  return roleTypesBadgeAttributes[props.roleType];
});
</script>

<style lang="scss" scoped>
  .role-type-badge {
    cursor: help;
  }
</style>