import type { mount } from "@vue/test-utils";
import type { ComponentMountingOptions } from "@vue/test-utils/dist/mount";

import { createFakeGameHistoryRecordPlaySource } from "@tests/unit/utils/factories/composables/api/game/game-history-record/game-history-record-play/game-history-record-play-source/game-history-record-play-source.factory";
import { createFakeGameHistoryRecordPlay } from "@tests/unit/utils/factories/composables/api/game/game-history-record/game-history-record-play/game-history-record-play.factory";
import { createFakeGameHistoryRecord } from "@tests/unit/utils/factories/composables/api/game/game-history-record/game-history-record.factory";
import { createFakeGamePlaySourceInteraction } from "@tests/unit/utils/factories/composables/api/game/game-play/game-play-source/game-play-source-interaction/game-play-source-interaction.factory";
import { createFakeActorAlivePlayer } from "@tests/unit/utils/factories/composables/api/game/player/player-with-role.factory";
import { mountSuspendedComponent } from "@tests/unit/utils/helpers/mount.helpers";
import type { GameOverHistoryRecordDecisionBuriedPlayersProps } from "~/components/pages/game/GameOver/GameOverHistory/GameOverHistoryRecords/GameOverHistoryRecord/GameOverHistoryRecordDecision/GameOverHistoryRecordDecisionBuriedPlayers/game-over-history-record-decision-buried-players.types";
import type GameOverHistoryRecordDecisionBuriedPlayer from "~/components/pages/game/GameOver/GameOverHistory/GameOverHistoryRecords/GameOverHistoryRecord/GameOverHistoryRecordDecision/GameOverHistoryRecordDecisionBuriedPlayers/GameOverHistoryRecordDecisionBuriedPlayer/GameOverHistoryRecordDecisionBuriedPlayer.vue";
import GameOverHistoryRecordDecisionBuriedPlayers from "~/components/pages/game/GameOver/GameOverHistory/GameOverHistoryRecords/GameOverHistoryRecord/GameOverHistoryRecordDecision/GameOverHistoryRecordDecisionBuriedPlayers/GameOverHistoryRecordDecisionBuriedPlayers.vue";
import type { Player } from "~/composables/api/game/types/players/player.class";

describe("Game Over History Record Decision Buried Players Component", () => {
  let wrapper: ReturnType<typeof mount<typeof GameOverHistoryRecordDecisionBuriedPlayers>>;
  const defaultBuriedPlayers = [
    createFakeActorAlivePlayer({ name: "Antoine" }),
    createFakeActorAlivePlayer({ name: "Olivia" }),
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
            type: "steal-role",
            eligibleTargets: [
              createFakeActorAlivePlayer({ name: "Antoine" }),
              createFakeActorAlivePlayer({ name: "Olivia" }),
            ],
          }),
          createFakeGamePlaySourceInteraction({
            type: "bury",
            eligibleTargets: defaultBuriedPlayers,
          }),
          createFakeGamePlaySourceInteraction({
            type: "steal-role",
            eligibleTargets: [
              createFakeActorAlivePlayer({ name: "Antoine" }),
              createFakeActorAlivePlayer({ name: "Olivia" }),
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

  describe("Buried Player Title", () => {
    it("should display the buried player role name when there is only one buried player.", async() => {
      const buriedPlayer = createFakeActorAlivePlayer({ name: "Antoine" });
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
                    eligibleTargets: [buriedPlayer],
                  }),
                ],
              }),
            }),
          }),
        },
      });
      const buriedPlayerTitle = wrapper.find("#game-over-history-record-decision-buried-player-role-name");

      expect(buriedPlayerTitle.text()).toBe("shared.role.definiteName.actor, 1");
    });

    it("should not display the buried player role name when there are multiple buried players.", () => {
      const buriedPlayerTitle = wrapper.find("#game-over-history-record-decision-buried-player-role-name");

      expect(buriedPlayerTitle.exists()).toBeFalsy();
    });
  });

  describe("Buried Players", () => {
    it("should display all buried players when rendered.", () => {
      const buriedPlayers = wrapper.findAllComponents<typeof GameOverHistoryRecordDecisionBuriedPlayer>(".game-over-history-record-buried-player");

      expect(buriedPlayers).toHaveLength(4);
      expect(buriedPlayers[0].props("buriedPlayer")).toStrictEqual<Player>(defaultBuriedPlayers[0]);
      expect(buriedPlayers[1].props("buriedPlayer")).toStrictEqual<Player>(defaultBuriedPlayers[1]);
      expect(buriedPlayers[2].props("buriedPlayer")).toStrictEqual<Player>(defaultBuriedPlayers[2]);
      expect(buriedPlayers[3].props("buriedPlayer")).toStrictEqual<Player>(defaultBuriedPlayers[3]);
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
});