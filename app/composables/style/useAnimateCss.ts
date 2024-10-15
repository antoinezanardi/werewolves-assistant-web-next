import type { MaybeRef } from "vue";

type AnimateCssAnimationName =
  | "bounce"
  | "fadeIn"
  | "flash"
  | "flip"
  | "headShake"
  | "heartBeat"
  | "hinge"
  | "jackInTheBox"
  | "jello"
  | "pulse"
  | "rollIn"
  | "rollOut"
  | "rubberBand"
  | "shakeX"
  | "shakeY"
  | "swing"
  | "tada"
  | "wobble";

type UseAnimateCss = {
  handleAnimationEnd: (event: Event, animation: AnimateCssAnimationName, resolve: () => void) => void;
  animateElementOnce: (element: MaybeRef<HTMLElement | null>, animation: AnimateCssAnimationName) => Promise<void>;
};

function useAnimateCss(): UseAnimateCss {
  function handleAnimationEnd(event: Event, animation: AnimateCssAnimationName, resolve: () => void): void {
    event.stopPropagation();
    const element = event.target as HTMLElement;
    element.classList.remove("animate__animated", `animate__${animation}`);
    resolve();
  }

  async function animateElementOnce(element: MaybeRef<HTMLElement | null>, animation: AnimateCssAnimationName): Promise<void> {
    const HtmlElement = isRef(element) ? element.value : element;
    if (!HtmlElement) {
      return Promise.resolve();
    }
    const animationName = `animate__${animation}`;
    HtmlElement.classList.add(`animate__animated`, animationName);

    return new Promise(resolve => {
      HtmlElement.addEventListener("animationend", (event: Event) => handleAnimationEnd(event, animation, resolve), { once: true });
    });
  }
  return {
    handleAnimationEnd,
    animateElementOnce,
  };
}

export { useAnimateCss };