import { createTestingPinia } from "@pinia/testing";
import { createFakeCreateGamePlayerDto } from "@tests/unit/utils/factories/composables/api/game/dto/create-game/create-game-player/create-game-player.dto.factory";
import { createFakeCreateGameDto } from "@tests/unit/utils/factories/composables/api/game/dto/create-game/create-game.dto.factory";
import type { mount } from "@vue/test-utils";

import { mountSuspendedComponent } from "@tests/unit/utils/helpers/mount.helpers";
import type { ComponentMountingOptions } from "@vue/test-utils/dist/mount";
import type { ChartData, ChartOptions } from "chart.js";
import { GAME_LOBBY_POSITION_COORDINATOR_GRAPH_CHART_DATALABELS_OPTIONS, GAME_LOBBY_POSITION_COORDINATOR_GRAPH_CHART_HEADING_OPTIONS } from "~/components/pages/game-lobby/GameLobbyPositionCoordinator/GameLobbyPositionCoordinatorChart/game-lobby-position-coordinator-chart.constants";
import GameLobbyPositionCoordinatorChart from "~/components/pages/game-lobby/GameLobbyPositionCoordinator/GameLobbyPositionCoordinatorChart/GameLobbyPositionCoordinatorChart.vue";
import { StoreIds } from "~/stores/enums/store.enum";

describe("Game Lobby Position Coordinator Chart Component", () => {
  let wrapper: ReturnType<typeof mount<typeof GameLobbyPositionCoordinatorChart>>;
  const defaultCreateGameDto = createFakeCreateGameDto({
    players: [
      createFakeCreateGamePlayerDto({ name: "Player 1" }),
      createFakeCreateGamePlayerDto({ name: "Player 2" }),
      createFakeCreateGamePlayerDto({ name: "Player 3" }),
      createFakeCreateGamePlayerDto({ name: "Player 4" }),
    ],
  });
  const testingPinia = { initialState: { [StoreIds.CREATE_GAME_DTO]: { createGameDto: defaultCreateGameDto } } };

  async function mountGameLobbyPositionCoordinatorChartComponent(options: ComponentMountingOptions<typeof GameLobbyPositionCoordinatorChart> = {}):
  Promise<ReturnType<typeof mount<typeof GameLobbyPositionCoordinatorChart>>> {
    return mountSuspendedComponent(GameLobbyPositionCoordinatorChart, {
      global: {
        plugins: [createTestingPinia(testingPinia)],
      },
      ...options,
    });
  }

  beforeEach(async() => {
    wrapper = await mountGameLobbyPositionCoordinatorChartComponent();
  });

  it("should match snapshot when rendered.", () => {
    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });

  describe("Chart", () => {
    it("should set chart data when rendered.", () => {
      const expectedChartData: ChartData = {
        labels: [
          "Player 4",
          "Player 3",
          "Player 2",
          "Player 1",
        ],
        datasets: [
          {
            data: [25, 25, 25, 25],
            backgroundColor: [
              "#72ec0f",
              "#40296e",
              "#d66cdd",
              "#daa42b",
            ],
          },
        ],
      };
      const actualChartData = (wrapper.vm as unknown as { chartData: ChartData }).chartData;

      expect(actualChartData).toStrictEqual<ChartData>(expectedChartData);
    });

    it("should set chart options when rendered.", () => {
      const expectedChartOptions: ChartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        borderColor: "#363636",
        plugins: {
          title: {
            ...GAME_LOBBY_POSITION_COORDINATOR_GRAPH_CHART_HEADING_OPTIONS,
            text: "components.GameLobbyPositionCoordinatorChart.checkPositionWithChartBelow",
          },
          subtitle: {
            ...GAME_LOBBY_POSITION_COORDINATOR_GRAPH_CHART_HEADING_OPTIONS,
            text: "components.GameLobbyPositionCoordinatorChart.canHoverOnNodes",
          },
          legend: { display: false },
          tooltip: { enabled: false },
          datalabels: GAME_LOBBY_POSITION_COORDINATOR_GRAPH_CHART_DATALABELS_OPTIONS,
        },
      };
      const actualChartOptions = (wrapper.vm as unknown as { chartOptions: ChartOptions }).chartOptions;

      expect(actualChartOptions).toStrictEqual<ChartOptions>(expectedChartOptions);
    });
  });
});