import type { ClassTransformOptions } from "class-transformer";

const DEFAULT_PLAIN_TO_INSTANCE_OPTIONS: Readonly<ClassTransformOptions> = {
  excludeExtraneousValues: true,
  exposeDefaultValues: true,
};

export { DEFAULT_PLAIN_TO_INSTANCE_OPTIONS };