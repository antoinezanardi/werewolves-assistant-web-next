import { expect } from "vitest";
import matchers from "jest-extended";

expect.extend(matchers);

declare module "vitest" {
  type Assertion<T = unknown> = CustomMatchers<T>;

  type AsymmetricMatchersContaining<T = unknown> = CustomMatchers<T>;

  type ExpectStatic<T = unknown> = CustomMatchers<T>;
}