<template>
  <div>
    <stream-panel></stream-panel>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import StreamPanel from "@/components/stream-panel/StreamPanel.vue";

@Component({
  components: {
    StreamPanel
  }
})
export default class Home extends Vue {}
</script>
