import { useArrays } from "~/composables/misc/useArrays";

describe("Use Arrays Composable", () => {
  describe("insertIf", () => {
    it("should return an empty array when condition is false.", () => {
      const { insertIf } = useArrays();
      const mustBeInserted = false;
      const value = "value";
      const result = insertIf(mustBeInserted, value);

      expect(result).toStrictEqual<string[]>([]);
    });

    it("should return an array with the value when condition is true.", () => {
      const { insertIf } = useArrays();
      const mustBeInserted = true;
      const value = "value";
      const result = insertIf(mustBeInserted, value);

      expect(result).toStrictEqual<string[]>([value]);
    });
  });
});