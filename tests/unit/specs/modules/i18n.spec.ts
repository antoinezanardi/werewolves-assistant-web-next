import { crush } from "radash";

import fr from "@modules/i18n/locales/fr.json";
import en from "@modules/i18n/locales/en.json";

describe("I18n module", () => {
  describe("Locales", () => {
    const flatFrLocale = crush(fr);
    const frKeys = Object.keys(flatFrLocale).toSorted();

    it("should contain all keys set in fr locale when locale is en.", () => {
      const flatEnLocale = crush(en);
      const enKeys = Object.keys(flatEnLocale).toSorted();

      expect(frKeys).toStrictEqual<string[]>(enKeys);
    });
  });
});