import type { mount } from "@vue/test-utils";
import type { ComponentMountingOptions } from "@vue/test-utils/dist/mount";
import type VueUseCore from "@vueuse/core";
import type { TagProps } from "primevue/tag";
import type Tag from "primevue/tag";

import type { NuxtImg } from "#components";
import { createFakeGameHistoryRecordPlayTarget } from "@tests/unit/utils/factories/composables/api/game/game-history-record/game-history-record-play/game-history-record-play-target/game-history-record-play-target.factory";
import { createFakeActorAlivePlayer } from "@tests/unit/utils/factories/composables/api/game/player/player-with-role.factory";
import { mountSuspendedComponent } from "@tests/unit/utils/helpers/mount.helpers";
import type { GameOverHistoryRecordDecisionTargetProps } from "~/components/pages/game/GameOver/GameOverHistory/GameOverHistoryRecords/GameOverHistoryRecord/GameOverHistoryRecordDecision/GameOverHistoryRecordDecisionTargets/GameOverHistoryRecordDecisionTarget/game-over-history-record-decision-target.types";
import GameOverHistoryRecordDecisionTarget from "~/components/pages/game/GameOver/GameOverHistory/GameOverHistoryRecords/GameOverHistoryRecord/GameOverHistoryRecordDecision/GameOverHistoryRecordDecisionTargets/GameOverHistoryRecordDecisionTarget/GameOverHistoryRecordDecisionTarget.vue";
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

describe("Game Over History Record Decision Target Component", () => {
  let wrapper: ReturnType<typeof mount<typeof GameOverHistoryRecordDecisionTarget>>;
  const defaultTarget = createFakeGameHistoryRecordPlayTarget({ player: createFakeActorAlivePlayer({ name: "Antoine" }) });
  const defaultProps: GameOverHistoryRecordDecisionTargetProps = { target: defaultTarget };

  async function mountGameOverHistoryRecordDecisionTargetComponent(options: ComponentMountingOptions<typeof GameOverHistoryRecordDecisionTarget> = {}):
  Promise<ReturnType<typeof mount<typeof GameOverHistoryRecordDecisionTarget>>> {
    return mountSuspendedComponent(GameOverHistoryRecordDecisionTarget, {
      shallow: false,
      global: {
        stubs: {
          RoleImage: true,
          NuxtImg: true,
          Tag: true,
        },
      },
      props: defaultProps,
      ...options,
    });
  }

  beforeEach(async() => {
    hoistedMocks.useBreakpoints.smaller.mockReturnValue(ref(false));
    wrapper = await mountGameOverHistoryRecordDecisionTargetComponent();
  });

  it("should match snapshot when rendered.", () => {
    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });

  describe("Role Image", () => {
    it("should render role image with the targeted player role when rendered.", () => {
      const roleImage = wrapper.findComponent<typeof RoleImage>("#targeted-player-role-image");

      expect(roleImage.props("roleName")).toBe(defaultTarget.player.role.current);
    });

    it("should set role image size to 70px when the screen is not smaller than md.", () => {
      const roleImage = wrapper.findComponent<typeof RoleImage>("#targeted-player-role-image");

      expect(roleImage.props("sizes")).toBe("70px");
    });

    it("should set role image size to 56px when the screen is smaller than md.", async() => {
      hoistedMocks.useBreakpoints.smaller.mockReturnValue(ref(true));
      wrapper = await mountGameOverHistoryRecordDecisionTargetComponent();
      const roleImage = wrapper.findComponent<typeof RoleImage>("#targeted-player-role-image");

      expect(roleImage.props("sizes")).toBe("56px");
    });
  });

  describe("Drank potion tag", () => {
    it("should not render drank potion tag when the target did not drink a potion.", () => {
      const overflowTag = wrapper.findComponent<typeof Tag>("#target-potion-tag");

      expect(overflowTag.exists()).toBeFalsy();
    });

    describe("Target drank life potion", () => {
      beforeEach(async() => {
        wrapper = await mountGameOverHistoryRecordDecisionTargetComponent({
          shallow: true,
          global: { stubs: { Tag: false } },
          props: {
            target: createFakeGameHistoryRecordPlayTarget({
              player: createFakeActorAlivePlayer({ name: "Antoine" }),
              drankPotion: "life",
            }),
          },
        });
      });

      it("should set severity to success when the target drank a life potion.", () => {
        const lifePotionTag = wrapper.findComponent<typeof Tag>("#target-potion-tag");
        const props = lifePotionTag.props() as TagProps;

        expect(props.severity).toBe("success");
      });

      it("should render drank life potion tag icon when the target drank a life potion.", () => {
        const lifePotionTagIcon = wrapper.findComponent<typeof NuxtImg>("[alt='components.GameOverHistoryRecordDecisionTarget.lifePotion']");

        expect(lifePotionTagIcon.attributes("src")).toBe("/svg/game/player/player-attribute/drank-life-potion.svg");
      });

      it("should render drank life potion tag text when the target drank a life potion.", () => {
        const lifePotionTagText = wrapper.find<HTMLSpanElement>("#target-potion-tag-text");

        expect(lifePotionTagText.text()).toBe("components.GameOverHistoryRecordDecisionTarget.lifePotion");
      });
    });

    describe("Target drank death potion", () => {
      beforeEach(async() => {
        wrapper = await mountGameOverHistoryRecordDecisionTargetComponent({
          shallow: true,
          global: { stubs: { Tag: false } },
          props: {
            target: createFakeGameHistoryRecordPlayTarget({
              player: createFakeActorAlivePlayer({ name: "Antoine" }),
              drankPotion: "death",
            }),
          },
        });
      });

      it("should set severity to danger when the target drank a death potion.", () => {
        const deathPotionTag = wrapper.findComponent<typeof Tag>("#target-potion-tag");
        const props = deathPotionTag.props() as TagProps;

        expect(props.severity).toBe("danger");
      });

      it("should render drank death potion tag icon when the target drank a death potion.", () => {
        const deathPotionTagIcon = wrapper.findComponent<typeof NuxtImg>("[alt='components.GameOverHistoryRecordDecisionTarget.deathPotion']");

        expect(deathPotionTagIcon.attributes("src")).toBe("/svg/game/player/player-attribute/drank-death-potion.svg");
      });

      it("should render drank death potion tag text when the target drank a death potion.", () => {
        const deathPotionTagText = wrapper.find<HTMLSpanElement>("#target-potion-tag-text");

        expect(deathPotionTagText.text()).toBe("components.GameOverHistoryRecordDecisionTarget.deathPotion");
      });
    });
  });
});