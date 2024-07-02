<template>
  <PrimeVueBadge
    v-p-tooltip="$t(`components.RoleTypeBadge.descriptions.${roleType}`)"
    class="cursor-help role-type-badge"
    :severity="roleTypeBadgeAttributes.severity"
    :size="size"
    :value="$t(`shared.role.type.${roleType}`)"
  />
</template>

<script setup lang="ts">
import type { BadgeProps } from "primevue/badge";

import type { RoleTypeBadgeProps } from "~/components/shared/role/RoleTypeBadge/role-type-badge-types";
import type { RoleType } from "~/composables/api/role/types/role.types";

const props = defineProps<RoleTypeBadgeProps>();

const roleTypeBadgeAttributes = computed<BadgeProps>(() => {
  const roleTypesBadgeAttributes: Record<RoleType, BadgeProps> = {
    villager: { severity: "success" },
    werewolf: { severity: "danger" },
    lonely: { severity: "info" },
    ambiguous: { severity: "warning" },
  };

  return roleTypesBadgeAttributes[props.roleType];
});
</script>