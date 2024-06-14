import type { NuxtImg } from "#components";
import type { mount } from "@vue/test-utils";
import type { ComponentMountingOptions } from "@vue/test-utils/dist/mount";
import type { GameOverHistoryRecordDecisionChosenSideProps } from "~/components/pages/game/GameOver/GameOverHistory/GameOverHistoryRecords/GameOverHistoryRecord/GameOverHistoryRecordDecision/GameOverHistoryRecordDecisionChosenSide/game-over-history-record-decision-chosen-side.types";
import GameOverHistoryRecordDecisionChosenSide from "~/components/pages/game/GameOver/GameOverHistory/GameOverHistoryRecords/GameOverHistoryRecord/GameOverHistoryRecordDecision/GameOverHistoryRecordDecisionChosenSide/GameOverHistoryRecordDecisionChosenSide.vue";
import { createFakeGameHistoryRecordPlay } from "@tests/unit/utils/factories/composables/api/game/game-history-record/game-history-record-play/game-history-record-play.factory";
import { createFakeGameHistoryRecord } from "@tests/unit/utils/factories/composables/api/game/game-history-record/game-history-record.factory";

import { mountSuspendedComponent } from "@tests/unit/utils/helpers/mount.helpers";

describe("Game Over History Record Decision Chosen Side Component", () => {
  let wrapper: ReturnType<typeof mount<typeof GameOverHistoryRecordDecisionChosenSide>>;
  const defaultGameHistoryRecord = createFakeGameHistoryRecord({ play: createFakeGameHistoryRecordPlay({ chosenSide: "werewolves" }) });
  const defaultProps: GameOverHistoryRecordDecisionChosenSideProps = { gameHistoryRecord: defaultGameHistoryRecord };

  async function mountGameOverHistoryRecordDecisionChosenSideComponent(options: ComponentMountingOptions<typeof GameOverHistoryRecordDecisionChosenSide> = {}):
  Promise<ReturnType<typeof mount<typeof GameOverHistoryRecordDecisionChosenSide>>> {
    return mountSuspendedComponent(GameOverHistoryRecordDecisionChosenSide, {
      props: defaultProps,
      ...options,
    });
  }

  beforeEach(async() => {
    wrapper = await mountGameOverHistoryRecordDecisionChosenSideComponent();
  });

  it("should match snapshot when rendered.", () => {
    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });

  describe("Chosen Side Text", () => {
    it("should render the chosen side text when rendered.", () => {
      const chosenSideText = wrapper.find<HTMLHeadElement>("#game-over-history-record-decision-chosen-side-text");

      expect(chosenSideText.text()).toBe("shared.role.definiteSide.werewolves");
    });
  });

  describe("Chosen Side Icon", () => {
    it("should render the chosen werewolves side icon when rendered.", () => {
      const chosenSideIcon = wrapper.findComponent<typeof NuxtImg>("[alt='Werewolves side']");

      expect(chosenSideIcon.attributes("src")).toBe("/svg/role/werewolf.svg");
    });

    it("should render the chosen villagers side icon when rendered.", async() => {
      const gameHistoryRecord = createFakeGameHistoryRecord({ play: createFakeGameHistoryRecordPlay({ chosenSide: "villagers" }) });
      wrapper = await mountGameOverHistoryRecordDecisionChosenSideComponent({ props: { gameHistoryRecord } });
      const chosenSideIcon = wrapper.findComponent<typeof NuxtImg>("[alt='Villagers side']");

      expect(chosenSideIcon.attributes("src")).toBe("/svg/role/villager.svg");
    });
  });
});