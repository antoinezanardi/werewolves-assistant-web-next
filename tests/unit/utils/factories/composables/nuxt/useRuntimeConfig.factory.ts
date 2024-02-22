import type { RuntimeConfig } from "nuxt/schema";

import { I18N_TEST_LOCALE } from "~/modules/i18n/i18n.constants";

function createFakeRuntimeConfig(runtimeConfig: Partial<RuntimeConfig> = {}): RuntimeConfig {
  return {
    ...runtimeConfig,
    app: {
      baseURL: "",
      buildAssetsDir: "",
      cdnURL: "",
    },
    public: {
      defaultLocale: I18N_TEST_LOCALE,
      werewolvesAssistantApi: { baseUrl: "http://127.0.0.1" },
      i18n: {
        baseUrl: "http://127.0.0.1",
        locales: [{ code: "en", iso: "en-US", file: "en-US.json", name: "English" }],
      },
      primevue: {
        components: [],
        directives: [],
        config: [],
        options: { ripple: true },
        composables: [],
        usePrimeVue: true,
        styles: [],
        injectStylesAsStringToTop: [],
        resolvePath: "",
        services: [],
        cssLayerOrder: "",
        importPT: "",
        injectStylesAsString: [],
      },
    },
  };
}

export { createFakeRuntimeConfig };