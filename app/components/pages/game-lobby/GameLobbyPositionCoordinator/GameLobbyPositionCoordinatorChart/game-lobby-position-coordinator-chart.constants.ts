import type { TitleOptions } from "chart.js";
import type { Context } from "chartjs-plugin-datalabels";

const fontOptions = {
  family: "Quicksand",
};

const GAME_LOBBY_POSITION_COORDINATOR_GRAPH_CHART_HEADING_OPTIONS = {
  display: true,
  color: "#D2D2D2",
  padding: 5,
  font: fontOptions,
} as const satisfies Partial<TitleOptions>;

const GAME_LOBBY_POSITION_COORDINATOR_GRAPH_CHART_DATALABELS_OPTIONS = {
  color: "#FFF",
  backgroundColor: "#3B3B3B",
  borderColor: "#CECECE",
  borderWidth: 1,
  formatter: (val: unknown, ctx: Context) => ctx.chart.data.labels?.[ctx.dataIndex],
  borderRadius: 10,
  align: (ctx: Context) => (ctx.active ? "center" : "end"),
  font: fontOptions,
  clamp: true,
  offset: 40,
} as const;

export {
  GAME_LOBBY_POSITION_COORDINATOR_GRAPH_CHART_HEADING_OPTIONS,
  GAME_LOBBY_POSITION_COORDINATOR_GRAPH_CHART_DATALABELS_OPTIONS,
};