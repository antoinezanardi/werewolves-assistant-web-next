import type { Mock } from "vitest";
import { ref } from "vue";
import type { Ref } from "vue";

type MockedI18n = {
  locale: Ref<"en" | "fr">
  t: Mock;
};

function createFakeI18n(i18n: Partial<MockedI18n> = {}): MockedI18n {
  return {
    locale: ref("en"),
    t: vi.fn(),
    ...i18n,
  };
}

export { createFakeI18n };