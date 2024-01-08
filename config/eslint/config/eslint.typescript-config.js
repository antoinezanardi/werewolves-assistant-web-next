import TypescriptParser from "@typescript-eslint/parser";
import TypeScriptPlugin from "@typescript-eslint/eslint-plugin";
import { ERROR, OFF, NAMING_CONVENTION_DEFAULT_CONFIG, INDENT_SPACE_COUNT } from "../eslint.constants.js";

const ESLINT_TYPESCRIPT_CONFIG = Object.freeze({
  files: ["**/*.ts"],
  plugins: { "@typescript-eslint": TypeScriptPlugin },
  languageOptions: {
    parser: TypescriptParser,
    parserOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      ecmaFeatures: { jsx: true },
      project: "./config/eslint/tsconfig.json",
    },
  },
  rules: {
    // ---- TypeScript Rules -----
    // - Supported Rules (https://typescript-eslint.io/rules/#supported-rules)
    "@typescript-eslint/adjacent-overload-signatures": ERROR,
    "@typescript-eslint/array-type": ERROR,
    "@typescript-eslint/await-thenable": ERROR,
    "@typescript-eslint/ban-ts-comment": ERROR,
    "@typescript-eslint/ban-tslint-comment": ERROR,
    "@typescript-eslint/ban-types": ERROR,
    "@typescript-eslint/class-literal-property-style": ERROR,
    "@typescript-eslint/consistent-generic-constructors": [ERROR, "type-annotation"],
    "@typescript-eslint/consistent-indexed-object-style": ERROR,
    "@typescript-eslint/consistent-type-assertions": ERROR,
    "@typescript-eslint/consistent-type-definitions": [ERROR, "type"],
    "@typescript-eslint/consistent-type-exports": ERROR,
    "@typescript-eslint/consistent-type-imports": ERROR,
    "@typescript-eslint/explicit-function-return-type": ERROR,
    "@typescript-eslint/explicit-member-accessibility": ERROR,
    "@typescript-eslint/explicit-module-boundary-types": ERROR,
    "@typescript-eslint/member-delimiter-style": ERROR,
    "@typescript-eslint/member-ordering": ERROR,
    "@typescript-eslint/method-signature-style": ERROR,
    // TODO: below rule must be studied and set
    "@typescript-eslint/naming-convention": [
      ERROR,
      ...NAMING_CONVENTION_DEFAULT_CONFIG,
    ],
    "@typescript-eslint/no-base-to-string": ERROR,
    "@typescript-eslint/no-confusing-non-null-assertion": ERROR,
    "@typescript-eslint/no-confusing-void-expression": [ERROR, { ignoreArrowShorthand: true }],
    "@typescript-eslint/no-duplicate-enum-values": ERROR,
    "@typescript-eslint/no-dynamic-delete": ERROR,
    "@typescript-eslint/no-empty-interface": ERROR,
    "@typescript-eslint/no-explicit-any": ERROR,
    "@typescript-eslint/no-extra-non-null-assertion": ERROR,
    "@typescript-eslint/no-extraneous-class": OFF,
    "@typescript-eslint/no-floating-promises": ERROR,
    "@typescript-eslint/no-for-in-array": ERROR,
    // rule below is deprecated
    "@typescript-eslint/no-implicit-any-catch": OFF,
    "@typescript-eslint/no-inferrable-types": [ERROR, { ignoreProperties: true }],
    "@typescript-eslint/no-invalid-void-type": ERROR,
    "@typescript-eslint/no-meaningless-void-operator": ERROR,
    "@typescript-eslint/no-misused-new": ERROR,
    // TODO: is "checksVoidReturn" necessary ?
    "@typescript-eslint/no-misused-promises": [ERROR, { checksVoidReturn: false }],
    "@typescript-eslint/no-namespace": ERROR,
    "@typescript-eslint/no-non-null-asserted-nullish-coalescing": ERROR,
    "@typescript-eslint/no-non-null-assertion": ERROR,
    // rule below is deprecated and replaced by parameter-properties
    "@typescript-eslint/no-parameter-properties": OFF,
    "@typescript-eslint/no-redundant-type-constituents": ERROR,
    "@typescript-eslint/no-require-imports": ERROR,
    "@typescript-eslint/no-this-alias": ERROR,
    "@typescript-eslint/no-type-alias": [
      ERROR, {
        allowLiterals: "always",
        allowGenerics: "always",
        allowTupleTypes: "always",
        allowAliases: "in-unions",
      },
    ],
    "@typescript-eslint/no-unnecessary-boolean-literal-compare": ERROR,
    "@typescript-eslint/no-unnecessary-condition": ERROR,
    "@typescript-eslint/no-unnecessary-qualifier": ERROR,
    "@typescript-eslint/no-unnecessary-type-arguments": ERROR,
    "@typescript-eslint/no-unnecessary-type-assertion": ERROR,
    "@typescript-eslint/no-unnecessary-type-constraint": ERROR,
    "@typescript-eslint/no-unsafe-argument": ERROR,
    "@typescript-eslint/no-unsafe-assignment": ERROR,
    "@typescript-eslint/no-unsafe-call": ERROR,
    "@typescript-eslint/no-unsafe-member-access": ERROR,
    "@typescript-eslint/no-unsafe-return": ERROR,
    "@typescript-eslint/no-useless-empty-export": ERROR,
    "@typescript-eslint/no-var-requires": ERROR,
    "@typescript-eslint/non-nullable-type-assertion-style": ERROR,
    "@typescript-eslint/parameter-properties": [ERROR, { allow: ["private readonly"] }],
    "@typescript-eslint/prefer-as-const": ERROR,
    "@typescript-eslint/prefer-enum-initializers": ERROR,
    "@typescript-eslint/prefer-for-of": ERROR,
    "@typescript-eslint/prefer-function-type": ERROR,
    "@typescript-eslint/prefer-includes": ERROR,
    "@typescript-eslint/prefer-literal-enum-member": ERROR,
    "@typescript-eslint/prefer-namespace-keyword": ERROR,
    "@typescript-eslint/prefer-nullish-coalescing": ERROR,
    "@typescript-eslint/prefer-optional-chain": ERROR,
    "@typescript-eslint/prefer-readonly": ERROR,
    // TODO: I don't understand the rule below
    "@typescript-eslint/prefer-readonly-parameter-types": OFF,
    "@typescript-eslint/prefer-reduce-type-parameter": ERROR,
    "@typescript-eslint/prefer-regexp-exec": ERROR,
    "@typescript-eslint/prefer-return-this-type": ERROR,
    "@typescript-eslint/prefer-string-starts-ends-with": ERROR,
    "@typescript-eslint/prefer-ts-expect-error": ERROR,
    "@typescript-eslint/promise-function-async": ERROR,
    "@typescript-eslint/require-array-sort-compare": ERROR,
    "@typescript-eslint/restrict-plus-operands": ERROR,
    "@typescript-eslint/restrict-template-expressions": ERROR,
    "@typescript-eslint/sort-type-constituents": ERROR,
    // rule below is deprecated and replaced by sort-type-constituents
    "@typescript-eslint/sort-type-union-intersection-members": OFF,
    "@typescript-eslint/strict-boolean-expressions": ERROR,
    "@typescript-eslint/switch-exhaustiveness-check": ERROR,
    "@typescript-eslint/triple-slash-reference": ERROR,
    "@typescript-eslint/type-annotation-spacing": ERROR,
    "@typescript-eslint/typedef": ERROR,
    // TODO: rule below is OFF because it has conflict with useI18n, need investigation
    "@typescript-eslint/unbound-method": OFF,
    "@typescript-eslint/unified-signatures": ERROR,
    // ---- TypeScript Rules -----
    // - Extension Rules (https://typescript-eslint.io/rules/#extension-rules)
    "@typescript-eslint/brace-style": ERROR,
    "@typescript-eslint/comma-dangle": [ERROR, "always-multiline"],
    "@typescript-eslint/comma-spacing": [
      ERROR, {
        before: false,
        after: true,
      },
    ],
    "@typescript-eslint/default-param-last": ERROR,
    "@typescript-eslint/dot-notation": [
      ERROR, {
        allowPrivateClassPropertyAccess: true,
        allowProtectedClassPropertyAccess: true,
      },
    ],
    "@typescript-eslint/func-call-spacing": ERROR,
    "@typescript-eslint/indent": [
      ERROR,
      INDENT_SPACE_COUNT,
      { FunctionExpression: { parameters: "first" } },
    ],
    "@typescript-eslint/init-declarations": ERROR,
    "@typescript-eslint/keyword-spacing": ERROR,
    "@typescript-eslint/lines-between-class-members": [ERROR, "always", { exceptAfterSingleLine: true }],
    "@typescript-eslint/no-array-constructor": ERROR,
    "@typescript-eslint/no-dupe-class-members": ERROR,
    // rule below is OFF because it is overridden by "import/no-duplicates"
    "@typescript-eslint/no-duplicates": OFF,
    "@typescript-eslint/no-empty-function": ERROR,
    "@typescript-eslint/no-extra-parens": [
      ERROR, "all", {
        returnAssign: false,
        enforceForArrowConditionals: false,
      },
    ],
    "@typescript-eslint/no-extra-semi": ERROR,
    "@typescript-eslint/no-implied-eval": ERROR,
    "@typescript-eslint/no-invalid-this": ERROR,
    "@typescript-eslint/no-loop-func": ERROR,
    "@typescript-eslint/no-loss-of-precision": ERROR,
    "@typescript-eslint/no-magic-numbers": [
      ERROR, {
        ignoreArrayIndexes: true,
        ignoreDefaultValues: true,
        ignoreEnums: true,
        ignore: [0, -1, 1],
      },
    ],
    "@typescript-eslint/no-redeclare": ERROR,
    "@typescript-eslint/no-restricted-imports": [
      ERROR, {
        patterns: [
          {
            group: ["./"],
            message: "Relative imports to children directories are not allowed.",
          },
          {
            group: ["../"],
            message: "Relative imports from parent directories are not allowed.",
          },
        ],
      },
    ],
    "@typescript-eslint/no-shadow": [
      ERROR, {
        hoist: "never",
        ignoreFunctionTypeParameterNameValueShadow: true,
      },
    ],
    "@typescript-eslint/no-throw-literal": ERROR,
    "@typescript-eslint/no-unused-expressions": ERROR,
    "@typescript-eslint/no-unused-vars": ERROR,
    // rule below is OFF because it is not relevant is .vue SFC
    "@typescript-eslint/no-use-before-define": OFF,
    "@typescript-eslint/no-useless-constructor": ERROR,
    "@typescript-eslint/object-curly-spacing": [ERROR, "always"],
    // TODO: rule is not completely set
    "@typescript-eslint/padding-line-between-statements": [
      ERROR, {
        blankLine: "always",
        prev: ["interface", "type", "class", "export"],
        next: "*",
      }, {
        blankLine: "always",
        prev: "*",
        next: ["interface", "type", "class", "export", "function"],
      }, {
        blankLine: "never",
        prev: "*",
        next: ["return"],
      },
    ],
    "@typescript-eslint/quotes": [ERROR, "double", { allowTemplateLiterals: true }],
    "@typescript-eslint/require-await": ERROR,
    "@typescript-eslint/return-await": ERROR,
    "@typescript-eslint/semi": [ERROR, "always"],
    "@typescript-eslint/space-before-blocks": [
      ERROR, {
        functions: "always",
        keywords: "always",
        classes: "always",
      },
    ],
    "@typescript-eslint/space-before-function-paren": [ERROR, "never"],
    "@typescript-eslint/space-infix-ops": ERROR,
  },
});

export { ESLINT_TYPESCRIPT_CONFIG };