import type { mount } from "@vue/test-utils";

import GameLobbyPlayerCard from "~/components/pages/game-lobby/GameLobbyPlayersParty/GameLobbyPlayerCard/GameLobbyPlayerCard.vue";
import GameLobbyPlayersParty from "~/components/pages/game-lobby/GameLobbyPlayersParty/GameLobbyPlayersParty.vue";
import { useCreateGameDtoStore } from "~/stores/game/create-game-dto/useCreateGameDtoStore";
import { createFakeCreateGamePlayerDto } from "~/tests/unit/utils/factories/composables/api/game/dto/create-game/create-game-player/create-game-player.dto.factory";
import { mountSuspendedComponent } from "~/tests/unit/utils/helpers/mount.helpers";

describe("Game Lobby Players Party Component", () => {
  let wrapper: ReturnType<typeof mount<typeof GameLobbyPlayersParty>>;

  beforeEach(async() => {
    wrapper = await mountSuspendedComponent(GameLobbyPlayersParty);
  });

  it("should render component and match snapshot when mounted.", () => {
    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });

  describe("Player Cards", () => {
    it("should render add player with input message when there are no players in the create game dto.", () => {
      const addPlayerWithInputMessage = wrapper.find<HTMLHeadingElement>("#no-players-in-lobby-message");

      expect(addPlayerWithInputMessage.exists()).toBeTruthy();
    });

    it("should render no players in lobby when there are no players in the create game dto.", () => {
      const playerCards = wrapper.findAllComponents<typeof GameLobbyPlayerCard>(GameLobbyPlayerCard);

      expect(playerCards).toHaveLength(0);
    });

    it("should render 4 players cards when there are 4 players in the create game dto.", async() => {
      const createGameDtoStore = useCreateGameDtoStore();
      createGameDtoStore.createGameDto.players = [
        createFakeCreateGamePlayerDto({ name: "Player 1" }),
        createFakeCreateGamePlayerDto({ name: "Player 2" }),
        createFakeCreateGamePlayerDto({ name: "Player 3" }),
        createFakeCreateGamePlayerDto({ name: "Player 4" }),
      ];
      await nextTick();
      const playerCards = wrapper.findAllComponents<typeof GameLobbyPlayerCard>(GameLobbyPlayerCard);

      expect(playerCards).toHaveLength(4);
    });
  });
});