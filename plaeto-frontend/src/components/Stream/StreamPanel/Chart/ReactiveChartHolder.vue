<template>
  <reactive-chart :id="chart.uuid" :chart="chart"></reactive-chart>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import VueSocketIO from "vue-socket.io";
import { CurvePoint, CurveData } from "@/types/CurvePoints";
import ReactiveChart from "@/components/Misc/ReactiveChart.vue";
import { mapGetters, mapMutations } from "vuex";
import { Trace, TraceProject } from "@/types/State";

@Component({
  components: { ReactiveChart },
  computed: {
    ...mapGetters({ shouldStack: "shouldStack" }),
    ...mapGetters(["isStreaming", "chart", "selectedTraceProject"])
  },
  methods: mapMutations([])
})
export default class ReactiveChartHolder extends Vue {
  @Watch("isStreaming")
  onIsStreamingChanged(val: boolean, oldVal: boolean) {
    if (val) {
      this.subscribeToStream();
    } else if (!val) {
      this.sockets.unsubscribe("relay_curve");
    }
  }

  @Watch("selectedTraceProject")
  onSelectedTraceProjectChanged(
    val: { traces: { trace_points: any[] }[] },
    oldVal: any
  ) {
    this.$store.commit("setIsStreaming", false);
    this.$store.commit("clearChart");

    const traces: Trace[] = [];
    traces.push({ x: [], y: [] });

    val.traces.forEach((t: { trace_points: any[] }) => {
      console.log(t);
      if (typeof t.trace_points !== "undefined") {
        t.trace_points.forEach((p) => {
          traces[0].x.push(p.voltage);
          traces[0].y.push(p.micro_amperage);
        });
      }
    });
    this.$store.commit("addToChart", traces[0]);
    console.log(val);
  }

  shouldStack!: boolean;

  x: number[] = [];
  y: number[] = [];
  curveNumber = 0;

  /* get chart() {
    return {
      uuid: "chart1",
      traces: [
        {
          x: this.x,
          y: this.y,
          mode: "lines+markers",
          line: { shape: "spline", smoothing: 1.3 },
          type: "scatter"
        }
      ],
      layout: this.plotLayout
    };
  } */

  get title() {
    return "Curves Received: " + this.curveNumber;
  }

  get plotLayout() {
    return {
      title: this.title,
      xaxis: {
        title: {
          text: "Solar Cell Voltage (V)"
        }
      },
      yaxis: {
        title: {
          text: "Solar Cell Current (μA)"
        }
      }
    };
  }

  subscribeToStream() {
    this.sockets.subscribe("relay_curve", (data) => {
      console.log(
        "JS-CLIENT: Received Curve from Server with ID " + this.$socket.id
      );

      if (!this.shouldStack) {
        this.$store.commit("clearChart");
      }

      const parsedCurves: CurveData = JSON.parse(data);
      console.log(parsedCurves);

      const trace: Trace = {
        x: [],
        y: [],
        mode: "markers",
        type: "scatter"
      };

      parsedCurves.curvePoints.forEach((curvePoint: CurvePoint) => {
        trace.x.push(curvePoint.voltage);
        trace.y.push(curvePoint.microAmperage);
      });

      this.curveNumber++;
      this.$store.commit("addToChart", trace);
      /* this.setPlotData(parsedCurves.curvePoints); */
    });
  }

  /* setPlotData(curvePoints: CurvePoint[]) {
    curvePoints.forEach((curvePoint: CurvePoint) => {
      this.x.push(curvePoint.voltage);
      this.y.push(curvePoint.microAmperage);
    });
  } */
}
</script>

<style scoped></style>
