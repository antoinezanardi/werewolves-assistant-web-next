import type { Mock } from "vitest";
import { ref } from "vue";
import type { Ref } from "vue";

import fr from "@modules/i18n/locales/fr.json";
import en from "@modules/i18n/locales/en.json";

type MockedI18n = {
  locale: Ref<"en" | "fr">;
  messages: Ref<{
    en: typeof en;
    fr: typeof fr;
  }>;
  t: Mock;
};

function createFakeI18n(i18n: Partial<MockedI18n> = {}): MockedI18n {
  return {
    locale: ref("en"),
    messages: ref({
      en,
      fr,
    }),
    t: vi.fn((...args: unknown[]) => args.map(arg => (typeof arg === "object" ? JSON.stringify(arg) : arg)).join(", ")),
    ...i18n,
  };
}

export { createFakeI18n };