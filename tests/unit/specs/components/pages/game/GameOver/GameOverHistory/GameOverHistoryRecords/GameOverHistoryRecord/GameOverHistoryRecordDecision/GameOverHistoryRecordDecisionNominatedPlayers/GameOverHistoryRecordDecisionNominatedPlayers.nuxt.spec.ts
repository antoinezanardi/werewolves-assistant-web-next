import type { mount } from "@vue/test-utils";
import type { ComponentMountingOptions } from "@vue/test-utils/dist/mount";

import { createFakeGameHistoryRecordPlayVoting } from "@tests/unit/utils/factories/composables/api/game/game-history-record/game-history-record-play/game-history-record-play-voting/game-history-record-play-voting.factory";
import { createFakeGameHistoryRecordPlay } from "@tests/unit/utils/factories/composables/api/game/game-history-record/game-history-record-play/game-history-record-play.factory";
import { createFakeGameHistoryRecord } from "@tests/unit/utils/factories/composables/api/game/game-history-record/game-history-record.factory";
import { createFakeActorAlivePlayer } from "@tests/unit/utils/factories/composables/api/game/player/player-with-role.factory";
import { mountSuspendedComponent } from "@tests/unit/utils/helpers/mount.helpers";
import type { GameOverHistoryRecordDecisionNominatedPlayersProps } from "~/components/pages/game/GameOver/GameOverHistory/GameOverHistoryRecords/GameOverHistoryRecord/GameOverHistoryRecordDecision/GameOverHistoryRecordDecisionNominatedPlayers/game-over-history-record-decision-nominated-players.types";
import GameOverHistoryRecordDecisionNominatedPlayers from "~/components/pages/game/GameOver/GameOverHistory/GameOverHistoryRecords/GameOverHistoryRecord/GameOverHistoryRecordDecision/GameOverHistoryRecordDecisionNominatedPlayers/GameOverHistoryRecordDecisionNominatedPlayers.vue";
import type PlayersHorizontalList from "~/components/shared/game/player/PlayersHorizontalList/PlayersHorizontalList.vue";
import type { Player } from "~/composables/api/game/types/players/player.class";

describe("Game Over History Record Decision Nominated Players Component", () => {
  let wrapper: ReturnType<typeof mount<typeof GameOverHistoryRecordDecisionNominatedPlayers>>;
  const defaultNominatedPlayers = [
    createFakeActorAlivePlayer({ name: "Antoine" }),
    createFakeActorAlivePlayer({ name: "Olivia" }),
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

  describe("Nominated Player Role Title", () => {
    it("should not render the nominated player role title when there are multiple nominated players.", () => {
      const nominatedPlayerRoleTitle = wrapper.find<HTMLHeadingElement>("#game-over-history-decision-nominated-player-role-name");

      expect(nominatedPlayerRoleTitle.exists()).toBeFalsy();
    });

    it("should render the nominated player role title when there is only one nominated player.", async() => {
      wrapper = await mountGameOverHistoryRecordDecisionNominatedPlayersComponent({
        props: {
          gameHistoryRecord: createFakeGameHistoryRecord({
            play: createFakeGameHistoryRecordPlay({
              type: "vote",
              action: "vote",
              voting: createFakeGameHistoryRecordPlayVoting({
                nominatedPlayers: [createFakeActorAlivePlayer({ name: "Antoine" })],
                result: "death",
              }),
            }),
          }),
        },
      });
      const nominatedPlayerRoleTitle = wrapper.find<HTMLHeadingElement>("#game-over-history-decision-nominated-player-role-name");

      expect(nominatedPlayerRoleTitle.text()).toBe("shared.role.definiteName.actor, 1");
    });
  });

  describe("Nominated Players", () => {
    it("should pass nominated players to horizontal list when rendered.", () => {
      const playersHorizontalList = wrapper.findComponent<typeof PlayersHorizontalList>("#nominated-players-horizontal-list");

      expect(playersHorizontalList.props("players")).toStrictEqual<Player[]>(defaultNominatedPlayers);
    });

    it("should not render the nominated players when there are no voting results.", async() => {
      const gameHistoryRecord = createFakeGameHistoryRecord({ play: createFakeGameHistoryRecordPlay() });
      wrapper = await mountGameOverHistoryRecordDecisionNominatedPlayersComponent({ props: { gameHistoryRecord } });
      const playersHorizontalList = wrapper.findComponent<typeof PlayersHorizontalList>("#nominated-players-horizontal-list");

      expect(playersHorizontalList.props("players")).toStrictEqual<Player[]>([]);
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
      const playersHorizontalList = wrapper.findComponent<typeof PlayersHorizontalList>("#nominated-players-horizontal-list");

      expect(playersHorizontalList.props("players")).toStrictEqual<Player[]>([]);
    });
  });
});