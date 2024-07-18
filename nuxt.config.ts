import { fileURLToPath } from "node:url";

const modules = [
  "@nuxtjs/tailwindcss",
  "@nuxt/test-utils/module",
  "nuxt-primevue",
  "@nuxtjs/i18n",
  "@nuxt/image",
  "@nuxtjs/google-fonts",
  "@aksharahegde/nuxt-glow",
  process.env.NODE_ENV !== "test" && "@pinia/nuxt",
  "./modules/register-components/register-components.module.ts",
  "@vueuse/nuxt",
];

export default defineNuxtConfig({
  alias: {
    "@tests": fileURLToPath(new URL("./tests", import.meta.url)),
    "@modules": fileURLToPath(new URL("./modules", import.meta.url)),
  },
  app: {
    head: {
      link: [
        {
          rel: "icon",
          type: "image/png",
          href: "/favicon.png",
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
  css: [
    "primevue/resources/themes/lara-dark-blue/theme.css",
    "@fortawesome/fontawesome-free/css/all.css",
    "./assets/scss/custom.scss",
    "./assets/css/google-fonts.css",
    "animate.css/animate.min.css",
  ],
  devtools: { enabled: true },
  experimental: { renderJsonPayloads: false },
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
  i18n: { vueI18n: "./modules/i18n/i18n.config.ts" },
  image: {
    domains: [
      "antoinezanardi.fr",
      "appspot.com",
    ],
  },
  modules,
  nitro: { moduleSideEffects: ["reflect-metadata"] },
  pinia: { storesDirs: [] },
  plugins: [
    "~/plugins/vue-lottie/vue-lottie.client.ts",
    "~/plugins/vue-draggable/vue-draggable.client.ts",
    "~/plugins/vue-countdown/vue-countdown.client.ts",
    "~/plugins/vue-ellipse-progress/vue-ellipse-progress.client.ts",
  ],
  primevue: {
    cssLayerOrder: "tailwind-base, tailwind-utilities, primevue",
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
        "AccordionTab",
        "Badge",
        "InputGroup",
        "InputText",
        "InputNumber",
        "FloatLabel",
        "AutoComplete",
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
    composables: { include: ["useToast"] },
    options: { ripple: true },
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
  compatibilityDate: "2024-07-04",
});