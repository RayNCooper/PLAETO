class AppState {
  isStreaming: boolean;
  shouldStack: boolean;
  isConnectedToSocket: boolean;
  chart: Chart;

  constructor() {
    this.isConnectedToSocket = false;
    this.isStreaming = false;
    this.shouldStack = false;
    // FIXME: Remove boilerplate, incorporate into created() method of component
    this.chart = {
      uuid: "chart1",
      traces: [],
      layout: {
        title: "Title",
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

interface Trace {
  x: number[];
  y: number[];
  mode: string;
  line: { shape: string; smoothing: number };
  type: string;
}

interface Layout {
  title: string;
  xaxis: {
    title: {
      text: string;
    };
  };
  yaxis: {
    title: {
      text: string;
    };
  };
}

export { AppState, Chart, Trace, Layout };
