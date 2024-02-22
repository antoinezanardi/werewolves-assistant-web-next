<template>
  <div id="about-available-roles">
    <div class="align-items-center d-flex">
      <RoleImage
        id="about-available-roles-title-role-image"
        :alt="$t('components.AboutAvailableRoles.availableRolesImage')"
        class="me-3"
        :role-name="RoleNames.ANGEL"
        sizes="50px"
      />

      <h2 id="about-available-roles-title">
        {{ $t('components.AboutAvailableRoles.availableRoles') }}
      </h2>
    </div>

    <hr>

    <div
      v-if="!roles"
      id="loading-roles-container"
      class="align-items-center d-flex flex-column justify-content-center"
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

      <VuePrimeAccordion class="w-100">
        <VuePrimeAccordionTab
          v-for="role in roles"
          :key="role.name"
          :pt="{ 'headerAction': { 'aria-label': getAvailableRoleAccordionHeaderAriaLabel(role.name) } }"
        >
          <template #header>
            <div class="align-items-center available-role-image-header d-flex">
              <RoleImage
                :alt="getAvailableRoleHeaderImageAlt(role.name)"
                :role-name="role.name"
                sizes="40px"
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
import { RoleNames } from "~/composables/api/role/enums/role.enums";
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

function getAvailableRoleAccordionHeaderAriaLabel(roleName: RoleNames): string {
  return t("components.AboutAvailableRoles.clickToExpandRoleDescription", { role: getRoleNameLabel(roleName) });
}

function getAvailableRoleHeaderImageAlt(roleName: RoleNames): string {
  return t("components.AboutAvailableRoles.availableRoleImage", { role: getRoleNameLabel(roleName) });
}
</script>