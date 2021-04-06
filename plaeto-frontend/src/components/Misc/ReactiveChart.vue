<template>
  <div></div>
</template>

<script lang="ts">
import { Chart, ChartMode } from "@/types/State";
import { all, create } from "mathjs";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const Plotly = require("plotly.js-dist");
import { Component, Prop, Watch, Vue } from "vue-property-decorator";
import { mapGetters } from "vuex";
import regression from "regression";

@Component({
  computed: {
    ...mapGetters(["chartMode"])
  }
})
export default class ReactiveChart extends Vue {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  @Prop() chart!: any;

  @Watch("chartMode")
  onChartModeChanged(val: ChartMode) {
    if (val == ChartMode.TwoDimensional) {
      const c: Chart = {
        uuid: "chart1",
        layout: {
          height: 530,
          title: this.$store.getters.selectedTraceProject.title,
          xaxis: { title: { text: "Solar Cell Voltage (V)" } },
          yaxis: { title: { text: "Solar Cell Current (μA)" } }
        },
        traces: []
      };

      const traces: any[] = [];

      this.$store.getters.selectedTraceProject.traces.forEach((t: any) => {
        const x: any[] = [];
        const y: any[] = [];
        t.trace_points.forEach((p: any) => {
          x.push(p.voltage);
          y.push(p.micro_amperage);
        });
        traces.push({
          mode: "markers",
          type: "scatter",
          x: x,
          y: y
        });
      });

      c.traces = traces;
      this.$store.commit("setChart", c);

      Plotly.newPlot(this.chart.uuid, traces, c.layout, {
        responsive: true,
        staticPlot: false
      });
    } else if (val == ChartMode.ThreeDimensional) {
      const c: Chart = {
        uuid: "chart1",
        layout: {
          height: 530,
          title: this.$store.getters.selectedTraceProject.title
        },
        traces: []
      };

      const math: any = create(all, {});

      const traces: any[] = [];
      let maxV = 0;

      this.$store.getters.selectedTraceProject.traces.forEach(
        (t: any, i: number) => {
          const x: any[] = [];
          const y: any[] = [];
          const z: any[] = [];

          const d: any = [];

          t.trace_points.forEach((p: any) => {
            if (p.voltage > maxV) maxV = p.voltage;
            d.push([p.voltage, p.micro_amperage]);
          });

          const result = regression.polynomial(d, { order: 3 });
          const expr = math.compile(result.string);

          const yValues = math.range(0, maxV, maxV / 39).toArray();
          const zValues = yValues.map(function(x: any) {
            return expr.evaluate({ x: x });
          });

          t.trace_points.forEach((p: any) => {
            x.push([i, i + 1]);
          });

          zValues.forEach((val: any) => {
            z.push([val, val]);
          });

          yValues.forEach((val: any) => {
            y.push([val, val]);
          });

          traces.push({
            type: "surface",
            x: x,
            y: y,
            z: z,
            showscale: false
          });
        }
      );

      c.traces = traces;
      this.$store.commit("setChart", c);

      Plotly.newPlot(this.chart.uuid, traces, {
        title: this.$store.getters.selectedTraceProject.title,
        showlegend: false,
        autosize: true,
        height: 530,
        scene: {
          xaxis: { title: "Time (s)" },
          yaxis: { title: "Solar Cell Voltage (V)" },
          zaxis: { title: "Solar Cell Current (µA)" }
        }
      });
    }
  }

  mounted() {
    if (this.$store.getters.chartMode == ChartMode.TwoDimensional) {
      Plotly.newPlot(this.chart.uuid, this.chart.traces, this.chart.layout, {
        responsive: true,
        staticPlot: false
      });
    } else if (this.$store.getters.chartMode == ChartMode.ThreeDimensional) {
      /*  */
    }
  }

  @Watch("chart", { deep: true })
  updateChart() {
    if (this.$store.getters.chartMode == ChartMode.TwoDimensional) {
      Plotly.react(this.chart.uuid, this.chart.traces);
      Plotly.relayout(this.chart.uuid, this.chart.layout);
    } else if (this.$store.getters.chartMode == ChartMode.ThreeDimensional) {
      Plotly.react(this.chart.uuid, this.chart.traces);
      Plotly.relayout(this.chart.uuid, {
        title: this.$store.getters.selectedTraceProject.title,
        showlegend: false,
        autosize: true,
        height: 530,
        scene: {
          xaxis: { title: "Time (s)" },
          yaxis: { title: "Solar Cell Voltage (V)" },
          zaxis: { title: "Solar Cell Current (µA)" }
        }
      });
    }
  }
}
</script>
