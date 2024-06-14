import type { mount } from "@vue/test-utils";

import GameLobbyPlayerCard from "~/components/pages/game-lobby/GameLobbyPlayersParty/GameLobbyPlayerCard/GameLobbyPlayerCard.vue";
import GameLobbyPlayersParty from "~/components/pages/game-lobby/GameLobbyPlayersParty/GameLobbyPlayersParty.vue";
import type { CreateGamePlayerDto } from "~/composables/api/game/dto/create-game/create-game-player/create-game-player.dto";
import { useCreateGameDtoStore } from "~/stores/game/create-game-dto/useCreateGameDtoStore";
import { createFakeCreateGamePlayerDto } from "@tests/unit/utils/factories/composables/api/game/dto/create-game/create-game-player/create-game-player.dto.factory";
import { mountSuspendedComponent } from "@tests/unit/utils/helpers/mount.helpers";
import type { VueVm } from "@tests/unit/utils/types/vue-test-utils.types";

describe("Game Lobby Players Party Component", () => {
  let wrapper: ReturnType<typeof mount<typeof GameLobbyPlayersParty>>;

  beforeEach(async() => {
    wrapper = await mountSuspendedComponent(GameLobbyPlayersParty);
  });

  it("should match snapshot when rendered.", () => {
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

  describe("Emits", () => {
    it("should emit pickRoleForPlayer event when game lobby player card emits pick role for player event.", async() => {
      const createGameDtoStore = useCreateGameDtoStore();
      createGameDtoStore.createGameDto.players = [
        createFakeCreateGamePlayerDto({ name: "Player 1" }),
        createFakeCreateGamePlayerDto({ name: "Player 2" }),
        createFakeCreateGamePlayerDto({ name: "Player 3" }),
        createFakeCreateGamePlayerDto({ name: "Player 4" }),
      ];
      await nextTick();
      const emittedPlayer = createGameDtoStore.createGameDto.players[0];
      const gameLobbyPlayerCards = wrapper.findAllComponents<typeof GameLobbyPlayerCard>(".game-lobby-player-card");
      const playerCard = gameLobbyPlayerCards[0];
      (playerCard.vm as VueVm).$emit("pick-role-for-player", emittedPlayer);
      const emittedEvents = wrapper.emitted("pickRoleForPlayer");

      expect(emittedEvents).toHaveLength(1);
      expect(emittedEvents?.[0]).toStrictEqual<CreateGamePlayerDto[]>([emittedPlayer]);
    });

    it("should not emit pickRoleForPlayer event when game lobby player card emits pick role for player event with undefined player.", async() => {
      const createGameDtoStore = useCreateGameDtoStore();
      createGameDtoStore.createGameDto.players = [
        createFakeCreateGamePlayerDto({ name: "Player 1" }),
        createFakeCreateGamePlayerDto({ name: "Player 2" }),
        createFakeCreateGamePlayerDto({ name: "Player 3" }),
        createFakeCreateGamePlayerDto({ name: "Player 4" }),
      ];
      await nextTick();
      const gameLobbyPlayerCards = wrapper.findAllComponents<typeof GameLobbyPlayerCard>(".game-lobby-player-card");
      const playerCard = gameLobbyPlayerCards[0];
      (playerCard.vm as VueVm).$emit("pick-role-for-player", undefined);
      const emittedEvents = wrapper.emitted("pickRoleForPlayer");

      expect(emittedEvents).toBeUndefined();
    });
  });
});