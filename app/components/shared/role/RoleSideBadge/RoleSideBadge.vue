<template>
  <VuePrimeBadge
    id="role-side-badge"
    :severity="roleTypeBadgeAttributes.severity"
    :size="size"
    :value="badgeValue"
  />
</template>

<script setup lang="ts">
import type { BadgeProps } from "primevue/badge";

import type { RoleSideBadgeProps } from "~/components/shared/role/RoleSideBadge/role-side-badge-types";
import type { RoleSide } from "~/composables/api/role/types/role.types";

const props = defineProps<RoleSideBadgeProps>();

const { t } = useI18n();

const roleTypeBadgeAttributes = computed<BadgeProps>(() => {
  const roleTypesBadgeAttributes: Record<RoleSide, BadgeProps> = {
    villagers: { severity: "success" },
    werewolves: { severity: "danger" },
  };

  return roleTypesBadgeAttributes[props.roleSide];
});

const badgeValue = computed<string>(() => {
  if (props.roleSide === "villagers") {
    return t("components.RoleSideBadge.villagersSide");
  }
  return t("components.RoleSideBadge.werewolvesSide");
});
</script>