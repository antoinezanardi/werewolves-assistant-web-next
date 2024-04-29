<template>
  <div class="flex">
    <div
      id="role-left-description"
      class="flex flex-col items-center justify-center"
    >
      <RoleImage
        :alt="getRoleDescriptionLeftImageAlt(role.name)"
        class="available-role-description-role-image"
        :role-name="role.name"
        sizes="150"
      />

      <h2 class="available-role-description-role-name mt-3">
        {{ getRoleNameLabel(role.name) }}
      </h2>

      <RoleTypeBadge
        class="available-role-description-role-type-badge mt-3"
        :role-type="role.type"
      />

      <RoleOriginBadge
        class="available-role-description-role-origin-badge mt-3"
        :role-origin="role.origin"
      />
    </div>

    <RoleDescriptionLines :role="role"/>
  </div>
</template>

<script setup lang="ts">
import type { AboutAvailableRoleDescriptionProps } from "~/components/pages/about/AboutAvailableRoles/AboutAvailableRoleDescription/about-available-role-description.types";
import RoleDescriptionLines from "~/components/shared/role/RoleDescriptionLines/RoleDescriptionLines.vue";
import RoleImage from "~/components/shared/role/RoleImage/RoleImage.vue";
import RoleOriginBadge from "~/components/shared/role/RoleOriginBadge/RoleOriginBadge.vue";
import RoleTypeBadge from "~/components/shared/role/RoleTypeBadge/RoleTypeBadge.vue";
import type { RoleName } from "~/composables/api/role/types/role.types";
import { useRoleName } from "~/composables/api/role/useRoleName";

defineProps<AboutAvailableRoleDescriptionProps>();

const { t } = useI18n();

const { getRoleNameLabel } = useRoleName();

function getRoleDescriptionLeftImageAlt(roleName: RoleName): string {
  return t("components.AboutAvailableRoleDescription.roleDescriptionLeftImageAlt", { role: getRoleNameLabel(roleName) });
}
</script>

<style scoped lang="scss">
#role-left-description {
  min-width: 200px;
}
</style>