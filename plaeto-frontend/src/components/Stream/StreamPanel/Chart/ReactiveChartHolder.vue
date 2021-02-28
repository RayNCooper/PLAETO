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
    ...mapGetters([
      "isStreaming",
      "shouldStack",
      "shouldPersist",
      "chart",
      "selectedTraceProject"
    ])
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
    traces.push({ x: [], y: [], mode: "markers", type: "scatter" });

    val.traces.forEach((t: { trace_points: any[] }) => {
      if (typeof t.trace_points !== "undefined") {
        t.trace_points.forEach((p) => {
          traces[0].x.push(p.voltage);
          traces[0].y.push(p.micro_amperage);
        });
      }
    });
    this.$store.commit({
      type: "addToChart",
      trace: traces[0],
      newCurve: false
    });
  }

  x: number[] = [];
  y: number[] = [];
  curveNumber = 0;

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
    this.sockets.subscribe("set_persisted_id", (data) =>
      this.$store.commit("persistedCurveId", data)
    );
    this.sockets.subscribe("relay_curve", (data) => {
      console.log(
        "JS-CLIENT: Received Curve from Server with ID " + this.$socket.id
      );

      const parsedCurves: CurveData = JSON.parse(data);

      if (!this.$store.getters.shouldStack) {
        this.$store.commit("clearChart");
      }

      if (this.$store.getters.shouldPersist) {
        const d: any = {
          // eslint-disable-next-line @typescript-eslint/camelcase
          trace_number: parsedCurves.curveNumber,
          // eslint-disable-next-line @typescript-eslint/camelcase
          trace_points: []
        };
        parsedCurves.curvePoints.forEach((curvePoint: CurvePoint) => {
          d.trace_points.push({
            // eslint-disable-next-line @typescript-eslint/camelcase
            sequence_number: curvePoint.sequenceNumber,
            voltage: curvePoint.voltage,
            // eslint-disable-next-line @typescript-eslint/camelcase
            micro_amperage: curvePoint.microAmperage
          });
        });

        if (this.$store.getters.persistedCurveId !== "") {
          this.$socket.emit(
            "persist_curve",
            JSON.stringify(d),
            this.$store.getters.persistedCurveId
          );
        } else {
          this.$socket.emit(
            "persist_curve",
            JSON.stringify(d),
            null,
            JSON.stringify(this.$store.getters.selectedTraceProject.metadata),
            this.$store.getters.selectedTraceProject.title
          );
        }
      }

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
      this.$store.commit({ type: "addToChart", trace: trace, newCurve: false });
    });
  }
}
</script>

<style scoped></style>
