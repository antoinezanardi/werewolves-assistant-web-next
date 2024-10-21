import type { mount } from "@vue/test-utils";
import type { ComponentMountingOptions } from "@vue/test-utils/dist/mount";
import type InputText from "primevue/inputtext";

import type { VueVm } from "@tests/unit/utils/types/vue-test-utils.types";
import { mountSuspendedComponent } from "@tests/unit/utils/helpers/mount.helpers";
import GameLobbyRolePickerSearchInput from "~/components/pages/game-lobby/GameLobbyRolePicker/GameLobbyRolePickerSearchInput/GameLobbyRolePickerSearchInput.vue";

describe("Game Lobby Role Picker Search Input Component", () => {
  const defaultProps = {
    modelValue: "",
  };
  let wrapper: ReturnType<typeof mount<typeof GameLobbyRolePickerSearchInput>>;

  async function mountGameLobbyRolePickerSearchInputComponent(options: ComponentMountingOptions<typeof GameLobbyRolePickerSearchInput> = {}):
  Promise<ReturnType<typeof mount<typeof GameLobbyRolePickerSearchInput>>> {
    return mountSuspendedComponent(GameLobbyRolePickerSearchInput, {
      props: defaultProps,
      global: {
        stubs: {
          FloatLabel: false,
          IconField: false,
          InputIcon: false,
        },
      },
      ...options,
    });
  }

  beforeEach(async() => {
    wrapper = await mountGameLobbyRolePickerSearchInputComponent();
  });

  it("should match snapshot when rendered.", () => {
    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });

  describe("Search Input", () => {
    it("should pass model value as v-model when rendered.", () => {
      const inputText = wrapper.findComponent<typeof InputText>("#game-lobby-role-picker-search-input");

      expect(inputText.attributes("modelvalue")).toBe(defaultProps.modelValue);
    });

    it("should pass updated model value when input emits update:modelValue.", async() => {
      const inputText = wrapper.findComponent<typeof InputText>("#game-lobby-role-picker-search-input");
      (inputText.vm as VueVm).$emit("update:modelValue", "newModelValue");
      await nextTick();

      expect(inputText.attributes("modelvalue")).toBe("newModelValue");
    });

    it("should have translated label when rendered.", () => {
      const label = wrapper.find<HTMLLabelElement>("#game-lobby-role-picker-search-input-label");

      expect(label.text()).toBe("Search for a role");
    });
  });
});