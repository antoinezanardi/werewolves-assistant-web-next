import { fileURLToPath } from "node:url";

const modules = [
  "@nuxtjs/tailwindcss",
  "@nuxt/test-utils/module",
  "@primevue/nuxt-module",
  "@nuxtjs/i18n",
  "@nuxt/image",
  "@nuxtjs/google-fonts",
  "@aksharahegde/nuxt-glow",
  process.env.NODE_ENV !== "test" && "@pinia/nuxt",
  "./modules/register-components/register-components.module.ts",
  "@vueuse/nuxt",
  "@nuxtjs/seo",
  "@nuxtjs/sitemap",
  "@nuxtjs/robots",
  "nuxt-link-checker",
  "@vite-pwa/nuxt",
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
    "./assets/css/google-fonts.css",
    "animate.css/animate.min.css",
  ],
  devtools: { enabled: true },
  experimental: {
    renderJsonPayloads: false,
    buildCache: true,
  },
  future: { compatibilityVersion: 4 },
  googleFonts: {
    display: "swap",
    families: { Quicksand: { wght: "300..700" } },
    outputDir: "assets/fonts",
    stylePath: "../css/google-fonts.css",
    fontsDir: "./",
    preload: true,
    text: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyzÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖØÙÚÛÜÝÞßàáâãäåæçèéêëìíîïðñòóôõöøùúûüýþÿ0123456789.,;:!?'\"™",
    overwriting: false,
  },
  i18n: {
    vueI18n: "./modules/i18n/i18n.config.ts",
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
    domains: [
      "antoinezanardi.fr",
      "appspot.com",
    ],
  },
  linkChecker: {
    enabled: false,
  },
  modules,
  nitro: { moduleSideEffects: ["reflect-metadata"] },
  ogImage: {
    enabled: false,
  },
  plugins: [
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
        "Button",
        "ButtonGroup",
        "Chart",
        "ConfirmPopup",
        "ConfirmDialog",
        "Dialog",
        "Divider",
        "Fieldset",
        "Menu",
        "ProgressSpinner",
        "Accordion",
        "AccordionPanel",
        "AccordionHeader",
        "AccordionContent",
        "Badge",
        "InputGroup",
        "InputText",
        "InputNumber",
        "FloatLabel",
        "AutoComplete",
        "MultiSelect",
        "ScrollTop",
        "Slider",
        "Toast",
        "ToggleButton",
        "TabPanel",
        "TabView",
        "Tag",
        "Timeline",
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
    "/game-lobby": { ssr: false },
    "/game": { ssr: false },
    "/game/**": { ssr: false },
  },
  runtimeConfig: {
    public: {
      defaultLocale: "en",
      werewolvesAssistantApi: { baseUrl: "" },
    },
  },
  schemaOrg: {
    enabled: false,
  },
  seo: {
    fallbackTitle: false,
    redirectToCanonicalSiteUrl: true,
  },
  tailwindcss: {
    quiet: true,
    cssPath: "~/assets/scss/tailwind.scss",
    configPath: "./config/tailwind/tailwind.config.ts",
  },
  telemetry: false,
  test: true,
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
    esbuild: {
      tsconfigRaw: {
        compilerOptions: { experimentalDecorators: true },
      },
    },
  },
});