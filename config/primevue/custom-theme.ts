import { definePreset } from "@primevue/themes";
import Lara from "@primevue/themes/lara";

const primaryColor = "{blue.500}";
const secondaryColor = "{slate.700}";
const infoColor = "{sky.600}";
const dangerColor = "{red.500}";
const successColor = "{emerald.600}";

const buttonColorScheme = {
  primary: {
    background: primaryColor,
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
  },
  secondary: {
    background: secondaryColor,
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
  },
  info: {
    background: infoColor,
    border: {
      color: infoColor,
    },
    hover: {
      color: "{white}",
      background: "{sky.500}",
      border: {
        color: "{sky.500}",
      },
    },
  },
  danger: {
    background: dangerColor,
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
  },
  success: {
    background: successColor,
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
  },
});

export default {
  preset: customPreset,
};