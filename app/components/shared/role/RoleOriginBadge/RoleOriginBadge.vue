<template>
  <PrimeVueBadge
    v-p-tooltip="$t('components.RoleOriginBadge.roleOrigin')"
    class="cursor-help role-origin-badge"
    :size="size"
    :value="$t(`components.RoleOriginBadge.${roleOrigin}`)"
  />
</template>

<script setup lang="ts">
import type { RoleOriginBadgeProps } from "~/components/shared/role/RoleOriginBadge/role-origin-badge.types";

defineProps<RoleOriginBadgeProps>();
</script>