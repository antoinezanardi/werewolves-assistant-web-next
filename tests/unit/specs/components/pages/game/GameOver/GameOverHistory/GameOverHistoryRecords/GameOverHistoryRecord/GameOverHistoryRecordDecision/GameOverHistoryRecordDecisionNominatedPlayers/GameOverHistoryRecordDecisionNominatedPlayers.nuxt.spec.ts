import type { mount } from "@vue/test-utils";
import type { ComponentMountingOptions } from "@vue/test-utils/dist/mount";
import type { GameOverHistoryRecordDecisionNominatedPlayersProps } from "~/components/pages/game/GameOver/GameOverHistory/GameOverHistoryRecords/GameOverHistoryRecord/GameOverHistoryRecordDecision/GameOverHistoryRecordDecisionNominatedPlayers/game-over-history-record-decision-nominated-players.types";
import GameOverHistoryRecordDecisionNominatedPlayers from "~/components/pages/game/GameOver/GameOverHistory/GameOverHistoryRecords/GameOverHistoryRecord/GameOverHistoryRecordDecision/GameOverHistoryRecordDecisionNominatedPlayers/GameOverHistoryRecordDecisionNominatedPlayers.vue";
import type PlayerCard from "~/components/shared/game/player/PlayerCard/PlayerCard.vue";
import type OverflowTag from "~/components/shared/misc/OverflowTag/OverflowTag.vue";
import { createFakeGameHistoryRecordPlayVoting } from "~/tests/unit/utils/factories/composables/api/game/game-history-record/game-history-record-play/game-history-record-play-voting/game-history-record-play-voting.factory";
import { createFakeGameHistoryRecordPlay } from "~/tests/unit/utils/factories/composables/api/game/game-history-record/game-history-record-play/game-history-record-play.factory";
import { createFakeGameHistoryRecord } from "~/tests/unit/utils/factories/composables/api/game/game-history-record/game-history-record.factory";
import { createFakeActorAlivePlayer } from "~/tests/unit/utils/factories/composables/api/game/player/player-with-role.factory";

import { mountSuspendedComponent } from "~/tests/unit/utils/helpers/mount.helpers";

describe("Game Over History Record Decision Nominated Players Component", () => {
  let wrapper: ReturnType<typeof mount<typeof GameOverHistoryRecordDecisionNominatedPlayers>>;
  const defaultNominatedPlayers = [
    createFakeActorAlivePlayer({ name: "Antoine" }),
    createFakeActorAlivePlayer({ name: "Vanessa" }),
    createFakeActorAlivePlayer({ name: "Thomas" }),
    createFakeActorAlivePlayer({ name: "Doudou" }),
  ];
  const defaultGameHistoryRecord = createFakeGameHistoryRecord({
    play: createFakeGameHistoryRecordPlay({
      type: "vote",
      action: "vote",
      voting: createFakeGameHistoryRecordPlayVoting({
        nominatedPlayers: defaultNominatedPlayers,
        result: "death",
      }),
    }),
  });
  const defaultProps: GameOverHistoryRecordDecisionNominatedPlayersProps = { gameHistoryRecord: defaultGameHistoryRecord };

  async function mountGameOverHistoryRecordDecisionNominatedPlayersComponent(options: ComponentMountingOptions<typeof GameOverHistoryRecordDecisionNominatedPlayers> = {}):
  Promise<ReturnType<typeof mount<typeof GameOverHistoryRecordDecisionNominatedPlayers>>> {
    return mountSuspendedComponent(GameOverHistoryRecordDecisionNominatedPlayers, {
      props: defaultProps,
      ...options,
    });
  }

  beforeEach(async() => {
    wrapper = await mountGameOverHistoryRecordDecisionNominatedPlayersComponent();
  });

  it("should match snapshot when rendered.", () => {
    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });

  describe("Nominated Players", () => {
    it("should render the truncated nominated players when there are more than 3 nominated players.", () => {
      const nominatedPlayers = wrapper.findAllComponents<typeof PlayerCard>(".game-over-history-record-decision-nominated-player-card");

      expect(nominatedPlayers).toHaveLength(3);
      expect(nominatedPlayers[0].props("playerName")).toBe("Antoine");
      expect(nominatedPlayers[1].props("playerName")).toBe("Vanessa");
      expect(nominatedPlayers[2].props("playerName")).toBe("Thomas");
    });

    it("should render the full nominated players when there are less than 3 nominated players.", async() => {
      const gameHistoryRecord = createFakeGameHistoryRecord({
        play: createFakeGameHistoryRecordPlay({
          type: "vote",
          action: "vote",
          voting: createFakeGameHistoryRecordPlayVoting({
            nominatedPlayers: [createFakeActorAlivePlayer({ name: "Antoine" })],
            result: "death",
          }),
        }),
      });
      wrapper = await mountGameOverHistoryRecordDecisionNominatedPlayersComponent({ props: { gameHistoryRecord } });
      const nominatedPlayers = wrapper.findAllComponents<typeof PlayerCard>(".game-over-history-record-decision-nominated-player-card");

      expect(nominatedPlayers).toHaveLength(1);
      expect(nominatedPlayers[0].props("playerName")).toBe("Antoine");
    });

    it("should not render the nominated players when there are no voting results.", async() => {
      const gameHistoryRecord = createFakeGameHistoryRecord({ play: createFakeGameHistoryRecordPlay() });
      wrapper = await mountGameOverHistoryRecordDecisionNominatedPlayersComponent({ props: { gameHistoryRecord } });
      const nominatedPlayers = wrapper.findAllComponents<typeof PlayerCard>(".game-over-history-record-decision-nominated-player-card");

      expect(wrapper).toBeTruthy();
      expect(nominatedPlayers).toHaveLength(0);
    });

    it("should not render the nominated players when there are no nominated players.", async() => {
      const gameHistoryRecord = createFakeGameHistoryRecord({
        play: createFakeGameHistoryRecordPlay({
          type: "vote",
          action: "vote",
          voting: createFakeGameHistoryRecordPlayVoting({ result: "death" }),
        }),
      });
      wrapper = await mountGameOverHistoryRecordDecisionNominatedPlayersComponent({ props: { gameHistoryRecord } });
      const nominatedPlayers = wrapper.findAllComponents<typeof PlayerCard>(".game-over-history-record-decision-nominated-player-card");

      expect(nominatedPlayers).toHaveLength(0);
    });
  });

  describe("Overflow Tag", () => {
    it("should render Overflow Tag when rendered.", () => {
      const overflowTag = wrapper.findComponent<typeof OverflowTag>("#nominated-players-overflow-tag");

      expect(overflowTag.props("entitiesCount")).toBe(4);
      expect(overflowTag.props("maximumEntitiesDisplayed")).toBe(3);
    });
  });
});