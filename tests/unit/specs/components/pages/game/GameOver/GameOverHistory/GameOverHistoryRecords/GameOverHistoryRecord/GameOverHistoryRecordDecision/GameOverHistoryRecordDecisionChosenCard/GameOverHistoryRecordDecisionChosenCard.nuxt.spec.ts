import type { mount } from "@vue/test-utils";
import type { ComponentMountingOptions } from "@vue/test-utils/dist/mount";
import type VueUseCore from "@vueuse/core";

import { createFakeGameAdditionalCard } from "@tests/unit/utils/factories/composables/api/game/game-additional-card/game-additional-card.factory";
import { createFakeGameHistoryRecordPlay } from "@tests/unit/utils/factories/composables/api/game/game-history-record/game-history-record-play/game-history-record-play.factory";
import { createFakeGameHistoryRecord } from "@tests/unit/utils/factories/composables/api/game/game-history-record/game-history-record.factory";
import { mountSuspendedComponent } from "@tests/unit/utils/helpers/mount.helpers";
import type { GameOverHistoryRecordDecisionChosenCardProps } from "~/components/pages/game/GameOver/GameOverHistory/GameOverHistoryRecords/GameOverHistoryRecord/GameOverHistoryRecordDecision/GameOverHistoryRecordDecisionChosenCard/game-over-history-record-decision-chosen-card.types";
import GameOverHistoryRecordDecisionChosenCard from "~/components/pages/game/GameOver/GameOverHistory/GameOverHistoryRecords/GameOverHistoryRecord/GameOverHistoryRecordDecision/GameOverHistoryRecordDecisionChosenCard/GameOverHistoryRecordDecisionChosenCard.vue";
import type RoleImage from "~/components/shared/role/RoleImage/RoleImage.vue";

const hoistedMocks = vi.hoisted(() => ({
  useBreakpoints: {
    smaller: vi.fn(),
  },
}));

vi.mock("@vueuse/core", async importOriginal => ({
  ...await importOriginal<typeof VueUseCore>(),
  useBreakpoints: (): typeof hoistedMocks.useBreakpoints => hoistedMocks.useBreakpoints,
}));

describe("Game Over History Record Decision Chosen Card Component", () => {
  const defaultChosenCard = createFakeGameAdditionalCard({
    roleName: "seer",
  });
  const defaultGameHistoryRecord = createFakeGameHistoryRecord({
    play: createFakeGameHistoryRecordPlay({
      chosenCard: defaultChosenCard,
    }),
  });
  const defaultProps: GameOverHistoryRecordDecisionChosenCardProps = {
    gameHistoryRecord: defaultGameHistoryRecord,
  };
  let wrapper: ReturnType<typeof mount<typeof GameOverHistoryRecordDecisionChosenCard>>;

  async function mountGameOverHistoryRecordDecisionChosenCardComponent(options: ComponentMountingOptions<typeof GameOverHistoryRecordDecisionChosenCard> = {}):
  Promise<ReturnType<typeof mount<typeof GameOverHistoryRecordDecisionChosenCard>>> {
    return mountSuspendedComponent(GameOverHistoryRecordDecisionChosenCard, {
      shallow: false,
      global: {
        stubs: {
          RoleImage: false,
        },
      },
      props: defaultProps,
      ...options,
    });
  }

  beforeEach(async() => {
    hoistedMocks.useBreakpoints.smaller.mockReturnValue(ref(false));
    wrapper = await mountGameOverHistoryRecordDecisionChosenCardComponent();
  });

  it("should match snapshot when rendered.", () => {
    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });

  describe("Chosen Card Text", () => {
    it("should translate chosen card text when rendered.", () => {
      const chosenCardText = wrapper.find<HTMLHeadingElement>("#game-over-history-record-decision-chosen-card-text");

      expect(chosenCardText.text()).toBe("shared.role.definiteName.seer, 1");
    });
  });

  describe("Chosen Card Role Image", () => {
    it("should pass chosen card role name to the role image component when rendered.", () => {
      const roleImage = wrapper.findComponent<typeof RoleImage>("#game-over-history-record-decision-chosen-card-role-image");

      expect(roleImage.props("roleName")).toBe(defaultChosenCard.roleName);
    });

    it("should pass 70px as the size to the role image component when rendered.", () => {
      const roleImage = wrapper.findComponent<typeof RoleImage>("#game-over-history-record-decision-chosen-card-role-image");

      expect(roleImage.props("sizes")).toBe("70px");
    });

    it("should pass 56px as the size to the role image component when the screen is smaller than md.", async() => {
      hoistedMocks.useBreakpoints.smaller.mockReturnValue(ref(true));
      wrapper = await mountGameOverHistoryRecordDecisionChosenCardComponent();
      const roleImage = wrapper.findComponent<typeof RoleImage>("#game-over-history-record-decision-chosen-card-role-image");

      expect(roleImage.props("sizes")).toBe("56px");
    });
  });
});