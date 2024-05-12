import type { mount } from "@vue/test-utils";
import type { ComponentMountingOptions } from "@vue/test-utils/dist/mount";
import type { GameOverHistoryRecordDecisionBuriedPlayersProps } from "~/components/pages/game/GameOver/GameOverHistory/GameOverHistoryRecords/GameOverHistoryRecord/GameOverHistoryRecordDecision/GameOverHistoryRecordDecisionBuriedPlayers/game-over-history-record-decision-buried-players.types";
import type GameOverHistoryRecordDecisionBuriedPlayer from "~/components/pages/game/GameOver/GameOverHistory/GameOverHistoryRecords/GameOverHistoryRecord/GameOverHistoryRecordDecision/GameOverHistoryRecordDecisionBuriedPlayers/GameOverHistoryRecordDecisionBuriedPlayer/GameOverHistoryRecordDecisionBuriedPlayer.vue";
import GameOverHistoryRecordDecisionBuriedPlayers from "~/components/pages/game/GameOver/GameOverHistory/GameOverHistoryRecords/GameOverHistoryRecord/GameOverHistoryRecordDecision/GameOverHistoryRecordDecisionBuriedPlayers/GameOverHistoryRecordDecisionBuriedPlayers.vue";
import type OverflowTag from "~/components/shared/misc/OverflowTag/OverflowTag.vue";
import type { Player } from "~/composables/api/game/types/players/player.class";
import { createFakeGameHistoryRecordPlaySource } from "~/tests/unit/utils/factories/composables/api/game/game-history-record/game-history-record-play/game-history-record-play-source/game-history-record-play-source.factory";
import { createFakeGameHistoryRecordPlay } from "~/tests/unit/utils/factories/composables/api/game/game-history-record/game-history-record-play/game-history-record-play.factory";
import { createFakeGameHistoryRecord } from "~/tests/unit/utils/factories/composables/api/game/game-history-record/game-history-record.factory";
import { createFakeGamePlaySourceInteraction } from "~/tests/unit/utils/factories/composables/api/game/game-play/game-play-source/game-play-source-interaction/game-play-source-interaction.factory";
import { createFakeActorAlivePlayer } from "~/tests/unit/utils/factories/composables/api/game/player/player-with-role.factory";

import { mountSuspendedComponent } from "~/tests/unit/utils/helpers/mount.helpers";

describe("Game Over History Record Decision Buried Players Component", () => {
  let wrapper: ReturnType<typeof mount<typeof GameOverHistoryRecordDecisionBuriedPlayers>>;
  const defaultBuriedPlayers = [
    createFakeActorAlivePlayer({ name: "Antoine" }),
    createFakeActorAlivePlayer({ name: "Vanessa" }),
    createFakeActorAlivePlayer({ name: "Thomas" }),
    createFakeActorAlivePlayer({ name: "Doudou" }),
  ];
  const defaultGameHistoryRecord = createFakeGameHistoryRecord({
    play: createFakeGameHistoryRecordPlay({
      type: "bury-dead-bodies",
      action: "bury-dead-bodies",
      source: createFakeGameHistoryRecordPlaySource({
        interactions: [
          createFakeGamePlaySourceInteraction({
            type: "bury",
            eligibleTargets: defaultBuriedPlayers,
          }),
          createFakeGamePlaySourceInteraction({
            type: "steal-role",
            eligibleTargets: [
              createFakeActorAlivePlayer({ name: "Antoine" }),
              createFakeActorAlivePlayer({ name: "Vanessa" }),
            ],
          }),
        ],
      }),
    }),
  });
  const defaultProps: GameOverHistoryRecordDecisionBuriedPlayersProps = { gameHistoryRecord: defaultGameHistoryRecord };

  async function mountGameOverHistoryRecordDecisionBuriedPlayersComponent(options: ComponentMountingOptions<typeof GameOverHistoryRecordDecisionBuriedPlayers> = {}):
  Promise<ReturnType<typeof mount<typeof GameOverHistoryRecordDecisionBuriedPlayers>>> {
    return mountSuspendedComponent(GameOverHistoryRecordDecisionBuriedPlayers, {
      props: defaultProps,
      ...options,
    });
  }

  beforeEach(async() => {
    wrapper = await mountGameOverHistoryRecordDecisionBuriedPlayersComponent();
  });

  it("should match snapshot when rendered.", () => {
    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });

  describe("Buried Players", () => {
    it("should display the truncated list of buried players when rendered.", () => {
      const buriedPlayers = wrapper.findAllComponents<typeof GameOverHistoryRecordDecisionBuriedPlayer>(".game-over-history-record-buried-player");

      expect(buriedPlayers).toHaveLength(3);
      expect(buriedPlayers[0].props("buriedPlayer")).toStrictEqual<Player>(defaultBuriedPlayers[0]);
      expect(buriedPlayers[1].props("buriedPlayer")).toStrictEqual<Player>(defaultBuriedPlayers[1]);
      expect(buriedPlayers[2].props("buriedPlayer")).toStrictEqual<Player>(defaultBuriedPlayers[2]);
    });

    it("should display all buried players when there are less than 4 buried players.", async() => {
      wrapper = await mountGameOverHistoryRecordDecisionBuriedPlayersComponent({
        props: {
          gameHistoryRecord: createFakeGameHistoryRecord({
            play: createFakeGameHistoryRecordPlay({
              type: "bury-dead-bodies",
              action: "bury-dead-bodies",
              source: createFakeGameHistoryRecordPlaySource({
                interactions: [
                  createFakeGamePlaySourceInteraction({
                    type: "bury",
                    eligibleTargets: defaultBuriedPlayers.slice(0, 2),
                  }),
                  createFakeGamePlaySourceInteraction({
                    type: "steal-role",
                    eligibleTargets: [
                      createFakeActorAlivePlayer({ name: "Antoine" }),
                      createFakeActorAlivePlayer({ name: "Vanessa" }),
                    ],
                  }),
                ],
              }),
            }),
          }),
        },
      });
      const buriedPlayers = wrapper.findAllComponents<typeof GameOverHistoryRecordDecisionBuriedPlayer>(".game-over-history-record-buried-player");

      expect(buriedPlayers).toHaveLength(2);
      expect(buriedPlayers[0].props("buriedPlayer")).toStrictEqual<Player>(defaultBuriedPlayers[0]);
      expect(buriedPlayers[1].props("buriedPlayer")).toStrictEqual<Player>(defaultBuriedPlayers[1]);
    });

    it("should display no buried players when there are no interactions.", async() => {
      wrapper = await mountGameOverHistoryRecordDecisionBuriedPlayersComponent({
        props: {
          gameHistoryRecord: createFakeGameHistoryRecord({
            play: createFakeGameHistoryRecordPlay({
              type: "bury-dead-bodies",
              action: "bury-dead-bodies",
              source: createFakeGameHistoryRecordPlaySource(),
            }),
          }),
        },
      });
      const buriedPlayers = wrapper.findAllComponents<typeof GameOverHistoryRecordDecisionBuriedPlayer>(".game-over-history-record-buried-player");

      expect(buriedPlayers).toHaveLength(0);
    });

    it("should display no buried players when there are no eligible targets.", async() => {
      wrapper = await mountGameOverHistoryRecordDecisionBuriedPlayersComponent({
        props: {
          gameHistoryRecord: createFakeGameHistoryRecord({
            play: createFakeGameHistoryRecordPlay({
              type: "bury-dead-bodies",
              action: "bury-dead-bodies",
              source: createFakeGameHistoryRecordPlaySource({ interactions: [createFakeGamePlaySourceInteraction({ type: "bury" })] }),
            }),
          }),
        },
      });
      const buriedPlayers = wrapper.findAllComponents<typeof GameOverHistoryRecordDecisionBuriedPlayer>(".game-over-history-record-buried-player");

      expect(buriedPlayers).toHaveLength(0);
    });
  });

  describe("Overflow Tag", () => {
    it("should display the overflow tag when rendered.", () => {
      const overflowTag = wrapper.findComponent<typeof OverflowTag>("#buried-players-overflow-tag");

      expect(overflowTag.props("entitiesCount")).toBe(4);
      expect(overflowTag.props("maximumEntitiesDisplayed")).toBe(3);
    });
  });
});