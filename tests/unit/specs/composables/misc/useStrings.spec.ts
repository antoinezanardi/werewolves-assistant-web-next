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
});