import type { Directive, DirectiveBinding } from "vue";

import type { BoundTooltip } from "~/tests/unit/utils/types/directive.types";

function pTooltipDirectiveBinder(boundTooltip: BoundTooltip, cssSelector: string): { "p-tooltip": Directive } {
  const tooltip = boundTooltip;

  return {
    "p-tooltip": (element: Element, directiveBinding: DirectiveBinding): void => {
      const trimmedCssSelector = cssSelector.trim();
      const isElementSelectedClass = trimmedCssSelector.startsWith(".") && element.classList.contains(trimmedCssSelector.slice(1));
      const isElementSelectedId = trimmedCssSelector.startsWith("#") && element.id === trimmedCssSelector.slice(1);
      const isElementTag = trimmedCssSelector.startsWith("[") && trimmedCssSelector.endsWith("]");
      if (isElementSelectedClass || isElementSelectedId) {
        tooltip.value = directiveBinding.value as string;
        tooltip.arg = directiveBinding.arg as unknown as { position: string };
      } else if (isElementTag) {
        const [attribute, value] = trimmedCssSelector.slice(1, -1).split("=");
        const valueWithoutQuotes = value.replace(/['"]+/gu, "");
        if (element.getAttribute(attribute) === valueWithoutQuotes) {
          tooltip.value = directiveBinding.value as string;
          tooltip.arg = directiveBinding.arg as unknown as { position: string };
        }
      }
    },
  };
}

export { pTooltipDirectiveBinder };