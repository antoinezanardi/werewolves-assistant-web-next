import fr from "./locales/fr.json";
import en from "./locales/en.json";

export default defineI18nConfig(() => {
  const runtimeConfig = useRuntimeConfig();

  return {
    legacy: false,
    locale: runtimeConfig.public.defaultLocale,
    messages: {
      fr,
      en,
    },
  };
});