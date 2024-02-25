import type { mount } from "@vue/test-utils";

import type { GameTeamSidePlayerProps } from "~/components/pages/game/GamePlaying/GameTeamSide/GameTeamSidePlayer/game-team-side-player.types";
import GameTeamSidePlayer from "~/components/pages/game/GamePlaying/GameTeamSide/GameTeamSidePlayer/GameTeamSidePlayer.vue";
import type RoleImage from "~/components/shared/role/RoleImage/RoleImage.vue";
import { RoleNames } from "~/composables/api/role/enums/role.enums";
import { createFakeAccursedWolfFatherAlivePlayer, createFakeSeerAlivePlayer, createFakeWerewolfAlivePlayer } from "~/tests/unit/utils/factories/composables/api/game/player/player-with-role.factory";
import { mountSuspendedComponent } from "~/tests/unit/utils/helpers/mount.helpers";

describe("Game Team Side Player Component", () => {
  let wrapper: ReturnType<typeof mount<typeof GameTeamSidePlayer>>;
  const defaultProps: GameTeamSidePlayerProps = { player: createFakeWerewolfAlivePlayer({ name: "Antoine" }) };

  beforeEach(async() => {
    wrapper = await mountSuspendedComponent(GameTeamSidePlayer, { props: defaultProps });
  });

  it("should match snapshot when rendered.", () => {
    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });

  describe("Player name", () => {
    it("should display player name when rendered.", () => {
      const playerName = wrapper.find<HTMLDivElement>("#player-name");

      expect(playerName.text()).toBe("Antoine");
    });
  });

  describe("Player role name", () => {
    it("should display player role when rendered.", () => {
      const playerRole = wrapper.find<HTMLDivElement>("#player-role-name");

      expect(playerRole.text()).toBe("Werewolf");
    });
  });

  describe("Player role image", () => {
    it("should display player role image on the left when side is villagers.", async() => {
      const player = createFakeSeerAlivePlayer();
      wrapper = await mountSuspendedComponent(GameTeamSidePlayer, { props: { ...defaultProps, player } });
      const playerRoleImage = wrapper.findComponent<typeof RoleImage>("#player-villager-role-image");

      expect(playerRoleImage.props("roleName")).toBe(RoleNames.SEER);
    });

    it("should display player role image on the right when side is werewolves.", async() => {
      const player = createFakeAccursedWolfFatherAlivePlayer();
      wrapper = await mountSuspendedComponent(GameTeamSidePlayer, { props: { ...defaultProps, player } });
      const playerRoleImage = wrapper.findComponent<typeof RoleImage>("#player-werewolf-role-image");

      expect(playerRoleImage.props("roleName")).toBe(RoleNames.ACCURSED_WOLF_FATHER);
    });
  });
});