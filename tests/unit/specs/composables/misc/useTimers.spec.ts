import { useTimers } from "~/composables/misc/useTimers";

describe("Use Timers Composable", () => {
  describe("getSecondsInMinutesLabel", () => {
    it("should return only minutes when there are no remaining seconds.", () => {
      const result = useTimers().getSecondsInMinutesLabel(60);

      expect(result).toBe("shared.time.minute, {\"count\":1}, 1");
    });

    it("should return only seconds when there are no minutes.", () => {
      const result = useTimers().getSecondsInMinutesLabel(30);

      expect(result).toBe("shared.time.second, {\"count\":30}, 30");
    });

    it("should return minutes and seconds when there are both.", () => {
      const result = useTimers().getSecondsInMinutesLabel(90);

      expect(result).toBe("shared.time.minute, {\"count\":1}, 1 shared.and shared.time.second, {\"count\":30}, 30");
    });
  });
});