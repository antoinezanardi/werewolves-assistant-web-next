<template>
  <NuxtImg
    :alt="imageAlt"
    class="border-4 border-gray-800 role-image rounded-lg"
    :class="imageClasses"
    :height="sizes"
    placeholder="/svg/misc/infinite-spinner.svg"
    :src="roleImageSrc"
    :width="sizes"
  />
</template>

<script setup lang="ts">
import type { RoleImageProps } from "~/components/shared/role/RoleImage/role-image.types";
import { removeTrailingSlashes } from "~/utils/url.utils";

const props = withDefaults(defineProps<RoleImageProps>(), {
  sizes: "50px",
  definition: "normal",
});

const { t } = useI18n();

const runtimeConfig = useRuntimeConfig();

const backImageSrc = "/img/role/back.jpeg";

const roleImageSrc = computed<string>(() => {
  if (props.roleName === undefined) {
    return backImageSrc;
  }

  const apiBaseUrl = removeTrailingSlashes(runtimeConfig.public.werewolvesAssistantApi.baseUrl);
  const imageSuffix = props.definition === "normal" ? "" : `-${props.definition}`;

  return `${apiBaseUrl}/public/assets/images/roles/${props.roleName}/${props.roleName}${imageSuffix}.jpeg`;
});

const imageClasses = computed<string>(() => `h-[${props.sizes}px] w-[${props.sizes}px]`);

const imageAlt = computed<string>(() => {
  if (props.alt !== undefined) {
    return props.alt;
  }
  if (props.roleName !== undefined) {
    return t(`shared.role.name.${props.roleName}`);
  }
  return t("components.RoleImage.back");
});
</script>