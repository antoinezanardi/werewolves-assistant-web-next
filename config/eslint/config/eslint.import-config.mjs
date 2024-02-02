import { ERROR, OFF } from "../eslint.constants.mjs";

const ESLINT_IMPORT_CONFIG = {
  languageOptions: {
    parserOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
    },
  },
  settings: {
    "import/parsers": { espree: [".js", ".cjs", ".mjs", ".jsx", "vue"] },
    "import/resolver": {
      typescript: true,
      node: true,
    },
  },
  rules: {
    // ---- ESLint Import Rules -----
    // - Helpful warnings (https://github.com/import-js/eslint-plugin-import#helpful-warnings)
    "import/export": ERROR,
    "import/no-deprecated": ERROR,
    "import/no-empty-named-blocks": ERROR,
    "import/no-extraneous-dependencies": [ERROR, { peerDependencies: false }],
    "import/no-mutable-exports": ERROR,
    "import/no-named-as-default": ERROR,
    "import/no-named-as-default-member": ERROR,
    "import/no-unused-modules": ERROR,
    // - Module systems (https://github.com/import-js/eslint-plugin-import#module-systems)
    "import/no-amd": ERROR,
    "import/no-commonjs": ERROR,
    "import/no-import-module-exports": ERROR,
    "import/no-nodejs-modules": OFF,
    "import/unambiguous": ERROR,
    // - Static analysis (https://github.com/import-js/eslint-plugin-import#static-analysis)
    "import/default": ERROR,
    "import/named": OFF,
    "import/namespace": ERROR,
    "import/no-absolute-path": ERROR,
    "import/no-cycle": ERROR,
    "import/no-dynamic-require": ERROR,
    "import/no-internal-modules": [
      ERROR, {
        allow: [
          "~/**/*",
          "@/**/*",
          "@nuxt/**/*",
          "nuxt/*",
          "primevue/*",
          "\\#app/composables/*",
        ],
      },
    ],
    "import/no-relative-packages": ERROR,
    "import/no-relative-parent-imports": OFF,
    "import/no-restricted-paths": ERROR,
    "import/no-self-import": ERROR,
    "import/no-unresolved": ERROR,
    "import/no-useless-path-segments": ERROR,
    "import/no-webpack-loader-syntax": ERROR,
    // // - Style guide (https://github.com/import-js/eslint-plugin-import#style-guide)
    "import/consistent-type-specifier-style": [ERROR, "prefer-top-level"],
    "import/dynamic-import-chunkname": OFF,
    "import/exports-last": ERROR,
    "import/extensions": OFF,
    "import/first": ERROR,
    "import/group-exports": ERROR,
    "import/max-dependencies": [
      ERROR, {
        max: 25,
        ignoreTypeImports: true,
      },
    ],
    "import/newline-after-import": ERROR,
    "import/no-anonymous-default-export": ERROR,
    "import/no-default-export": ERROR,
    "import/no-duplicates": ERROR,
    "import/no-named-default": ERROR,
    "import/no-named-export": OFF,
    "import/no-namespace": ERROR,
    "import/no-unassigned-import": [ERROR, { allow: ["reflect-metadata"] }],
    "import/prefer-default-export": OFF,
    "import/order": [
      ERROR, {
        "warnOnUnassignedImports": true,
        "groups": ["builtin", "external", "internal", "parent", "sibling"],
        "pathGroups": [
          { pattern: "@/components/**", group: "parent" },
          { pattern: "@/composables/**", group: "parent", position: "after" },
          { pattern: "@/assets/**", group: "parent", position: "after" },
          { pattern: "@/tests/**", group: "parent", position: "after" },
        ],
        "pathGroupsExcludedImportTypes": ["@/tests/"],
        "newlines-between": "always",
      },
    ],
  },
};

export { ESLINT_IMPORT_CONFIG };