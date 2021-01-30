<template>
  <reactive-chart :id="this.chart.uuid" :chart="chart"></reactive-chart>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import VueSocketIO from "vue-socket.io";
import { CurvePoint, CurveData } from "@/types/CurvePoints";
import ReactiveChart from "./charts/ReactiveChart.vue";

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
export default class HelloWorld extends Vue {
  @Prop() private msg!: string;

  x: number[] = [];
  y: number[] = [];
  curveNumber = 0;

  get chart() {
    const chart = {
      uuid: "123",
      traces: [
        {
          x: this.getX,
          y: this.getY,
          mode: "lines+markers",
          line: { shape: "spline", smoothing: 1.3 },
          type: "scatter"
        }
      ],
      layout: this.getPlotLayout
    };
    return chart;
  }

  get getX() {
    return this.x;
  }

  get getY() {
    return this.y;
  }

  get getTitle() {
    const title = "Curves Plotted: " + this.curveNumber;
    return title;
  }

  get getPlotLayout() {
    return {
      title: this.getTitle,
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

  mounted() {
    this.sockets.subscribe("relay_curve", (data) => {
      console.log(
        "JS-CLIENT: Received Curve from Server with ID " + this.$socket.id
      );
      this.$set(this.$data, "x", []);
      this.$set(this.$data, "y", []);

      const parsedCurves: CurveData = JSON.parse(data);

      this.curveNumber++;
      /* this.$set(this.$data, "curveNumber", parsedCurves.curveNumber); */

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
