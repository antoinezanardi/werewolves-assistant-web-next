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
  ],
  devtools: { enabled: true },
  experimental: { renderJsonPayloads: false },
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
  primevue: {
    cssLayerOrder: "tailwind-base, tailwind-utilities, primevue",
    components: {
      prefix: "VuePrime",
      include: [
        "Button",
        "Dialog",
        "Divider",
        "Menu",
        "ProgressSpinner",
        "Accordion",
        "AccordionTab",
        "Badge",
        "InputGroup",
        "InputText",
        "FloatLabel",
        "AutoComplete",
        "ScrollTop",
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
  runtimeConfig: {
    public: {
      defaultLocale: "en",
      werewolvesAssistantApi: { baseUrl: "" },
    },
  },
  tailwindcss: {
    quiet: true,
    cssPath: "~/assets/scss/tailwind.scss",
    configPath: "~/config/tailwind/tailwind.config.ts",
  },
  typescript: {
    strict: true,
    typeCheck: true,
    shim: true,
  },
  vite: { esbuild: { tsconfigRaw: { compilerOptions: { experimentalDecorators: true } } } },
});