const MAX_LENGTH = 180;
const MAX_NESTED_CALLBACK = 5;
const MAX_PARAMS = 8;
const INDENT_SPACE_COUNT = 2;
const ERROR = "error";
const WARNING = "warn";
const OFF = "off";
const MAX_LENGTH_DEFAULT_CONFIG = {
  code: MAX_LENGTH,
  ignoreTemplateLiterals: true,
  ignoreRegExpLiterals: true,
  ignorePattern: "^import\\s.+\\sfrom\\s.+;$",
};
const READONLY = "readonly";
const BOOLEAN_PREFIXES = ["is", "was", "are", "were", "should", "has", "can", "does", "do", "did", "must"];
const NAMING_CONVENTION_DEFAULT_CONFIG = [
  {
    selector: ["enumMember"],
    format: ["UPPER_CASE"],
  },
  {
    selector: ["class", "interface", "typeParameter", "enum"],
    format: ["PascalCase"],
  },
  {
    selector: ["function", "classProperty", "classMethod", "accessor"],
    format: ["camelCase"],
    leadingUnderscore: "allow",
  },
  {
    selector: ["variable", "classProperty"],
    types: ["boolean"],
    format: ["PascalCase"],
    prefix: BOOLEAN_PREFIXES,
  },
  {
    selector: ["variable"],
    modifiers: ["exported"],
    format: ["UPPER_CASE"],
  },
  {
    selector: ["objectLiteralProperty"],
    modifiers: ["exported"],
    format: ["UPPER_CASE"],
  },
];

export {
  MAX_LENGTH,
  MAX_NESTED_CALLBACK,
  MAX_PARAMS,
  INDENT_SPACE_COUNT,
  ERROR,
  WARNING,
  OFF,
  READONLY,
  MAX_LENGTH_DEFAULT_CONFIG,
  NAMING_CONVENTION_DEFAULT_CONFIG,
};