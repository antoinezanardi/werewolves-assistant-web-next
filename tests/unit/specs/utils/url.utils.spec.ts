import { removeTrailingSlashes } from "~/utils/url.utils";

describe("URL Utils", () => {
  describe("removeTrailingSlashes", () => {
    it("should remove trailing slashes when called.", () => {
      const url = "https://example.com///";
      const expected = "https://example.com";

      expect(removeTrailingSlashes(url)).toBe(expected);
    });
  });
});