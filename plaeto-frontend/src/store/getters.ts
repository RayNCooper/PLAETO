import { AppState, Chart, Trace, TraceProject } from "@/types/State";

export default {
  isStreaming(state: AppState): boolean {
    return state.isStreaming;
  },
  shouldStack(state: AppState): boolean {
    return state.shouldStack;
  },
  shouldPersist(state: AppState): boolean {
    return state.shouldPersist;
  },
  isConnectedToSocket(state: AppState): boolean {
    return state.isConnectedToSocket;
  },
  chart(state: AppState): Chart {
    return state.chart;
  },
  selectedTraceProject(state: AppState): TraceProject {
    return state.selectedTraceProject;
  },
  traceProjects(state: AppState): TraceProject[] {
    return state.traceProjects;
  },
  inPlaybackMode(state: AppState): boolean {
    return state.inPlaybackMode;
  },
  persistedCurveId(state: AppState): string {
    return state.persistedCurveId;
  },
  fittedCurveExpr(state: AppState): string {
    return state.fittedCurveExpr;
  }
};
