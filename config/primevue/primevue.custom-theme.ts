import { definePreset } from "@primevue/themes";
import Lara from "@primevue/themes/lara";

const primaryColor = "{blue.500}";
const secondaryColor = "{slate.700}";
const infoColor = "{sky.500}";
const dangerColor = "{red.500}";
const successColor = "{emerald.600}";
const helpColor = "{orange.600}";

const buttonColorScheme = {
  primary: {
    background: primaryColor,
    color: "{white}",
    border: {
      color: primaryColor,
    },
    hover: {
      color: "{white}",
      background: "{blue.400}",
      border: {
        color: "{blue.400}",
      },
    },
    active: {
      color: "{white}",
      background: "{blue.600}",
      border: {
        color: "{blue.600}",
      },
    },
  },
  secondary: {
    background: secondaryColor,
    color: "{white}",
    border: {
      color: secondaryColor,
    },
    hover: {
      color: "{white}",
      background: "{slate.600}",
      border: {
        color: "{slate.600}",
      },
    },
    active: {
      color: "{white}",
      background: "{slate.800}",
      border: {
        color: "{slate.800}",
      },
    },
  },
  info: {
    background: infoColor,
    color: "{white}",
    border: {
      color: infoColor,
    },
    hover: {
      color: "{white}",
      background: "{sky.400}",
      border: {
        color: "{sky.400}",
      },
    },
    active: {
      color: "{white}",
      background: "{sky.600}",
      border: {
        color: "{sky.600}",
      },
    },
  },
  danger: {
    background: dangerColor,
    color: "{white}",
    border: {
      color: dangerColor,
    },
    hover: {
      color: "{white}",
      background: "{red.400}",
      border: {
        color: "{red.400}",
      },
    },
    active: {
      color: "{white}",
      background: "{red.600}",
      border: {
        color: "{red.600}",
      },
    },
  },
  success: {
    background: successColor,
    color: "{white}",
    border: {
      color: successColor,
    },
    hover: {
      color: "{white}",
      background: "{emerald.500}",
      border: {
        color: "{emerald.500}",
      },
    },
    active: {
      color: "{white}",
      background: "{emerald.700}",
      border: {
        color: "{emerald.700}",
      },
    },
  },
  help: {
    background: helpColor,
    color: "{white}",
    border: {
      color: helpColor,
    },
    hover: {
      color: "{white}",
      background: "{orange.400}",
      border: {
        color: "{orange.400}",
      },
    },
    active: {
      color: "{white}",
      background: "{orange.600}",
      border: {
        color: "{orange.600}",
      },
    },
  },
};

const badgeColorScheme = {
  primary: {
    background: primaryColor,
    color: "{white}",
  },
  secondary: {
    background: secondaryColor,
    color: "{white}",
  },
  info: {
    background: infoColor,
    color: "{white}",
  },
  danger: {
    background: dangerColor,
    color: "{white}",
  },
  success: {
    background: successColor,
    color: "{white}",
  },
  warn: {
    background: helpColor,
    color: "{white}",
  },
};

const accordionColorScheme = {
  header: {
    color: "{slate.300}",
    background: "{gray.800}",
    border: {
      color: "{slate.700}",
    },
    active: {
      background: "{slate.700}",
      hover: {
        background: "{slate.700}",
      },
    },
    hover: {
      background: "{slate.700}",
    },
  },
};

const inputTextColorScheme = {
  background: "{gray.800}",
};

const toggleButtonColorScheme = {
  icon: {
    checked: {
      color: "white",
    },
  },
  color: "white",
  checked: {
    background: primaryColor,
    border: {
      color: primaryColor,
    },
  },
};

const autoCompleteColorScheme = {
  dropdown: {
    background: primaryColor,
    border: {
      color: primaryColor,
    },
    hover: {
      background: "{blue.400}",
      border: {
        color: "{blue.400}",
      },
    },
  },
};

const customPreset = definePreset(Lara, {
  semantic: {
    primary: {
      50: "{blue.50}",
      100: "{blue.100}",
      200: "{blue.200}",
      300: "{blue.300}",
      400: "{blue.400}",
      500: "{blue.500}",
      600: "{blue.600}",
      700: "{blue.700}",
      800: "{blue.800}",
      900: "{blue.900}",
      950: "{blue.950}",
    },
  },
  components: {
    button: {
      colorScheme: {
        light: buttonColorScheme,
        dark: buttonColorScheme,
      },
    },
    badge: {
      colorScheme: {
        light: badgeColorScheme,
        dark: badgeColorScheme,
      },
    },
    accordion: {
      colorScheme: {
        light: accordionColorScheme,
        dark: accordionColorScheme,
      },
    },
    inputtext: {
      colorScheme: {
        light: inputTextColorScheme,
        dark: inputTextColorScheme,
      },
    },
    togglebutton: {
      colorScheme: {
        light: toggleButtonColorScheme,
        dark: toggleButtonColorScheme,
      },
    },
    autocomplete: {
      colorScheme: {
        light: autoCompleteColorScheme,
        dark: autoCompleteColorScheme,
      },
    },
  },
  options: {
    ripple: true,
    darkModeSelector: ".dark-mode",
  },
}) as unknown;

export default {
  preset: customPreset,
  options: {
    darkModeSelector: ".dark-mode",
    ripple: true,
  },
};