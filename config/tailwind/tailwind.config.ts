import type { Config } from "tailwindcss";

import { ERROR_COLOR, INFO_COLOR, PRIMARY_COLOR, SECONDARY_COLOR, SUCCESS_COLOR, WARNING_COLOR } from "./constants/tailwind.color-constants";

export default {
  content: [],
  theme: {
    extend: {
      colors: {
        primary: PRIMARY_COLOR,
        secondary: SECONDARY_COLOR,
        success: SUCCESS_COLOR,
        error: ERROR_COLOR,
        warning: WARNING_COLOR,
        info: INFO_COLOR,
      },
    },
    container: { center: true },
    fontFamily: { sans: ["Quicksand", "Arial", "sans-serif"] },
  },
} satisfies Config;