<template>
  <div id="about-available-roles">
    <div class="align-items-center d-flex">
      <RoleImage
        class="me-3"
        :role-name="RoleNames.ANGEL"
        sizes="50px"
      />

      <h2>
        {{ $t('components.AboutAvailableRoles.availableRoles') }}
      </h2>
    </div>

    <hr>

    <div
      v-if="!roles"
      class="align-items-center d-flex flex-column justify-content-center"
    >
      <VuePrimeProgressSpinner/>

      <small>{{ $t("components.AboutAvailableRoles.loadingRoles") }}</small>
    </div>

    <div v-else>
      <p>
        {{ availableRolesText }}
      </p>

      <VuePrimeAccordion>
        <VuePrimeAccordionTab
          v-for="role in roles"
          :key="role.name"
        >
          <template #header>
            <div class="align-items-center d-flex">
              <RoleImage
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
import AboutAvailableRoleDescription from "~/components/pages/about/AboutAvailableRoles/AboutAvailableRoleDescription/AboutAvailableRoleDescription.vue";
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
</script>