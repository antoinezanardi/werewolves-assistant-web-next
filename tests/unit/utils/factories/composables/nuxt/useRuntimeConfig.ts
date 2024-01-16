import type { NitroRuntimeConfigApp } from "nitropack";
import type { RuntimeConfig } from "nuxt/schema";

function createFakeUseRuntimeConfig(runtimeConfig: Partial<RuntimeConfig> = {}): RuntimeConfig {
  return {
    ...runtimeConfig,
    app: {} as NitroRuntimeConfigApp,
    public: {
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

export { createFakeUseRuntimeConfig };