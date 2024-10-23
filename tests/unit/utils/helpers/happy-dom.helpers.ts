import type { VueWrapper, DOMWrapper } from "@vue/test-utils";

function getClassesOfElement(element: DOMWrapper<HTMLElement> | VueWrapper): string[] {
  return element.attributes("class")?.split(" ") ?? [];
}

function doesElementHaveClass(element: DOMWrapper<HTMLElement> | VueWrapper, className: string): boolean {
  return getClassesOfElement(element).includes(className);
}

export {
  getClassesOfElement,
  doesElementHaveClass,
};