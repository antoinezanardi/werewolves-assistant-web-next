import { I18N_DEFAULT_LOCALE } from "~/modules/i18n/i18n.constants";
import fr from "~/modules/i18n/locales/fr.json";
import en from "~/modules/i18n/locales/en.json";

export default defineI18nConfig(() => {
  const runtimeConfig = useRuntimeConfig();
  return {
    legacy: false,
    locale: runtimeConfig.public.defaultLocale || I18N_DEFAULT_LOCALE,
    messages: {
      fr,
      en,
    },
  };
});