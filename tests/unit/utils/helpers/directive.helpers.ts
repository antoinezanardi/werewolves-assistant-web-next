import type { Directive, DirectiveBinding } from "vue";

type BoundTooltip = {
  value: string | undefined;
};

function pTooltipDirectiveBinder(boundTooltip: BoundTooltip, cssSelector: string): { "p-tooltip": Directive } {
  const tooltip = boundTooltip;

  return {
    "p-tooltip": (element: Element, directiveBinding: DirectiveBinding): void => {
      const trimmedCssSelector = cssSelector.trim();
      if (trimmedCssSelector.startsWith(".") && element.classList.contains(trimmedCssSelector.slice(1))) {
        tooltip.value = directiveBinding.value as string;
      } else if (trimmedCssSelector.startsWith("#") && element.id === trimmedCssSelector.slice(1)) {
        tooltip.value = directiveBinding.value as string;
      } else if (trimmedCssSelector.startsWith("[") && trimmedCssSelector.endsWith("]")) {
        const [attribute, value] = trimmedCssSelector.slice(1, -1).split("=");
        const valueWithoutQuotes = value.replace(/['"]+/gu, "");
        if (element.getAttribute(attribute) === valueWithoutQuotes) {
          tooltip.value = directiveBinding.value as string;
        }
      }
    },
  };
}

export { pTooltipDirectiveBinder };