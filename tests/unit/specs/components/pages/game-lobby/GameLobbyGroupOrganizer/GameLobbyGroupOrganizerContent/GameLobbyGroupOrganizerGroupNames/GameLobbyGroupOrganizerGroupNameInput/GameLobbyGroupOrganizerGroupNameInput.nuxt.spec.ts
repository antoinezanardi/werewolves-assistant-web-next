import type { mount } from "@vue/test-utils";

import type { ComponentMountingOptions } from "@vue/test-utils/dist/mount";
import { mountSuspendedComponent } from "@tests/unit/utils/helpers/mount.helpers";
import type Button from "primevue/button";
import type InputText from "primevue/inputtext";
import { beforeEach } from "vitest";
import type { GameLobbyGroupOrganizerGroupNameInputProps } from "~/components/pages/game-lobby/GameLobbyGroupOrganizer/GameLobbyGroupOrganizerContent/GameLobbyGroupOrganizerGroupNames/GameLobbyGroupOrganizerGroupNameInput/game-lobby-group-organizer-group-name-input.types";
import GameLobbyGroupOrganizerGroupNameInput from "~/components/pages/game-lobby/GameLobbyGroupOrganizer/GameLobbyGroupOrganizerContent/GameLobbyGroupOrganizerGroupNames/GameLobbyGroupOrganizerGroupNameInput/GameLobbyGroupOrganizerGroupNameInput.vue";

describe("Game Lobby Group Organizer Group Name Input Component", () => {
  const defaultProps: GameLobbyGroupOrganizerGroupNameInputProps = {
    groupName: "Group 1",
    otherGroupName: "Group 2",
  };
  let wrapper: ReturnType<typeof mount<typeof GameLobbyGroupOrganizerGroupNameInput>>;

  async function mountGameLobbyGroupOrganizerGroupNameInputComponent(options: ComponentMountingOptions<typeof GameLobbyGroupOrganizerGroupNameInput> = {}):
  Promise<ReturnType<typeof mount<typeof GameLobbyGroupOrganizerGroupNameInput>>> {
    return mountSuspendedComponent(GameLobbyGroupOrganizerGroupNameInput, {
      props: defaultProps,
      global: {
        stubs: {
          Inplace: false,
          InputGroup: false,
        },
      },
      ...options,
    });
  }

  beforeEach(async() => {
    wrapper = await mountGameLobbyGroupOrganizerGroupNameInputComponent();
  });

  it("should match snapshot when rendered.", () => {
    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });

  it("should match snapshot when rendered without shallow rendering.", async() => {
    wrapper = await mountGameLobbyGroupOrganizerGroupNameInputComponent({ shallow: false });

    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });

  describe("Inplace content is not revealed", () => {
    it("should render the trimmed group name when rendered.", () => {
      const inplace = wrapper.find<HTMLDivElement>("#group-name");

      expect(inplace.text()).toBe(defaultProps.groupName);
    });
  });

  describe("Inplace content is revealed", () => {
    beforeEach(async() => {
      const button = wrapper.find<HTMLButtonElement>(".p-inplace-display");
      await button.trigger("click");
    });

    it("should match snapshot without shallow rendering when inplace content is revealed.", async() => {
      wrapper = await mountGameLobbyGroupOrganizerGroupNameInputComponent({ shallow: false });
      const button = wrapper.find<HTMLButtonElement>(".p-inplace-display");
      await button.trigger("click");

      expect(wrapper).toBeTruthy();
      expect(wrapper.html()).toMatchSnapshot();
    });

    describe("Group name input", () => {
      it("should be invalid when group name is empty.", async() => {
        const input = wrapper.findComponent<typeof InputText>("#group-name-input");
        await input.setValue("");
        await input.trigger("blur");

        expect(input.attributes("invalid")).toBe("true");
      });

      it("should be invalid when group name is the same as the other group name.", async() => {
        const input = wrapper.findComponent<typeof InputText>("#group-name-input");
        await input.setValue(defaultProps.otherGroupName);
        await input.trigger("blur");

        expect(input.attributes("invalid")).toBe("true");
      });

      it("should be invalid when group name is the same as the other group name even with start and end whitespace.", async() => {
        const input = wrapper.findComponent<typeof InputText>("#group-name-input");
        await input.setValue(`  ${defaultProps.otherGroupName} `);
        await input.trigger("blur");

        expect(input.attributes("invalid")).toBe("true");
      });

      it("should have a max length of 30 characters when rendered.", () => {
        const input = wrapper.findComponent<typeof InputText>("#group-name-input");

        expect(input.attributes("maxlength")).toBe("30");
      });
    });

    describe("Group name submit button", () => {
      it("should set button to disabled when group name is empty.", async() => {
        const input = wrapper.findComponent<typeof InputText>("#group-name-input");
        await input.setValue("");
        await input.trigger("blur");
        const button = wrapper.findComponent<typeof Button>("#submit-group-name-button");

        expect(button.attributes("disabled")).toBe("true");
      });

      it("should set button to disabled when group name is the same as the other group name.", async() => {
        const input = wrapper.findComponent<typeof InputText>("#group-name-input");
        await input.setValue(defaultProps.otherGroupName);
        await input.trigger("blur");
        const button = wrapper.findComponent<typeof Button>("#submit-group-name-button");

        expect(button.attributes("disabled")).toBe("true");
      });

      it("should set button to disabled when group name is the same as the other group name even with start and end whitespace.", async() => {
        const input = wrapper.findComponent<typeof InputText>("#group-name-input");
        await input.setValue(`  ${defaultProps.otherGroupName} `);
        await input.trigger("blur");
        const button = wrapper.findComponent<typeof Button>("#submit-group-name-button");

        expect(button.attributes("disabled")).toBe("true");
      });

      it("should emit updateGroupName event when button is clicked.", async() => {
        const input = wrapper.findComponent<typeof InputText>("#group-name-input");
        await input.setValue("New Group 1");
        const button = wrapper.findComponent<typeof Button>("#submit-group-name-button");
        await button.trigger("click");

        expect(wrapper.emitted("updateGroupName")).toBeTruthy();
        expect(wrapper.emitted("updateGroupName")?.[0][0]).toBe("New Group 1");
      });

      it("should set input value to new group name when button is clicked.", async() => {
        const input = wrapper.findComponent<typeof InputText>("#group-name-input");
        await input.setValue("New Group 1");
        const button = wrapper.findComponent<typeof Button>("#submit-group-name-button");
        await button.trigger("click");

        expect(input.attributes("modelvalue")).toBe("New Group 1");
      });
    });
  });
});