import type { NuxtImg } from "#components";
import type { VuePrimeTag } from "#components";
import type { mount } from "@vue/test-utils";
import type { ComponentMountingOptions } from "@vue/test-utils/dist/mount";
import type { GameOverHistoryRecordDecisionTargetProps } from "~/components/pages/game/GameOver/GameOverHistory/GameOverHistoryRecords/GameOverHistoryRecord/GameOverHistoryRecordDecision/GameOverHistoryRecordDecisionTargets/GameOverHistoryRecordDecisionTarget/game-over-history-record-decision-target.types";
import GameOverHistoryRecordDecisionTarget from "~/components/pages/game/GameOver/GameOverHistory/GameOverHistoryRecords/GameOverHistoryRecord/GameOverHistoryRecordDecision/GameOverHistoryRecordDecisionTargets/GameOverHistoryRecordDecisionTarget/GameOverHistoryRecordDecisionTarget.vue";
import type PlayerCard from "~/components/shared/game/player/PlayerCard/PlayerCard.vue";
import { createFakeGameHistoryRecordPlayTarget } from "~/tests/unit/utils/factories/composables/api/game/game-history-record/game-history-record-play/game-history-record-play-target/game-history-record-play-target.factory";
import { createFakeActorAlivePlayer } from "~/tests/unit/utils/factories/composables/api/game/player/player-with-role.factory";

import { mountSuspendedComponent } from "~/tests/unit/utils/helpers/mount.helpers";

describe("Game Over History Record Decision Target Component", () => {
  let wrapper: ReturnType<typeof mount<typeof GameOverHistoryRecordDecisionTarget>>;
  const defaultTarget = createFakeGameHistoryRecordPlayTarget({ player: createFakeActorAlivePlayer({ name: "Antoine" }) });
  const defaultProps: GameOverHistoryRecordDecisionTargetProps = { target: defaultTarget };

  async function mountGameOverHistoryRecordDecisionTargetComponent(options: ComponentMountingOptions<typeof GameOverHistoryRecordDecisionTarget> = {}):
  Promise<ReturnType<typeof mount<typeof GameOverHistoryRecordDecisionTarget>>> {
    return mountSuspendedComponent(GameOverHistoryRecordDecisionTarget, {
      props: defaultProps,
      ...options,
    });
  }

  beforeEach(async() => {
    wrapper = await mountGameOverHistoryRecordDecisionTargetComponent();
  });

  it("should match snapshot when rendered.", () => {
    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });

  describe("Player Card", () => {
    it("should render Player Card with the target player name when rendered.", () => {
      const playerCard = wrapper.findComponent<typeof PlayerCard>(".game-over-history-record-decision-target-player-card");

      expect(playerCard.props("playerName")).toBe(defaultTarget.player.name);
      expect(playerCard.props("playerRole")).toBe(defaultTarget.player.role.current);
    });
  });

  describe("Drank potion tag", () => {
    it("should not render drank potion tag when the target did not drink a potion.", () => {
      const overflowTag = wrapper.findComponent<typeof VuePrimeTag>("#target-potion-tag");

      expect(overflowTag.exists()).toBeFalsy();
    });

    describe("Target drank life potion", () => {
      beforeEach(async() => {
        wrapper = await mountGameOverHistoryRecordDecisionTargetComponent({
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
        const lifePotionTag = wrapper.findComponent<typeof VuePrimeTag>("#target-potion-tag");

        expect(lifePotionTag.props("severity")).toBe("success");
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
        const deathPotionTag = wrapper.findComponent<typeof VuePrimeTag>("#target-potion-tag");

        expect(deathPotionTag.props("severity")).toBe("danger");
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