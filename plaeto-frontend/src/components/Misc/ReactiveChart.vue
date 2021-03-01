<template>
  <div></div>
</template>

<script lang="ts">
import Plotly from "plotly.js";
import { Component, Prop, Watch, Vue } from "vue-property-decorator";

@Component
export default class ReactiveChart extends Vue {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  @Prop() chart!: any;

  mounted() {
    Plotly.newPlot(this.chart.uuid, this.chart.traces, this.chart.layout, {
      responsive: true,
      staticPlot: false
    });
  }

  @Watch("chart", { deep: true })
  updateChart() {
    Plotly.react(this.chart.uuid, this.chart.traces);
    /* Plotly.addTraces(this.chart.uuid, this.chart.traces); */
    Plotly.relayout(this.chart.uuid, this.chart.layout);
  }
}
</script>
