import type { Config } from "tailwindcss";

import { DAY_COLOR, ERROR_COLOR, INFO_COLOR, NIGHT_COLOR, PRIMARY_COLOR, SECONDARY_COLOR, SUCCESS_COLOR, WARNING_COLOR } from "./constants/tailwind.color-constants";

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
        day: DAY_COLOR,
        night: NIGHT_COLOR,
      },
      spacing: {
        "1/10": "10%",
        "9/10": "90%",
        "x-screen-9/10": "90vw",
      },
    },
    container: { center: true },
    fontFamily: { sans: ["Quicksand", "Arial", "sans-serif"] },
  },
  // eslint-disable-next-line @typescript-eslint/no-require-imports, import/no-commonjs, no-undef
  plugins: [require("@aksharahegde/nuxt-glow/tailwind")],
} satisfies Config;