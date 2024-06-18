import type { mount } from "@vue/test-utils";
import type { ComponentMountingOptions } from "@vue/test-utils/dist/mount";

import type { NuxtImg } from "#components";
import type { GameTeamSidePlayerProps } from "~/components/pages/game/GamePlaying/GameTeamSide/GameTeamSidePlayer/game-team-side-player.types";
import GameTeamSidePlayer from "~/components/pages/game/GamePlaying/GameTeamSide/GameTeamSidePlayer/GameTeamSidePlayer.vue";
import GameTeamSidePlayerAttribute from "~/components/pages/game/GamePlaying/GameTeamSide/GameTeamSidePlayer/GameTeamSidePlayerAttribute/GameTeamSidePlayerAttribute.vue";
import type RoleImage from "~/components/shared/role/RoleImage/RoleImage.vue";
import type { PlayerAttribute } from "~/composables/api/game/types/players/player-attribute/player-attribute.class";
import { createFakeActingByActorPlayerAttribute, createFakeSeenBySeerPlayerAttribute } from "@tests/unit/utils/factories/composables/api/game/player/player-attribute/player-attribute.factory";
import { createFakeAccursedWolfFatherAlivePlayer, createFakeSeerAlivePlayer, createFakeWerewolfAlivePlayer } from "@tests/unit/utils/factories/composables/api/game/player/player-with-role.factory";
import { pTooltipDirectiveBinder } from "@tests/unit/utils/helpers/directive.helpers";
import { mountSuspendedComponent } from "@tests/unit/utils/helpers/mount.helpers";
import type { BoundTooltip } from "@tests/unit/utils/types/directive.types";

describe("Game Team Side Player Component", () => {
  let wrapper: ReturnType<typeof mount<typeof GameTeamSidePlayer>>;
  const defaultPlayer = createFakeWerewolfAlivePlayer({
    name: "Antoine",
    attributes: [
      createFakeActingByActorPlayerAttribute(),
      createFakeSeenBySeerPlayerAttribute(),
    ],
  });
  const defaultProps: GameTeamSidePlayerProps = { player: defaultPlayer };

  async function mountGameTeamSidePlayerComponent(options: ComponentMountingOptions<typeof GameTeamSidePlayer> = {}): Promise<ReturnType<typeof mount<typeof GameTeamSidePlayer>>> {
    return mountSuspendedComponent(GameTeamSidePlayer, {
      shallow: false,
      props: defaultProps,
      global: {
        stubs: {
          GameTeamSidePlayerName: true,
          GameTeamSidePlayerRoleName: true,
          RoleImage: true,
          GameTeamSidePlayerAttribute: true,
        },
      },
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

    it("should not glow when player is dead.", async() => {
      const player = createFakeSeerAlivePlayer({ isAlive: false });
      wrapper = await mountGameTeamSidePlayerComponent({ props: { ...defaultProps, player } });
      const teamSidePlayer = wrapper.find<HTMLDivElement>("#game-team-side-player");

      expect(teamSidePlayer.classes()).toStrictEqual<string[]>(["border-2", "border-gray-700", "p-2", "rounded-md", "w-full"]);
    });

    describe("Player role image", () => {
      it("should display player role image on the left when side is villagers.", async() => {
        const player = createFakeSeerAlivePlayer();
        wrapper = await mountGameTeamSidePlayerComponent({ props: { ...defaultProps, player } });
        const playerRoleImage = wrapper.findComponent<typeof RoleImage>("#player-villager-role-image");

        expect(playerRoleImage.props("roleName")).toBe("seer");
      });

      it("should display player role image on the right when side is werewolves.", async() => {
        const player = createFakeAccursedWolfFatherAlivePlayer();
        wrapper = await mountGameTeamSidePlayerComponent({ props: { ...defaultProps, player } });
        const playerRoleImage = wrapper.findComponent<typeof RoleImage>("#player-werewolf-role-image");

        expect(playerRoleImage.props("roleName")).toBe("accursed-wolf-father");
      });

      it("should have a green border glow class when side is villagers.", async() => {
        const player = createFakeSeerAlivePlayer();
        wrapper = await mountGameTeamSidePlayerComponent({ props: { ...defaultProps, player } });
        const playerRoleImage = wrapper.findComponent<typeof RoleImage>("#player-villager-role-image");

        expect(playerRoleImage.classes("glow:border-green-500")).toBeTruthy();
      });

      it("should have a red border glow class when side is werewolves.", async() => {
        const player = createFakeAccursedWolfFatherAlivePlayer();
        wrapper = await mountGameTeamSidePlayerComponent({ props: { ...defaultProps, player } });
        const playerRoleImage = wrapper.findComponent<typeof RoleImage>("#player-werewolf-role-image");

        expect(playerRoleImage.classes("glow:border-red-500")).toBeTruthy();
      });

      it("should not have border glow class when player is dead.", async() => {
        const player = createFakeSeerAlivePlayer({ isAlive: false });
        wrapper = await mountGameTeamSidePlayerComponent({ props: { ...defaultProps, player } });
        const playerRoleImage = wrapper.findComponent<typeof RoleImage>("#player-villager-role-image");

        expect(playerRoleImage.classes("glow:border-green-500")).toBeFalsy();
        expect(playerRoleImage.classes("glow:border-red-500")).toBeFalsy();
      });

      it("should have grayscale class when player is dead.", async() => {
        const player = createFakeSeerAlivePlayer({ isAlive: false });
        wrapper = await mountGameTeamSidePlayerComponent({ props: { ...defaultProps, player } });
        const playerRoleImage = wrapper.findComponent<typeof RoleImage>("#player-villager-role-image");

        expect(playerRoleImage.classes("grayscale")).toBeTruthy();
      });
    });

    describe("Player attributes", () => {
      it("should display player attributes when rendered.", () => {
        const playerAttributes = wrapper.findAllComponents<typeof GameTeamSidePlayerAttribute>(GameTeamSidePlayerAttribute);

        expect(playerAttributes[0].props("attribute")).toStrictEqual<PlayerAttribute>(defaultPlayer.attributes[0]);
        expect(playerAttributes[1].props("attribute")).toStrictEqual<PlayerAttribute>(defaultPlayer.attributes[1]);
      });
    });
  });
});