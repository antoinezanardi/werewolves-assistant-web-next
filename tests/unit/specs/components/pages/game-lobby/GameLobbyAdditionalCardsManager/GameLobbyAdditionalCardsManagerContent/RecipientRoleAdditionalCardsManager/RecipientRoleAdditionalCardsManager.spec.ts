import type { mount } from "@vue/test-utils";

import { mountSuspendedComponent } from "@tests/unit/utils/helpers/mount.helpers";
import type { ComponentMountingOptions } from "@vue/test-utils/dist/mount";
import type { RecipientRoleAdditionalCardsManagerProps } from "~/components/pages/game-lobby/GameLobbyAdditionalCardsManager/GameLobbyAdditionalCardsManagerContent/RecipientRoleAdditionalCardsManager/recipient-role-additional-cards-manager.types";
import RecipientRoleAdditionalCardsManager from "~/components/pages/game-lobby/GameLobbyAdditionalCardsManager/GameLobbyAdditionalCardsManagerContent/RecipientRoleAdditionalCardsManager/RecipientRoleAdditionalCardsManager.vue";

describe("Recipient Role Additional Cards Manager Component", () => {
  const defaultProps: RecipientRoleAdditionalCardsManagerProps = {
    recipientRoleName: "thief",
  };
  let wrapper: ReturnType<typeof mount<typeof RecipientRoleAdditionalCardsManager>>;

  async function mountRecipientRoleAdditionalCardsManagerComponent(options: ComponentMountingOptions<typeof RecipientRoleAdditionalCardsManager> = {}):
  Promise<ReturnType<typeof mount<typeof RecipientRoleAdditionalCardsManager>>> {
    return mountSuspendedComponent(RecipientRoleAdditionalCardsManager, {
      props: defaultProps,
      ...options,
    });
  }

  beforeEach(async() => {
    wrapper = await mountRecipientRoleAdditionalCardsManagerComponent();
  });

  it("should match snapshot when rendered.", () => {
    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });

  it("should match snapshot when rendered without shallow.", async() => {
    wrapper = await mountRecipientRoleAdditionalCardsManagerComponent({
      shallow: false,
      global: {
        stubs: {
          RecipientRoleAdditionalCardsDisclaimer: true,
          RecipientRoleAdditionalCardsMultiSelect: true,
        },
      },
    });

    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });
});