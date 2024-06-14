import type { RuntimeConfig } from "nuxt/schema";

import { I18N_TEST_LOCALE } from "@modules/i18n/i18n.constants";

function createFakeRuntimeConfig(runtimeConfig: Partial<RuntimeConfig> = {}): RuntimeConfig {
  return {
    ...runtimeConfig,
    app: {
      buildId: "test",
      baseURL: "",
      buildAssetsDir: "",
      cdnURL: "",
    },
    public: {
      defaultLocale: I18N_TEST_LOCALE,
      werewolvesAssistantApi: { baseUrl: "http://127.0.0.1" },
      i18n: {
        defaultLocale: I18N_TEST_LOCALE,
        baseUrl: "http://127.0.0.1",
        defaultDirection: "ltr",
        strategy: "prefix_except_default",
        lazy: false,
        routesNameSeparator: "",
        defaultLocaleRouteNameSuffix: "",
        skipSettingLocaleOnNavigate: false,
        differentDomains: false,
        rootRedirect: "root",
        trailingSlash: false,
        configLocales: [],
        detectBrowserLanguage: {
          useCookie: true,
          cookieKey: "i18n_redirected",
          alwaysRedirect: true,
          cookieCrossOrigin: true,
          cookieDomain: "",
          cookieSecure: true,
          fallbackLocale: "",
          redirectOn: "",
        },
        experimental: {
          localeDetector: "path",
          switchLocalePathLinkSSR: true,
          autoImportTranslationFunctions: false,
        },
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