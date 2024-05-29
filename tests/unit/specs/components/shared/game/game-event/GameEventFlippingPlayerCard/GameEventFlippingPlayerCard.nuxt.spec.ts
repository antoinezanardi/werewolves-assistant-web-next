import type { mount } from "@vue/test-utils";
import type { ComponentMountingOptions } from "@vue/test-utils/dist/mount";
import type { GameEventFlippingPlayerCardProps } from "~/components/shared/game/game-event/GameEventFlippingPlayerCard/game-event-flipping-player-card.types";
import GameEventFlippingPlayerCard from "~/components/shared/game/game-event/GameEventFlippingPlayerCard/GameEventFlippingPlayerCard.vue";
import type RoleFlippingImage from "~/components/shared/role/RoleImage/RoleFlippingImage/RoleFlippingImage.vue";
import { createFakeCupidAlivePlayer, createFakeSeerAlivePlayer, createFakeWerewolfAlivePlayer } from "~/tests/unit/utils/factories/composables/api/game/player/player-with-role.factory";

import { mountSuspendedComponent } from "~/tests/unit/utils/helpers/mount.helpers";

describe("Game Event Flipping Player Card Component", () => {
  let wrapper: ReturnType<typeof mount<typeof GameEventFlippingPlayerCard>>;
  const defaultPlayers = [
    createFakeSeerAlivePlayer({ name: "Antoine" }),
    createFakeCupidAlivePlayer({ name: "Benoit" }),
    createFakeWerewolfAlivePlayer({ name: "Cyril" }),
  ];
  const defaultProps: GameEventFlippingPlayerCardProps = { players: defaultPlayers };

  async function mountGameEventFlippingPlayerCardComponent(options: ComponentMountingOptions<typeof GameEventFlippingPlayerCard> = {}):
  Promise<ReturnType<typeof mount<typeof GameEventFlippingPlayerCard>>> {
    return mountSuspendedComponent(GameEventFlippingPlayerCard, {
      props: defaultProps,
      ...options,
    });
  }

  beforeEach(async() => {
    wrapper = await mountGameEventFlippingPlayerCardComponent();
  });

  it("should match snapshot when rendered.", () => {
    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });

  describe("Game Event Player Flipping Role", () => {
    it("should set interval of 1500ms for flipping player card when rendered.", async() => {
      const setIntervalSpy = vi.spyOn(window, "setInterval");
      wrapper = await mountGameEventFlippingPlayerCardComponent();

      expect(setIntervalSpy).toHaveBeenCalledExactlyOnceWith(expect.any(Function), 1500);
    });

    it("should render the first player role to display when rendered.", () => {
      const roleFlippingImage = wrapper.findComponent<typeof RoleFlippingImage>("#game-event-flipping-player-role");

      expect(roleFlippingImage.props("roleName")).toBe(defaultPlayers[0].role.current);
    });

    it("should not set interval when there are no players to display.", async() => {
      const mockedInterval = vi.spyOn(window, "setInterval");
      wrapper = await mountGameEventFlippingPlayerCardComponent({ props: { players: [] } });

      expect(mockedInterval).not.toHaveBeenCalled();
    });

    it("should render undefined role when there are no players to display.", async() => {
      wrapper = await mountGameEventFlippingPlayerCardComponent({ props: { players: [] } });
      const roleFlippingImage = wrapper.findComponent<typeof RoleFlippingImage>("#game-event-flipping-player-role");

      expect(roleFlippingImage.props("roleName")).toBeUndefined();
    });

    it("should render the next player role when interval is over.", async() => {
      const roleFlippingImage = wrapper.findComponent<typeof RoleFlippingImage>("#game-event-flipping-player-role");
      const nextPlayer = defaultPlayers[1];
      (wrapper.vm as unknown as { flipPlayerCard: () => void }).flipPlayerCard();
      await nextTick();

      expect(roleFlippingImage.props("roleName")).toBe(nextPlayer.role.current);
    });

    it("should reset to the first player when interval is over for the max number of players.", async() => {
      const roleFlippingImage = wrapper.findComponent<typeof RoleFlippingImage>("#game-event-flipping-player-role");
      const expectedPlayer = defaultPlayers[0];
      (wrapper.vm as unknown as { flipPlayerCard: () => void }).flipPlayerCard();
      (wrapper.vm as unknown as { flipPlayerCard: () => void }).flipPlayerCard();
      (wrapper.vm as unknown as { flipPlayerCard: () => void }).flipPlayerCard();
      await nextTick();

      expect(roleFlippingImage.props("roleName")).toBe(expectedPlayer.role.current);
    });
  });

  describe("Game Event Player Name", () => {
    it("should render the first player name when rendered.", () => {
      const playerName = wrapper.find<HTMLHeadingElement>("#player-name");

      expect(playerName.text()).toBe(defaultPlayers[0].name);
    });

    it("should not render player name when there are no players to display.", async() => {
      wrapper = await mountGameEventFlippingPlayerCardComponent({ props: { players: [] } });
      const playerName = wrapper.find<HTMLHeadingElement>("#player-name");

      expect(playerName.exists()).toBeFalsy();
    });
  });
});