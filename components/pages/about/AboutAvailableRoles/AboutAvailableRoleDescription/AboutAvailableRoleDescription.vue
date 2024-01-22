<template>
  <VuePrimeAccordionTab :header="role.name">
    <template #header>
      <div>
        <RoleImage
          :role-name="role.name"
          sizes="50px"
        />

        <div>
          {{ getRoleNameLabel(role.name) }}
        </div>
      </div>
    </template>

    <div>
      coucou
    </div>
  </VuePrimeAccordionTab>
</template>

<script setup lang="ts">
import type { AboutAvailableRoleDescriptionProps } from "~/components/pages/about/AboutAvailableRoles/AboutAvailableRoleDescription/about-available-role-description.types";
import RoleImage from "~/components/shared/role/RoleImage/RoleImage.vue";
import { useRoleName } from "~/composables/api/role/useRoleName";

defineProps<AboutAvailableRoleDescriptionProps>();

const { getRoleNameLabel } = useRoleName();
</script>