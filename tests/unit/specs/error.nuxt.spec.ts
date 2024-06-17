import { createFakeNuxtError } from "@tests/unit/utils/factories/nuxt/nuxt-error.factory";
import type { mount } from "@vue/test-utils";
import type { ComponentMountingOptions } from "@vue/test-utils/dist/mount";
import { expect } from "vitest";
import type { ComputedRef } from "vue";
import type { Vue3Lottie } from "vue3-lottie";
import Error from "~/error.vue";

import { mountComponent } from "@tests/unit/utils/helpers/mount.helpers";
import type { ErrorProps } from "~/types/error.types";

describe("Error Component", () => {
  const defaultProps: ErrorProps = { error: createFakeNuxtError({ statusCode: 404 }) };
  let wrapper: ReturnType<typeof mount<typeof Error>>;

  function mountErrorComponent(options: ComponentMountingOptions<typeof Error> = {}): ReturnType<typeof mount<typeof Error>> {
    return mountComponent(Error, {
      props: defaultProps,
      ...options,
    });
  }

  beforeEach(() => {
    wrapper = mountErrorComponent();
  });

  it("should match snapshot when rendered.", () => {
    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });

  describe("Error Title", () => {
    it("should set head title of error title when rendered.", () => {
      const expectedPartialUseHeadInput = { title: expect.objectContaining({ value: "components.Error.pageNotFound" }) as ComputedRef<string> };

      expect(useHead).toHaveBeenCalledWith(expect.objectContaining(expectedPartialUseHeadInput));
    });

    it("should render page not found title when error status code is 404.", async() => {
      defaultProps.error.statusCode = 404;
      await nextTick();
      const title = wrapper.find<HTMLHeadingElement>("#error-title");

      expect(title.text()).toBe("components.Error.pageNotFound");
    });

    it("should render unexpected error title when error status code is not 404.", () => {
      wrapper = mountErrorComponent({ props: { error: createFakeNuxtError({ statusCode: 500 }) } });
      const title = wrapper.find<HTMLHeadingElement>("#error-title");

      expect(title.text()).toBe("components.Error.unexpectedError");
    });
  });

  describe("Lottie Error", () => {
    it("should set size to lottie when rendered.", () => {
      const lottie = wrapper.findComponent<typeof Vue3Lottie>("#lottie-error");

      expect(lottie.props("height")).toBe("250px");
      expect(lottie.props("width")).toBe("250px");
    });
  });

  describe("Error description", () => {
    it("should render page not found description when error status code is 404.", () => {
      const description = wrapper.find<HTMLParagraphElement>("#error-description");

      expect(description.text()).toBe("components.Error.youAreLost");
    });

    it("should render unexpected error description when error status code is not 404.", () => {
      wrapper = mountErrorComponent({ props: { error: createFakeNuxtError({ statusCode: 500 }) } });
      const description = wrapper.find<HTMLParagraphElement>("#error-description");

      expect(description.text()).toBe("components.Error.notNormalTeamNotified");
    });
  });
});