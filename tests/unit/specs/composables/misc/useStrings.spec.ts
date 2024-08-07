import { useStrings } from "~/composables/misc/useStrings";

describe("Use Strings Composable", () => {
  describe("convertBooleanAsAffirmativeString", () => {
    it("should return 'yes' when value is true.", () => {
      const result = useStrings().convertBooleanAsAffirmativeString(true);

      expect(result).toBe("yes");
    });

    it("should return 'no' when value is false.", () => {
      const result = useStrings().convertBooleanAsAffirmativeString(false);

      expect(result).toBe("no");
    });
  });

  describe("lowerCaseFirstLetter", () => {
    it("should return a string with the first letter in lowercase when called.", () => {
      const result = useStrings().lowerCaseFirstLetter("Test");

      expect(result).toBe("test");
    });
  });
});