import type { mount } from "@vue/test-utils";
import type { ComponentMountingOptions } from "@vue/test-utils/dist/mount";
import type Tag from "primevue/tag";

import type { NuxtImg } from "#components";
import { createFakeGameHistoryRecordPlayTarget } from "@tests/unit/utils/factories/composables/api/game/game-history-record/game-history-record-play/game-history-record-play-target/game-history-record-play-target.factory";
import { createFakeGameHistoryRecordPlay } from "@tests/unit/utils/factories/composables/api/game/game-history-record/game-history-record-play/game-history-record-play.factory";
import { createFakeGameHistoryRecord } from "@tests/unit/utils/factories/composables/api/game/game-history-record/game-history-record.factory";
import { createFakeActorAlivePlayer } from "@tests/unit/utils/factories/composables/api/game/player/player-with-role.factory";
import { mountSuspendedComponent } from "@tests/unit/utils/helpers/mount.helpers";
import type { GameOverHistoryRecordDecisionBuriedPlayerProps } from "~/components/pages/game/GameOver/GameOverHistory/GameOverHistoryRecords/GameOverHistoryRecord/GameOverHistoryRecordDecision/GameOverHistoryRecordDecisionBuriedPlayers/GameOverHistoryRecordDecisionBuriedPlayer/game-over-history-record-decision-buried-player.types";
import GameOverHistoryRecordDecisionBuriedPlayer from "~/components/pages/game/GameOver/GameOverHistory/GameOverHistoryRecords/GameOverHistoryRecord/GameOverHistoryRecordDecision/GameOverHistoryRecordDecisionBuriedPlayers/GameOverHistoryRecordDecisionBuriedPlayer/GameOverHistoryRecordDecisionBuriedPlayer.vue";
import type RoleImage from "~/components/shared/role/RoleImage/RoleImage.vue";

const hoistedMocks = vi.hoisted(() => ({
  useAppBreakpoints: {
    isSmallerThanMdBreakpoint: { value: false },
  },
}));

vi.mock("~/composables/style/useAppBreakpoints", () => ({
  useAppBreakpoints: (): typeof hoistedMocks.useAppBreakpoints => hoistedMocks.useAppBreakpoints,
}));

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
      shallow: false,
      props: defaultProps,
      global: {
        stubs: {
          RoleImage: true,
          NuxtImg: true,
        },
      },
      ...options,
    });
  }

  beforeEach(async() => {
    hoistedMocks.useAppBreakpoints.isSmallerThanMdBreakpoint.value = false;
    wrapper = await mountGameOverHistoryRecordDecisionBuriedPlayerComponent();
  });

  it("should match snapshot when rendered.", () => {
    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });

  describe("Role Image", () => {
    it("should render role image with the buried player role when rendered.", () => {
      const roleImage = wrapper.findComponent<typeof RoleImage>("#buried-player-role-image");

      expect(roleImage.props("roleName")).toBe(defaultBuriedPlayer.role.current);
    });

    it("should set role image size to 70px when the screen is not smaller than md.", () => {
      const roleImage = wrapper.findComponent<typeof RoleImage>("#buried-player-role-image");

      expect(roleImage.props("sizes")).toBe("70px");
    });

    it("should set role image size to 56px when the screen is smaller than md.", async() => {
      hoistedMocks.useAppBreakpoints.isSmallerThanMdBreakpoint.value = true;
      wrapper = await mountGameOverHistoryRecordDecisionBuriedPlayerComponent();
      const roleImage = wrapper.findComponent<typeof RoleImage>("#buried-player-role-image");

      expect(roleImage.props("sizes")).toBe("56px");
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
              targets: [createFakeGameHistoryRecordPlayTarget({ player: createFakeActorAlivePlayer({ name: "Olivia" }) })],
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