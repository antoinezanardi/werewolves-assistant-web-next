import { fileURLToPath } from "node:url";

const modules = [
  "@nuxtjs/tailwindcss",
  "@nuxt/test-utils/module",
  "@primevue/nuxt-module",
  "@nuxtjs/i18n",
  "@nuxt/image",
  "@nuxt/fonts",
  "@aksharahegde/nuxt-glow",
  process.env.NODE_ENV !== "test" && "@pinia/nuxt",
  "./modules/register-components/register-components.module.ts",
  "@vueuse/nuxt",
  "@nuxtjs/seo",
  "@nuxtjs/sitemap",
  "@nuxtjs/robots",
  "nuxt-og-image",
  "nuxt-schema-org",
  "@vite-pwa/nuxt",
  "@nuxt/devtools",
];

export default defineNuxtConfig({
  alias: {
    "@tests": fileURLToPath(new URL("./tests", import.meta.url)),
    "@modules": fileURLToPath(new URL("./modules", import.meta.url)),
  },
  app: {
    head: {
      htmlAttrs: { class: "dark-mode" },
      titleTemplate: "%s",
      link: [
        {
          rel: "icon",
          type: "image/png",
          href: "favicons/favicon.png",
        },
        {
          rel: "icon",
          type: "image/png",
          sizes: "16x16",
          href: "/favicons/favicon-16x16.png",
        },
        {
          rel: "icon",
          type: "image/png",
          sizes: "32x32",
          href: "/favicons/favicon-32x32.png",
        },
        {
          rel: "apple-touch-icon",
          sizes: "180x180",
          href: "/favicons/apple-touch-icon.png",
        },
      ],
    },
    pageTransition: {
      name: "page",
      mode: "out-in",
    },
    layoutTransition: {
      name: "page",
      mode: "out-in",
    },
  },
  build: {
    transpile: ["@fortawesome/vue-fontawesome"],
  },
  compatibilityDate: "2024-07-04",
  css: [
    "@fortawesome/fontawesome-svg-core/styles.css",
    "./assets/scss/custom.scss",
    "animate.css/animate.min.css",
  ],
  devtools: {
    enabled: true,
  },
  experimental: {
    renderJsonPayloads: false,
    buildCache: false,
  },
  ogImage: {
    enabled: process.env.NODE_ENV !== "test",
    fonts: [
      "Quicksand:300",
      "Quicksand:400",
      "Quicksand:500",
      "Quicksand:600",
      "Quicksand:700",
    ],
  },
  fonts: {
    families: [
      {
        global: true,
        preload: true,
        name: "Quicksand",
        provider: "google",
        weights: [
          "300",
          "400",
          "500",
          "600",
          "700",
        ],
      },
    ],
  },
  future: { compatibilityVersion: 4 },
  i18n: {
    vueI18n: "./modules/i18n/i18n.config.ts",
    defaultLocale: process.env.NUXT_PUBLIC_DEFAULT_LOCALE,
    locales: [
      {
        code: "fr",
        language: "fr-FR",
      },
      {
        code: "en",
        language: "en-US",
      },
    ],
    strategy: "no_prefix",
  },
  image: {
    domains: ["werewolves-assistant.com"],
  },
  linkChecker: {
    enabled: false,
  },
  modules,
  nitro: { moduleSideEffects: ["reflect-metadata"] },
  plugins: [
    "~/plugins/vanilla-tilt/vanilla-tilt.ts",
    "~/plugins/vue-lottie/vue-lottie.client.ts",
    "~/plugins/vue-draggable/vue-draggable.client.ts",
    "~/plugins/vue-countdown/vue-countdown.client.ts",
    "~/plugins/vue-ellipse-progress/vue-ellipse-progress.client.ts",
    "~/plugins/vue-font-awesome-icon/vue-font-awesome-icon.ts",
  ],
  primevue: {
    importTheme: { from: fileURLToPath(new URL("./config/primevue/primevue.custom-theme.ts", import.meta.url)) },
    components: {
      prefix: "PrimeVue",
      include: [
        "Accordion",
        "AccordionContent",
        "AccordionHeader",
        "AccordionPanel",
        "AutoComplete",
        "Badge",
        "Button",
        "ButtonGroup",
        "Chart",
        "ConfirmDialog",
        "ConfirmPopup",
        "Dialog",
        "Divider",
        "Fieldset",
        "FloatLabel",
        "IconField",
        "Inplace",
        "InputGroup",
        "InputIcon",
        "InputNumber",
        "InputText",
        "Menu",
        "MultiSelect",
        "PickList",
        "ProgressSpinner",
        "Rating",
        "ScrollTop",
        "Slider",
        "Tab",
        "TabList",
        "TabPanel",
        "TabPanels",
        "Tabs",
        "Tag",
        "Textarea",
        "Timeline",
        "Toast",
        "ToggleButton",
      ],
    },
    directives: {
      prefix: "p-",
      include: [
        "Tooltip",
        "Ripple",
      ],
    },
    autoImport: false,
    composables: { include: ["useToast"] },
    options: {
      ripple: true,
    },
  },
  pwa: {
    registerType: "autoUpdate",
    client: {
      periodicSyncForUpdates: 86400,
    },
    workbox: {
      globPatterns: ["**/*.{js,css,html,png,svg,ico,json,woff2}"],
      navigateFallbackDenylist: [/^.*$/u],
    },
    injectManifest: {
      globPatterns: ["**/*.{js,css,html,png,svg,ico,json,woff2}"],
    },
    manifest: {
      name: process.env.NUXT_SITE_NAME,
      short_name: process.env.NUXT_SITE_NAME,
      description: process.env.NUXT_SITE_DESCRIPTION,
      start_url: "/",
      categories: ["entertainment", "games", "utilities"],
      display: "fullscreen",
      orientation: "landscape-primary",
      background_color: "#000000",
      theme_color: "#000000",
      lang: process.env.NUXT_PUBLIC_DEFAULT_LOCALE,
      icons: [
        {
          src: "/favicons/android-chrome-192x192.png",
          sizes: "192x192",
          type: "image/png",
        },
      ],
    },
  },
  routeRules: {
    "/": { prerender: true },
    "/about": { swr: true },
    "/game-lobby": {
      swr: true,
      robots: true,
    },
    "/game/**": {
      ssr: false,
      robots: false,
    },
  },
  runtimeConfig: {
    public: {
      defaultLocale: "en",
      werewolvesAssistantApi: { baseUrl: "" },
      contactEmail: "",
    },
  },
  schemaOrg: {
    enabled: process.env.NODE_ENV !== "test",
    identity: {
      type: "Organization",
      name: process.env.NUXT_SITE_NAME ?? "Werewolves Assistant",
      url: process.env.NUXT_SITE_URL,
      logo: `${process.env.NUXT_SITE_URL}/_ipx/w_400/img/logo/square/werewolves-logo.webp`,
      sameAs: [
        "https://github.com/antoinezanardi/werewolves-assistant-api-next",
        "https://github.com/antoinezanardi/werewolves-assistant-web-next",
      ],
      contactPoint: {
        type: "ContactPoint",
        email: process.env.NUXT_PUBLIC_CONTACT_EMAIL,
        contactType: "Creator",
      },
    },
  },
  seo: {
    enabled: process.env.NODE_ENV !== "test",
    fallbackTitle: false,
    redirectToCanonicalSiteUrl: true,
  },
  tailwindcss: {
    quiet: true,
    cssPath: "~/assets/scss/tailwind.scss",
    configPath: "./config/tailwind/tailwind.config.ts",
  },
  telemetry: false,
  test: false,
  typescript: {
    shim: true,
    strict: true,
    tsConfig: {
      compilerOptions: {
        types: ["vitest/globals"],
        strictPropertyInitialization: false,
        esModuleInterop: true,
        module: "ESNext",
        moduleResolution: "Node",
        allowSyntheticDefaultImports: true,
        resolveJsonModule: true,
        emitDecoratorMetadata: true,
        experimentalDecorators: true,
        noUncheckedIndexedAccess: false,
      },
    },
    typeCheck: true,
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          api: "modern-compiler",
          silenceDeprecations: ["legacy-js-api"],
        },
      },
    },
    esbuild: {
      tsconfigRaw: {
        compilerOptions: { experimentalDecorators: true },
      },
    },
  },
});