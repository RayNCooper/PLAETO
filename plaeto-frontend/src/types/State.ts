enum ChartMode {
  TwoDimensional = "TWODIMENSIONAL",
  ThreeDimensional = "THREEDIMENSIONAL"
}

class AppState {
  isStreaming: boolean;
  shouldStack: boolean;
  shouldPersist: boolean;
  isConnectedToSocket: boolean;
  chart: Chart;
  selectedTraceProject: TraceProject;
  traceProjects: TraceProject[];
  inPlaybackMode: boolean;
  persistedCurveId: string;
  displayPoints: boolean;
  displayCurves: boolean;
  chartMode: ChartMode;

  constructor() {
    this.chartMode = ChartMode.TwoDimensional;
    this.displayCurves = false;
    this.displayPoints = true;
    this.persistedCurveId = "";
    this.inPlaybackMode = false;
    this.isConnectedToSocket = false;
    this.isStreaming = false;
    this.shouldStack = true;
    this.shouldPersist = false;
    this.traceProjects = [];
    this.selectedTraceProject = {
      title: "",
      traces: [],
      metadata: { country: "", city: "", weather: "", lux: 0, environment: "" }
    };
    this.chart = {
      uuid: "chart1",
      traces: [],
      layout: {
        title: "",
        height: 530,
        xaxis: { title: { text: "Solar Cell Voltage (V)" } },
        yaxis: { title: { text: "Solar Cell Current (μA)" } }
      }
    };
  }
}

interface Chart {
  uuid: string;
  traces: Trace[];
  layout: Layout;
}

interface TraceProject {
  _id?: string;
  traces: Trace[];
  metadata: MetaData;
  title: string;
}

interface Trace {
  x: number[];
  y: number[];
  mode?: string;
  type?: string;
}

interface MetaData {
  country: string;
  city: string;
  weather: string;
  lux: number;
  environment: string;
}

interface Layout {
  title: string;
  xaxis?: {
    title: {
      text: string;
    };
  };
  yaxis?: {
    title: {
      text: string;
    };
  };
  zaxis?: {
    title: {
      text: string;
    };
  };
  height?: number;
}

export { AppState, Chart, Trace, Layout, TraceProject, MetaData, ChartMode };
