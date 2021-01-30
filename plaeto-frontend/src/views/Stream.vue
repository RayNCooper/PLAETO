<template>
  <v-sheet min-height="70vh" rounded="lg">
    <!--  -->
    <stream-panel></stream-panel>
  </v-sheet>
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
