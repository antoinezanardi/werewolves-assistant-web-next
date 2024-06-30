<template>
  <Chart
    :data="chartData"
    :options="chartOptions"
    :plugins="[ChartDataLabels]"
    type="doughnut"
  />
</template>

<script setup lang="ts">
import ChartDataLabels from "chartjs-plugin-datalabels";
import stringToColor from "string-to-color";
import Chart from "primevue/chart";
import type { ChartData, ChartOptions } from "chart.js";
import { storeToRefs } from "pinia";
import { GAME_LOBBY_POSITION_COORDINATOR_GRAPH_CHART_DATALABELS_OPTIONS, GAME_LOBBY_POSITION_COORDINATOR_GRAPH_CHART_HEADING_OPTIONS } from "~/components/pages/game-lobby/GameLobbyPositionCoordinator/GameLobbyPositionCoordinatorGraph/game-lobby-position-coordinator-graph.constants";
import { useCreateGameDtoStore } from "~/stores/game/create-game-dto/useCreateGameDtoStore";

const createGameDtoStore = useCreateGameDtoStore();
const { createGameDto } = storeToRefs(createGameDtoStore);

const { t } = useI18n();

const chartOptions: ChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  borderColor: "#363636",
  plugins: {
    title: {
      ...GAME_LOBBY_POSITION_COORDINATOR_GRAPH_CHART_HEADING_OPTIONS,
      text: t("components.GameLobbyPositionCoordinatorGraph.checkPositionWithGraphBelow"),
    },
    subtitle: {
      ...GAME_LOBBY_POSITION_COORDINATOR_GRAPH_CHART_HEADING_OPTIONS,
      text: t("components.GameLobbyPositionCoordinatorGraph.canHoverOnNodes"),
    },
    legend: { display: false },
    tooltip: { enabled: false },
    datalabels: GAME_LOBBY_POSITION_COORDINATOR_GRAPH_CHART_DATALABELS_OPTIONS,
  },
};

const chartData = computed<ChartData>(() => {
  const hundredPercent = 100;
  const { players } = createGameDto.value;
  const reversedPlayers = players.toReversed();

  return {
    labels: reversedPlayers.map(player => player.name),
    datasets: [
      {
        data: reversedPlayers.map(() => hundredPercent / reversedPlayers.length),
        backgroundColor: reversedPlayers.map(player => stringToColor(player.name)),
      },
    ],
  };
});
</script>