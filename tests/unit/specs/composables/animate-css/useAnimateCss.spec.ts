import type { Ref } from "vue";
import { useAnimateCss } from "~/composables/animate-css/useAnimateCss";

describe("Use Animate Css Composable", () => {
  const element = ref<HTMLElement | null>(null);

  beforeEach(() => {
    element.value = document.createElement("div");
  });

  afterEach(() => {
    element.value?.dispatchEvent(new Event("animationend"));
  });

  describe("animateElementOnce", () => {
    it("should not add animate__animated and animate__bounce classes to element when element is not a ref and null.", async() => {
      const animateCss = useAnimateCss();
      element.value = null;
      await animateCss.animateElementOnce(element.value, "bounce");

      expect(element.value).toBeNull();
    });

    it("should not add animate__animated and animate__bounce classes to ref element when element ref and value is null.", async() => {
      const animateCss = useAnimateCss();
      element.value = null;
      await animateCss.animateElementOnce(element, "bounce");

      expect(element.value).toBeNull();
    });

    it("should add animate__animated and animate__bounce classes to element when called.", () => {
      const animateCss = useAnimateCss();
      void animateCss.animateElementOnce(element.value, "bounce");

      expect(element.value?.classList.contains("animate__animated")).toBeTruthy();
      expect(element.value?.classList.contains("animate__bounce")).toBeTruthy();
    });

    it("should add animate__animated and animate__bounce classes to ref element when called.", () => {
      const animateCss = useAnimateCss();
      void animateCss.animateElementOnce(element, "bounce");

      expect(element.value?.classList.contains("animate__animated")).toBeTruthy();
      expect(element.value?.classList.contains("animate__bounce")).toBeTruthy();
    });

    it("should remove animate__animated and animate__bounce classes from ref element when animation ends.", () => {
      const animateCss = useAnimateCss();
      void animateCss.animateElementOnce(element, "bounce");
      element.value?.dispatchEvent(new Event("animationend"));

      expect(element.value?.classList.contains("animate__animated")).toBeFalsy();
      expect(element.value?.classList.contains("animate__bounce")).toBeFalsy();
    });

    it("should add event listener to ref element when called.", () => {
      const animateCss = useAnimateCss();
      const { value } = element as Ref<HTMLElement>;
      const addEventListenerSpy = vi.spyOn(value, "addEventListener");
      void animateCss.animateElementOnce(element, "bounce");

      expect(addEventListenerSpy).toHaveBeenCalledExactlyOnceWith("animationend", expect.any(Function), { once: true });
    });
  });
});