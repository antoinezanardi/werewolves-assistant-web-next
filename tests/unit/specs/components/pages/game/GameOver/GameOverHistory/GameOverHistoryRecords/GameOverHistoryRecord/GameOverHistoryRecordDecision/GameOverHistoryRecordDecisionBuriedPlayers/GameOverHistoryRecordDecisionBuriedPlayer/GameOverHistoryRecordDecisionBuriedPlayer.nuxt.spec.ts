import type { NuxtImg } from "#components";
import type { mount } from "@vue/test-utils";
import type { ComponentMountingOptions } from "@vue/test-utils/dist/mount";
import type Tag from "primevue/tag";
import type { GameOverHistoryRecordDecisionBuriedPlayerProps } from "~/components/pages/game/GameOver/GameOverHistory/GameOverHistoryRecords/GameOverHistoryRecord/GameOverHistoryRecordDecision/GameOverHistoryRecordDecisionBuriedPlayers/GameOverHistoryRecordDecisionBuriedPlayer/game-over-history-record-decision-buried-player.types";
import GameOverHistoryRecordDecisionBuriedPlayer from "~/components/pages/game/GameOver/GameOverHistory/GameOverHistoryRecords/GameOverHistoryRecord/GameOverHistoryRecordDecision/GameOverHistoryRecordDecisionBuriedPlayers/GameOverHistoryRecordDecisionBuriedPlayer/GameOverHistoryRecordDecisionBuriedPlayer.vue";
import type PlayerCard from "~/components/shared/game/player/PlayerCard/PlayerCard.vue";
import { createFakeGameHistoryRecordPlayTarget } from "@tests/unit/utils/factories/composables/api/game/game-history-record/game-history-record-play/game-history-record-play-target/game-history-record-play-target.factory";
import { createFakeGameHistoryRecordPlay } from "@tests/unit/utils/factories/composables/api/game/game-history-record/game-history-record-play/game-history-record-play.factory";
import { createFakeGameHistoryRecord } from "@tests/unit/utils/factories/composables/api/game/game-history-record/game-history-record.factory";
import { createFakeActorAlivePlayer } from "@tests/unit/utils/factories/composables/api/game/player/player-with-role.factory";

import { mountSuspendedComponent } from "@tests/unit/utils/helpers/mount.helpers";

describe("Game Over History Record Decision Buried Player Component", () => {
  let wrapper: ReturnType<typeof mount<typeof GameOverHistoryRecordDecisionBuriedPlayer>>;
  const defaultBuriedPlayer = createFakeActorAlivePlayer({ name: "Antoine" });
  const defaultGameHistoryRecord = createFakeGameHistoryRecord({ play: createFakeGameHistoryRecordPlay() });
  const defaultProps: GameOverHistoryRecordDecisionBuriedPlayerProps = {
    buriedPlayer: defaultBuriedPlayer,
    gameHistoryRecord: defaultGameHistoryRecord,
  };

  async function mountGameOverHistoryRecordDecisionBuriedPlayerComponent(options: ComponentMountingOptions<typeof GameOverHistoryRecordDecisionBuriedPlayer> = {}):
  Promise<ReturnType<typeof mount<typeof GameOverHistoryRecordDecisionBuriedPlayer>>> {
    return mountSuspendedComponent(GameOverHistoryRecordDecisionBuriedPlayer, {
      props: defaultProps,
      ...options,
    });
  }

  beforeEach(async() => {
    wrapper = await mountGameOverHistoryRecordDecisionBuriedPlayerComponent();
  });

  it("should match snapshot when rendered.", () => {
    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });

  describe("Player Card", () => {
    it("should render Player Card with the buried player name and role when rendered.", () => {
      const playerCard = wrapper.findComponent<typeof PlayerCard>(".game-over-history-record-decision-buried-player-card");

      expect(playerCard.props("playerName")).toBe(defaultBuriedPlayer.name);
      expect(playerCard.props("playerRole")).toBe(defaultBuriedPlayer.role.current);
    });
  });

  describe("Devoted Servant Tag", () => {
    it("should render Devoted Servant Tag when the target is the buried player.", async() => {
      wrapper = await mountGameOverHistoryRecordDecisionBuriedPlayerComponent({
        props: {
          buriedPlayer: defaultBuriedPlayer,
          gameHistoryRecord: createFakeGameHistoryRecord({
            play: createFakeGameHistoryRecordPlay({
              type: "bury-dead-bodies",
              action: "bury-dead-bodies",
              targets: [createFakeGameHistoryRecordPlayTarget({ player: defaultBuriedPlayer })],
            }),
          }),
        },
      });
      const devotedServantTag = wrapper.findComponent<typeof Tag>("#devoted-servant-stolen-role-tag");

      expect(devotedServantTag.exists()).toBeTruthy();
    });

    it("should not render Devoted Servant Tag when there is no targets.", () => {
      const devotedServantTag = wrapper.findComponent<typeof Tag>("#devoted-servant-stolen-role-tag");

      expect(devotedServantTag.exists()).toBeFalsy();
    });

    it("should not render Devoted Servant Tag when the target is not the buried player.", async() => {
      wrapper = await mountGameOverHistoryRecordDecisionBuriedPlayerComponent({
        props: {
          buriedPlayer: defaultBuriedPlayer,
          gameHistoryRecord: createFakeGameHistoryRecord({
            play: createFakeGameHistoryRecordPlay({
              type: "bury-dead-bodies",
              action: "bury-dead-bodies",
              targets: [createFakeGameHistoryRecordPlayTarget({ player: createFakeActorAlivePlayer({ name: "Vanessa" }) })],
            }),
          }),
        },
      });
      const devotedServantTag = wrapper.findComponent<typeof Tag>("#devoted-servant-stolen-role-tag");

      expect(devotedServantTag.exists()).toBeFalsy();
    });

    describe("Devoted Servant Tag Content", () => {
      beforeEach(async() => {
        wrapper = await mountGameOverHistoryRecordDecisionBuriedPlayerComponent({
          global: { stubs: { Tag: false } },
          props: {
            buriedPlayer: defaultBuriedPlayer,
            gameHistoryRecord: createFakeGameHistoryRecord({
              play: createFakeGameHistoryRecordPlay({
                type: "bury-dead-bodies",
                action: "bury-dead-bodies",
                targets: [createFakeGameHistoryRecordPlayTarget({ player: defaultBuriedPlayer })],
              }),
            }),
          },
        });
      });

      it("should render the tag icon when rendered.", () => {
        const tagIcon = wrapper.findComponent<typeof NuxtImg>("[alt='Stolen role by the Devoted Servant icon']");

        expect(tagIcon.attributes("src")).toBe("/svg/game/player/player-attribute/stolen-role.svg");
      });

      it("should render the tag text when rendered.", () => {
        const tagText = wrapper.find<HTMLSpanElement>("#devoted-servant-stolen-role-tag-text");

        expect(tagText.text()).toBe("Stolen role by the Devoted Servant");
      });
    });
  });
});