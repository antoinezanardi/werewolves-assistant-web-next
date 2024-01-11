import { NodeEnvs } from "~/env/env.enum";
import { I18N_DEFAULT_LOCALE, I18N_TEST_LOCALE } from "~/modules/i18n/i18n.constants";
import fr from "~/modules/i18n/locales/fr.json";
import en from "~/modules/i18n/locales/en.json";

export default defineI18nConfig(() => ({
  legacy: false,
  locale: process.env.NODE_ENV === NodeEnvs.TEST ? I18N_TEST_LOCALE : I18N_DEFAULT_LOCALE,
  messages: {
    fr,
    en,
  },
}));