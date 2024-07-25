import { createFakeSeerAlivePlayer } from "@tests/unit/utils/factories/composables/api/game/player/player-with-role.factory";
import type { mount } from "@vue/test-utils";

import { mountSuspendedComponent } from "@tests/unit/utils/helpers/mount.helpers";
import type { ComponentMountingOptions } from "@vue/test-utils/dist/mount";
import type { GameEventFlippingPlayersCardProps } from "~/components/shared/game/game-event/GameEventFlippingPlayersCard/game-event-flipping-players-card.types";
import type GameEventFlippingPlayerCard from "~/components/shared/game/game-event/GameEventFlippingPlayersCard/GameEventFlippingPlayerCard/GameEventFlippingPlayerCard.vue";
import GameEventFlippingPlayersCard from "~/components/shared/game/game-event/GameEventFlippingPlayersCard/GameEventFlippingPlayersCard.vue";
import type { Player } from "~/composables/api/game/types/players/player.class";

describe("Game Event Flipping Players Card Component", () => {
  const defaultPlayers = [createFakeSeerAlivePlayer({ name: "Antoine" })];
  const defaultProps: GameEventFlippingPlayersCardProps = {
    players: defaultPlayers,
  };
  let wrapper: ReturnType<typeof mount<typeof GameEventFlippingPlayersCard>>;

  async function mountGameEventFlippingPlayersCardComponent(options: ComponentMountingOptions<typeof GameEventFlippingPlayersCard> = {}):
  Promise<ReturnType<typeof mount<typeof GameEventFlippingPlayersCard>>> {
    return mountSuspendedComponent(GameEventFlippingPlayersCard, {
      props: defaultProps,
      ...options,
    });
  }

  beforeEach(async() => {
    wrapper = await mountGameEventFlippingPlayersCardComponent();
  });

  it("should match snapshot when rendered.", () => {
    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });

  describe("Game Event Flipping Card", () => {
    it("should pass players when players are defined.", () => {
      const gameEventPlayerCard = wrapper.findComponent<typeof GameEventFlippingPlayerCard>("#game-event-flipping-player-card");

      expect(gameEventPlayerCard.props("players")).toStrictEqual<Player[]>(defaultPlayers);
    });

    it("should pass empty array when players are undefined.", async() => {
      wrapper = await mountGameEventFlippingPlayersCardComponent({ props: { players: undefined } });
      const gameEventPlayerCard = wrapper.findComponent<typeof GameEventFlippingPlayerCard>("#game-event-flipping-player-card");

      expect(gameEventPlayerCard.props("players")).toStrictEqual<Player[]>([]);
    });
  });
});