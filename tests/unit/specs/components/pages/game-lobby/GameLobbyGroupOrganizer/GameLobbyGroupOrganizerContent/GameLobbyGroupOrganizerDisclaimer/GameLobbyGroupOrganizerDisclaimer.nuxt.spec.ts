import type { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { createTestingPinia } from "@pinia/testing";
import { createFakeCreateGamePlayerDto } from "@tests/unit/utils/factories/composables/api/game/dto/create-game/create-game-player/create-game-player.dto.factory";
import { createFakeCreateGameDto } from "@tests/unit/utils/factories/composables/api/game/dto/create-game/create-game.dto.factory";
import type { mount } from "@vue/test-utils";

import { mountSuspendedComponent } from "@tests/unit/utils/helpers/mount.helpers";
import type { ComponentMountingOptions } from "@vue/test-utils/dist/mount";
import GameLobbyGroupOrganizerDisclaimer from "~/components/pages/game-lobby/GameLobbyGroupOrganizer/GameLobbyGroupOrganizerContent/GameLobbyGroupOrganizerDisclaimer/GameLobbyGroupOrganizerDisclaimer.vue";
import type { CreateGameDto } from "~/composables/api/game/dto/create-game/create-game.dto";
import { StoreIds } from "~/stores/enums/store.enum";
import { useCreateGameDtoStore } from "~/stores/game/create-game-dto/useCreateGameDtoStore";

describe("Game Lobby Group Organizer Disclaimer Component", () => {
  const defaultPlayers = [
    createFakeCreateGamePlayerDto({
      name: "Antoine",
      role: { name: "prejudiced-manipulator" },
    }),
    createFakeCreateGamePlayerDto({
      name: "Bobby",
      role: { name: "werewolf" },
    }),
    createFakeCreateGamePlayerDto({
      name: "Cindy",
      role: { name: "villager" },
    }),
    createFakeCreateGamePlayerDto({
      name: "Derek",
      role: { name: "villager" },
    }),
  ];
  const defaultCreateGameDto = createFakeCreateGameDto({ players: defaultPlayers });
  const defaultFirstGroupName = "Group 1";
  const defaultSecondGroupName = "Group 2";
  const testingPinia = {
    initialState: {
      [StoreIds.CREATE_GAME_DTO]: {
        createGameDto: defaultCreateGameDto,
        firstGroupName: defaultFirstGroupName,
        secondGroupName: defaultSecondGroupName,
      },
    },
    stubActions: false,
  };
  let wrapper: ReturnType<typeof mount<typeof GameLobbyGroupOrganizerDisclaimer>>;

  async function mountGameLobbyGroupOrganizerDisclaimerComponent(options: ComponentMountingOptions<typeof GameLobbyGroupOrganizerDisclaimer> = {}):
  Promise<ReturnType<typeof mount<typeof GameLobbyGroupOrganizerDisclaimer>>> {
    return mountSuspendedComponent(GameLobbyGroupOrganizerDisclaimer, {
      global: { plugins: [createTestingPinia(testingPinia)] },
      ...options,
    });
  }

  beforeEach(async() => {
    wrapper = await mountGameLobbyGroupOrganizerDisclaimerComponent();
  });

  it("should match snapshot when rendered.", () => {
    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });

  describe("Groups Disclaimer and Icon", () => {
    it.each<{
      test: string;
      createGameDto: CreateGameDto;
      expectedIcon: string;
      expectedIconClass: string;
      expectedDisclaimer: string;
    }>([
      {
        test: "should render the exclamation circle icon with text error and disclaimer not enough players when the create game dto doesn't have enough players.",
        createGameDto: createFakeCreateGameDto({
          players: [defaultPlayers[0]],
        }),
        expectedIcon: "exclamation-circle",
        expectedIconClass: "text-error",
        expectedDisclaimer: "components.GameLobbyGroupOrganizerDisclaimer.notEnoughPlayers",
      },
      {
        test: "should render the exclamation circle icon with text error and disclaimer not enough groups in first group when there is not enough players in first group.",
        createGameDto: createFakeCreateGameDto({
          players: [
            createFakeCreateGamePlayerDto({
              ...defaultPlayers[0],
              group: defaultFirstGroupName,
            }),
            createFakeCreateGamePlayerDto({
              ...defaultPlayers[1],
              group: defaultSecondGroupName,
            }),
            createFakeCreateGamePlayerDto({
              ...defaultPlayers[2],
              group: defaultSecondGroupName,
            }),
            createFakeCreateGamePlayerDto({
              ...defaultPlayers[3],
              group: defaultSecondGroupName,
            }),
          ],
        }),
        expectedIcon: "exclamation-circle",
        expectedIconClass: "text-error",
        expectedDisclaimer: `components.GameLobbyGroupOrganizerDisclaimer.fillFirstGroup, {"count":1}`,
      },
      {
        test: "should render the exclamation circle icon with text error and disclaimer not enough groups in second group when there is not enough players in second group.",
        createGameDto: createFakeCreateGameDto({
          players: [
            createFakeCreateGamePlayerDto({
              ...defaultPlayers[0],
              group: defaultFirstGroupName,
            }),
            createFakeCreateGamePlayerDto({
              ...defaultPlayers[1],
              group: defaultFirstGroupName,
            }),
            createFakeCreateGamePlayerDto({
              ...defaultPlayers[2],
              group: defaultFirstGroupName,
            }),
            createFakeCreateGamePlayerDto({
              ...defaultPlayers[3],
              group: defaultSecondGroupName,
            }),
          ],
        }),
        expectedIcon: "exclamation-circle",
        expectedIconClass: "text-error",
        expectedDisclaimer: `components.GameLobbyGroupOrganizerDisclaimer.fillSecondGroup, {"count":1}`,
      },
      {
        test: "should render the check circle icon with text success and valid groups disclaimer when groups are valid.",
        createGameDto: createFakeCreateGameDto({
          players: [
            createFakeCreateGamePlayerDto({
              ...defaultPlayers[0],
              group: defaultFirstGroupName,
            }),
            createFakeCreateGamePlayerDto({
              ...defaultPlayers[1],
              group: defaultFirstGroupName,
            }),
            createFakeCreateGamePlayerDto({
              ...defaultPlayers[2],
              group: defaultSecondGroupName,
            }),
            createFakeCreateGamePlayerDto({
              ...defaultPlayers[3],
              group: defaultSecondGroupName,
            }),
          ],
        }),
        expectedIcon: "check-circle",
        expectedIconClass: "text-success",
        expectedDisclaimer: "components.GameLobbyGroupOrganizerDisclaimer.allGroupsFilled",
      },
    ])("$test", async({ createGameDto, expectedIcon, expectedIconClass, expectedDisclaimer }) => {
      const createGameDtoStore = useCreateGameDtoStore();
      createGameDtoStore.createGameDto = createFakeCreateGameDto(createGameDto);
      await nextTick();
      const icon = wrapper.findComponent<typeof FontAwesomeIcon>("#groups-disclaimer-icon");
      const disclaimer = wrapper.find<HTMLSpanElement>("#groups-disclaimer");

      expect(icon.classes()).toContain(expectedIconClass);
      expect(icon.props("icon")).toBe(expectedIcon);
      expect(disclaimer.text()).toBe(expectedDisclaimer);
    });
  });
});