import type { Ref } from "vue";

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
  animateElementOnce: (element: Ref<HTMLElement | null>, animation: AnimateCssAnimationName) => Promise<void>;
};

function useAnimateCss(): UseAnimateCss {
  function handleAnimationEnd(event: Event, animation: AnimateCssAnimationName, resolve: () => void): void {
    event.stopPropagation();
    const element = event.target as HTMLElement;
    element.classList.remove("animate__animated", `animate__${animation}`);
    resolve();
  }

  async function animateElementOnce(element: Ref<HTMLElement | null>, animation: AnimateCssAnimationName): Promise<void> {
    if (!element.value) {
      return Promise.resolve();
    }
    const animationName = `animate__${animation}`;
    element.value.classList.add(`animate__animated`, animationName);

    return new Promise(resolve => {
      element.value?.addEventListener("animationend", (event: Event) => handleAnimationEnd(event, animation, resolve), { once: true });
    });
  }
  return {
    handleAnimationEnd,
    animateElementOnce,
  };
}

export { useAnimateCss };