<template>
  <reactive-chart :id="this.chart.uuid" :chart="chart"></reactive-chart>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import VueSocketIO from "vue-socket.io";
import { CurvePoint, CurveData } from "@/types/CurvePoints";
import ReactiveChart from "@/components/stream-panel/chart/ReactiveChart.vue";

@Component({
  components: { ReactiveChart },
  sockets: {
    connect() {
      console.log("JS-CLIENT: Connected to Server with ID " + this.$socket.id);
    },
    disconnect() {
      console.log(
        "JS-CLIENT: Disconnected from Server with ID " + this.$socket.id
      );
    }
  }
})
export default class ReactiveChartHolder extends Vue {
  @Prop() private msg!: string;

  x: number[] = [];
  y: number[] = [];
  curveNumber = 0;

  get chart() {
    return {
      uuid: "chart1",
      traces: [
        {
          x: this.x,
          y: this.y,
          mode: "lines+markers",
          line: { shape: "spline", smoothing: 1.3 },
          type: "scatter",
          fill: "tozeroy"
        }
      ],
      layout: this.plotLayout
    };
  }

  get title() {
    return "Curves Plotted: " + this.curveNumber;
  }

  get plotLayout() {
    return {
      title: this.title,
      xaxis: {
        /* range: [0, 2.7], */
        title: {
          text: "Solar Cell Voltage (V)"
        }
      },
      yaxis: {
        /* range: [0, 400], */
        title: {
          text: "Solar Cell Current (μA)"
        }
      }
    };
  }

  mounted() {
    this.sockets.subscribe("relay_curve", (data) => {
      console.log(
        "JS-CLIENT: Received Curve from Server with ID " + this.$socket.id
      );
      this.$set(this.$data, "x", []);
      this.$set(this.$data, "y", []);

      const parsedCurves: CurveData = JSON.parse(data);
      console.log(this.chart.traces);

      this.curveNumber++;
      this.setPlotData(parsedCurves.curvePoints);
    });
  }

  setPlotData(curvePoints: CurvePoint[]) {
    curvePoints.forEach((curvePoint: CurvePoint) => {
      this.x.push(curvePoint.voltage);
      this.y.push(curvePoint.microAmperage);
    });
  }
}
</script>

<style scoped></style>
