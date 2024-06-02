import type { RoleImageProps } from "~/components/shared/role/RoleImage/role-image.types";

type RoleFlippingImageProps = RoleImageProps & {
  imageClasses?: string;
  svgIconPath?: string;
};

export type { RoleFlippingImageProps };