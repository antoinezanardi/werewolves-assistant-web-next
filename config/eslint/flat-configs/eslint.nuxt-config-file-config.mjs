import { OFF, READONLY } from "../eslint.constants.mjs";

const ESLINT_NUXT_CONFIG_FILE_CONFIG = {
  name: "nuxt-config-file",
  files: ["nuxt.config.ts"],

  languageOptions: { globals: { CustomMatchers: READONLY } },
  rules: {
    camelcase: OFF,
  },
};

export { ESLINT_NUXT_CONFIG_FILE_CONFIG };