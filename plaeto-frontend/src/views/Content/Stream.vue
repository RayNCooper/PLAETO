<template>
  <three-column-content-view>
    <template v-slot:leftColumn> </template>
    <template v-slot:centerColumn>
      <stream-panel></stream-panel>
    </template>
    <template v-slot:rightColumn> </template>
  </three-column-content-view>
</template>

<script lang="ts">
import ThreeColumnContentView from "@/views/Layout/ThreeColumnContentView.vue";
import { Component, Vue } from "vue-property-decorator";
import StreamPanel from "@/components/Stream/StreamPanel/StreamPanel.vue";

@Component({
  components: {
    StreamPanel,
    ThreeColumnContentView
  }
})
export default class Home extends Vue {}
</script>
