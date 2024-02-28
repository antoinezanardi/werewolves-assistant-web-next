import type { mount } from "@vue/test-utils";
import type { ComponentMountingOptions } from "@vue/test-utils/dist/mount";

import type { GameTeamSidePlayerProps } from "~/components/pages/game/GamePlaying/GameTeamSide/GameTeamSidePlayer/game-team-side-player.types";
import GameTeamSidePlayer from "~/components/pages/game/GamePlaying/GameTeamSide/GameTeamSidePlayer/GameTeamSidePlayer.vue";
import type RoleImage from "~/components/shared/role/RoleImage/RoleImage.vue";
import { RoleNames } from "~/composables/api/role/enums/role.enums";
import { createFakeAccursedWolfFatherAlivePlayer, createFakeSeerAlivePlayer, createFakeWerewolfAlivePlayer } from "~/tests/unit/utils/factories/composables/api/game/player/player-with-role.factory";
import { mountSuspendedComponent } from "~/tests/unit/utils/helpers/mount.helpers";

describe("Game Team Side Player Component", () => {
  let wrapper: ReturnType<typeof mount<typeof GameTeamSidePlayer>>;
  const defaultProps: GameTeamSidePlayerProps = { player: createFakeWerewolfAlivePlayer({ name: "Antoine" }) };

  async function mountGameTeamSidePlayerComponent(options: ComponentMountingOptions<typeof GameTeamSidePlayer> = {}): Promise<ReturnType<typeof mount<typeof GameTeamSidePlayer>>> {
    return mountSuspendedComponent(GameTeamSidePlayer, {
      props: defaultProps,
      shallow: false,
      global: { stubs: { RoleImage: true } },
      ...options,
    });
  }

  beforeEach(async() => {
    wrapper = await mountGameTeamSidePlayerComponent();
  });

  it("should match snapshot when rendered.", () => {
    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });

  describe("Game Team Side Player", () => {
    it("should glow as green when side is villagers.", async() => {
      const player = createFakeSeerAlivePlayer();
      wrapper = await mountGameTeamSidePlayerComponent({ props: { ...defaultProps, player } });
      const teamSidePlayer = wrapper.find<HTMLDivElement>("#game-team-side-player");

      expect(teamSidePlayer.classes("glow:border-green-500")).toBeTruthy();
    });

    it("should glow as red when side is werewolves.", async() => {
      const player = createFakeAccursedWolfFatherAlivePlayer();
      wrapper = await mountGameTeamSidePlayerComponent({ props: { ...defaultProps, player } });
      const teamSidePlayer = wrapper.find<HTMLDivElement>("#game-team-side-player");

      expect(teamSidePlayer.classes("glow:border-red-500")).toBeTruthy();
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
        wrapper = await mountGameTeamSidePlayerComponent({ props: { ...defaultProps, player } });
        const playerRoleImage = wrapper.findComponent<typeof RoleImage>("#player-villager-role-image");

        expect(playerRoleImage.props("roleName")).toBe(RoleNames.SEER);
      });

      it("should display player role image on the right when side is werewolves.", async() => {
        const player = createFakeAccursedWolfFatherAlivePlayer();
        wrapper = await mountGameTeamSidePlayerComponent({ props: { ...defaultProps, player } });
        const playerRoleImage = wrapper.findComponent<typeof RoleImage>("#player-werewolf-role-image");

        expect(playerRoleImage.props("roleName")).toBe(RoleNames.ACCURSED_WOLF_FATHER);
      });
    });
  });
});