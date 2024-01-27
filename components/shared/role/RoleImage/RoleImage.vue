<template>
  <NuxtImg
    :aria-label="imageAriaLabel"
    class="role-image"
    :height="sizes"
    :placeholder="backImageSrc"
    :src="roleImageSrc"
    :width="sizes"
  />
</template>

<script setup lang="ts">
import type { RoleImageProps } from "~/components/shared/role/RoleImage/role-image.types";
import { useRoleName } from "~/composables/api/role/useRoleName";

const props = withDefaults(defineProps<RoleImageProps>(), {
  sizes: "50",
  definition: "normal",
});

const { t } = useI18n();

const { getRoleNameLabel } = useRoleName();

const runtimeConfig = useRuntimeConfig();

const backImageSrc = "svg/infinite-spinner.svg";

const roleImageSrc = computed<string>(() => {
  if (!props.roleName) {
    return backImageSrc;
  }
  const apiBaseUrl = runtimeConfig.public.werewolvesAssistantApi.baseUrl;
  const imageSuffix = props.definition === "normal" ? "" : `-${props.definition}`;
  return `${apiBaseUrl}/public/assets/images/roles/${props.roleName}/${props.roleName}${imageSuffix}.jpeg`;
});

const imageAriaLabel = computed<string>(() => {
  if (!props.roleName) {
    return t("components.RoleImage.back");
  }
  return getRoleNameLabel(props.roleName);
});
</script>

<style lang="scss" scoped>
.role-image {
  border-radius: 10%;
  border: 3px solid #1c1c1c;
}
</style>