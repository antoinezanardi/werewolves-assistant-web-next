<template>
  <div id="about-available-roles">
    <div class="flex items-center">
      <RoleImage
        id="about-available-roles-title-role-image"
        :alt="$t('components.AboutAvailableRoles.availableRolesImage')"
        class="me-3"
        role-name="angel"
        sizes="50"
      />

      <h2 id="about-available-roles-title">
        {{ $t('components.AboutAvailableRoles.availableRoles') }}
      </h2>
    </div>

    <VuePrimeDivider/>

    <div
      v-if="!roles"
      id="loading-roles-container"
      class="flex flex-col items-center justify-center"
    >
      <TextProgressSpinner
        id="loading-roles-spinner"
        :text="$t('components.AboutAvailableRoles.loadingRoles')"
      />
    </div>

    <div v-else>
      <p id="about-available-roles-first-section">
        {{ availableRolesText }}
      </p>

      <VuePrimeAccordion class="w-full">
        <VuePrimeAccordionTab
          v-for="role in roles"
          :key="role.name"
          :pt="{ 'headerAction': { 'aria-label': getAvailableRoleAccordionHeaderAriaLabel(role.name) } }"
        >
          <template #header>
            <div class="available-role-image-header flex items-center">
              <RoleImage
                :alt="getAvailableRoleHeaderImageAlt(role.name)"
                :role-name="role.name"
                sizes="40"
              />

              <div class="ms-2">
                {{ getRoleNameLabel(role.name) }}
              </div>
            </div>
          </template>

          <AboutAvailableRoleDescription :role="role"/>
        </VuePrimeAccordionTab>
      </VuePrimeAccordion>
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";

import AboutAvailableRoleDescription from "~/components/pages/about/AboutAvailableRoles/AboutAvailableRoleDescription/AboutAvailableRoleDescription.vue";
import TextProgressSpinner from "~/components/shared/misc/TextProgressSpinner/TextProgressSpinner.vue";
import RoleImage from "~/components/shared/role/RoleImage/RoleImage.vue";
import type { RoleName } from "~/composables/api/role/types/role.types";
import { useRoleName } from "~/composables/api/role/useRoleName";
import { useRolesStore } from "~/stores/role/useRolesStore";

const { t } = useI18n();
const { getRoleNameLabel } = useRoleName();
const { roles } = storeToRefs(useRolesStore());

const availableRolesText = computed<string | undefined>(() => {
  if (!roles.value) {
    return undefined;
  }
  return t("components.AboutAvailableRoles.assistantHasManyRoles", roles.value.length);
});

function getAvailableRoleAccordionHeaderAriaLabel(roleName: RoleName): string {
  return t("components.AboutAvailableRoles.clickToExpandRoleDescription", { role: getRoleNameLabel(roleName) });
}

function getAvailableRoleHeaderImageAlt(roleName: RoleName): string {
  return t("components.AboutAvailableRoles.availableRoleImage", { role: getRoleNameLabel(roleName) });
}
</script>