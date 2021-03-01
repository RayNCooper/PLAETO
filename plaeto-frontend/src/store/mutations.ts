import Vue from "vue";
import { AppState, Chart, ChartMode, Trace, TraceProject } from "@/types/State";

export default {
  setIsStreaming(state: AppState, payload: boolean) {
    state.isStreaming = payload;
  },
  setChart(state: AppState, payload: Chart) {
    state.chart = payload;
  },
  setShouldStack(state: AppState, payload: boolean) {
    state.shouldStack = payload;
  },
  setShouldPersist(state: AppState, payload: boolean) {
    state.shouldPersist = payload;
  },
  setIsConnectedToSocket(state: AppState, payload: boolean) {
    state.isConnectedToSocket = payload;
  },
  addToChartSingle(state: AppState, payload: { trace: Trace }) {
    state.chart.traces.push(payload.trace);
    /* if (state.chart.traces[0] && !payload.newCurve) {
      state.chart.traces[0].x.push(...payload.trace.x);
      state.chart.traces[0].y.push(...payload.trace.y);
    } else state.chart.traces.push(payload.trace);
    if (payload.trace.mode) Vue.set(state.chart.traces[0], "mode", "markers");
    if (payload.trace.type) Vue.set(state.chart.traces[0], "type", "scatter"); */
  },
  addToChartMultiple(state: AppState, payload: { traces: Trace[] }) {
    state.chart.traces.push(...payload.traces);
  },
  setTraceProjects(state: AppState, traceProjects: TraceProject[]) {
    Vue.set(state, "traceProjects", traceProjects);
  },
  setSelectedTraceProject(state: AppState, traceProject: TraceProject) {
    Vue.set(state, "selectedTraceProject", traceProject);
  },
  clearChart(state: AppState) {
    const newTraces: Trace[] = [];
    Vue.set(state.chart, "traces", newTraces);
  },
  inPlaybackMode(state: AppState, inPlaybackMode: boolean) {
    state.inPlaybackMode = inPlaybackMode;
  },
  persistedCurveId(state: AppState, id: string) {
    state.persistedCurveId = id;
  },
  chartTitle(state: AppState, title: string) {
    state.chart.layout.title = title;
  },
  chartMode(state: AppState, chartMode: ChartMode) {
    state.chartMode = chartMode;
  },
  displayPoints(state: AppState, displayPoints: boolean) {
    state.displayPoints = displayPoints;
  },
  displayCurves(state: AppState, displayCurves: boolean) {
    state.displayCurves = displayCurves;
  }
};
