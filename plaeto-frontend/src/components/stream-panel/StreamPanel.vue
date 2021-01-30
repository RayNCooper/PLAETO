<template>
  <reactive-chart-holder></reactive-chart-holder>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import ReactiveChartHolder from "@/components/stream-panel/chart/ReactiveChartHolder.vue";

@Component({
  components: { ReactiveChartHolder }
})
export default class StreamPanel extends Vue {}
</script>

<style scoped></style>
