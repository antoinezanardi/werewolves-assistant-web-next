import type { mount } from "@vue/test-utils";

import type { VuePrimeProgressSpinner } from "@nuxt/components";
import type { TextProgressSpinnerProps } from "~/components/shared/misc/TextProgressSpinner/text-progress-spinner.types";
import TextProgressSpinner from "~/components/shared/misc/TextProgressSpinner/TextProgressSpinner.vue";
import { mountSuspendedComponent } from "@tests/unit/utils/helpers/mount.helpers";

describe("Text Progress Spinner Component", () => {
  let wrapper: ReturnType<typeof mount<typeof TextProgressSpinner>>;
  const defaultProps: TextProgressSpinnerProps = { text: "Loading…" };

  beforeEach(async() => {
    wrapper = await mountSuspendedComponent(TextProgressSpinner, { props: defaultProps });
  });

  it("should match snapshot when rendered.", () => {
    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });

  describe("Spinner", () => {
    it("should render spinner with aria label as text prop when rendered.", () => {
      const spinner = wrapper.findComponent<typeof VuePrimeProgressSpinner>("[aria-label=\"Loading…\"]");

      expect(spinner).toBeTruthy();
    });
  });

  describe("Text", () => {
    it("should render text with value as text prop when rendered.", () => {
      const text = wrapper.find<HTMLSpanElement>(".text-progress-spinner-text");

      expect(text.text()).toBe("Loading…");
    });
  });
});