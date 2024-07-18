<template>
  <NuxtImg
    id="role-flipping-image-svg-icon"
    :alt="$t('components.RoleFlippingImageSvgIcon.iconAlt')"
    class="absolute animate__bounceIn bottom-4 right-2"
    :height="svgSize"
    placeholder="/svg/misc/infinite-spinner.svg"
    :src="svgIconPath"
    :width="svgSize"
  />
</template>

<script setup lang="ts">
import type { RoleFlippingImageSvgIconProps } from "~/components/shared/role/RoleImage/RoleFlippingImage/RoleFlippingImageSvgIcon/role-flipping-image-svg-icon.types";

defineProps<RoleFlippingImageSvgIconProps>();

const svgSize = "75";
</script>