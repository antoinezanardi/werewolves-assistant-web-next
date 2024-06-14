import { createTestingPinia } from "@pinia/testing";
import type { mount } from "@vue/test-utils";
import type { ComponentMountingOptions } from "@vue/test-utils/dist/mount";
import { expect } from "vitest";
import type { Ref } from "vue";
import type { Vue3Lottie } from "vue3-lottie";
import MuteButton from "~/components/layouts/default/NavBar/MuteButton/MuteButton.vue";
import { useAudioStore } from "~/stores/audio/useAudioStore";
import { StoreIds } from "~/stores/enums/store.enum";
import { createFakeVueLottie } from "@tests/unit/utils/factories/plugins/vue-lottie/vue-lottie.factory";
import { pTooltipDirectiveBinder } from "@tests/unit/utils/helpers/directive.helpers";
import { getError } from "@tests/unit/utils/helpers/exception.helpers";

import { mountSuspendedComponent } from "@tests/unit/utils/helpers/mount.helpers";
import type { BoundTooltip } from "@tests/unit/utils/types/directive.types";

describe("Mute Button Component", () => {
  const mocks = { plugins: { vueLottie: createFakeVueLottie() } };
  let wrapper: ReturnType<typeof mount<typeof MuteButton>>;
  const testingPinia = { initialState: { [StoreIds.AUDIO]: { isMuted: false } } };

  async function mountMuteButtonComponent(options: ComponentMountingOptions<typeof MuteButton> = {}): Promise<ReturnType<typeof mount<typeof MuteButton>>> {
    return mountSuspendedComponent(MuteButton, {
      global: {
        plugins: [createTestingPinia(testingPinia)],
        stubs: {
          VueLottie: {
            template: "<div id='vue-lottie-stub'></div>",
            methods: mocks.plugins.vueLottie,
          },
        },
      },
      ...options,
    });
  }

  beforeEach(async() => {
    mocks.plugins.vueLottie = createFakeVueLottie();
    wrapper = await mountMuteButtonComponent();
  });

  it("should match snapshot when rendered.", () => {
    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });

  describe("Button", () => {
    it("should have tooltip for mute text when audio is not muted.", async() => {
      const tooltip: BoundTooltip = { value: undefined };
      const directives = { ...pTooltipDirectiveBinder(tooltip, "[aria-label='components.MuteButton.mute']") };
      wrapper = await mountMuteButtonComponent({
        global: {
          directives,
          stubs: {
            VueLottie: {
              template: "<div id='vue-lottie-stub'></div>",
              methods: mocks.plugins.vueLottie,
            },
          },
          plugins: [createTestingPinia(testingPinia)],
        },
      });

      expect(tooltip.value).toBe("components.MuteButton.mute");
    });

    it("should have tooltip for unmute text when audio is muted.", async() => {
      const tooltip: BoundTooltip = { value: undefined };
      const directives = { ...pTooltipDirectiveBinder(tooltip, "[aria-label='components.MuteButton.unmute']") };
      wrapper = await mountMuteButtonComponent({
        global: {
          directives,
          stubs: {
            VueLottie: {
              template: "<div id='vue-lottie-stub'></div>",
              methods: mocks.plugins.vueLottie,
            },
          },
          plugins: [createTestingPinia({ initialState: { [StoreIds.AUDIO]: { isMuted: true } } })],
        },
      });

      expect(tooltip.value).toBe("components.MuteButton.unmute");
    });

    it("should throw error when sound lottie is not found in refs.", async() => {
      (wrapper.vm.$root?.$refs.VTU_COMPONENT as { soundLottie: Ref }).soundLottie.value = null;
      const muteButton = wrapper.find("[aria-label='components.MuteButton.mute']");
      await getError(async() => muteButton.trigger("click"));

      expect(createError).toHaveBeenCalledExactlyOnceWith("Sound Lottie is not initialized");
    });

    it("should set direction to reverse when audio is muted.", async() => {
      const audioStore = useAudioStore();
      audioStore.isMuted = true;
      const muteButton = wrapper.find("[aria-label='components.MuteButton.mute']");
      await muteButton.trigger("click");

      expect(mocks.plugins.vueLottie.setDirection).toHaveBeenCalledExactlyOnceWith("reverse");
    });

    it("should set direction to forward when audio is not muted.", async() => {
      const audioStore = useAudioStore();
      audioStore.isMuted = false;
      const muteButton = wrapper.find("[aria-label='components.MuteButton.mute']");
      await muteButton.trigger("click");

      expect(mocks.plugins.vueLottie.setDirection).toHaveBeenCalledExactlyOnceWith("forward");
    });

    it("should play unmute segment when audio is muted.", async() => {
      const audioStore = useAudioStore();
      audioStore.isMuted = true;
      const muteButton = wrapper.find("[aria-label='components.MuteButton.mute']");
      await muteButton.trigger("click");

      expect(mocks.plugins.vueLottie.playSegments).toHaveBeenCalledExactlyOnceWith([[60, 90]], true);
    });

    it("should play mute segment when audio is not muted.", async() => {
      const audioStore = useAudioStore();
      audioStore.isMuted = false;
      const muteButton = wrapper.find("[aria-label='components.MuteButton.mute']");
      await muteButton.trigger("click");

      expect(mocks.plugins.vueLottie.playSegments).toHaveBeenCalledExactlyOnceWith([[0, 30]], true);
    });

    it("should toggle audio mute state when clicked.", async() => {
      const audioStore = useAudioStore();
      const muteButton = wrapper.find("[aria-label='components.MuteButton.mute']");
      await muteButton.trigger("click");

      expect(audioStore.toggleMute).toHaveBeenCalledExactlyOnceWith();
    });

    describe("Lottie", () => {
      it("should set size when rendered.", () => {
        const vueLottie = wrapper.findComponent<typeof Vue3Lottie>("#mute-button-lottie");

        expect(vueLottie.attributes("height")).toBe("25");
        expect(vueLottie.attributes("width")).toBe("25");
      });
    });
  });
});