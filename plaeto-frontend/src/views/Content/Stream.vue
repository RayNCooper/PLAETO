<template>
  <div>
    <three-column-content-view>
      <template v-slot:leftColumn><traces-panel></traces-panel></template>
      <template v-slot:centerColumn>
        <stream-panel></stream-panel>
      </template>
      <template v-slot:rightColumn> </template>
    </three-column-content-view>
    <socket-status-snackbar></socket-status-snackbar>
  </div>
</template>

<script lang="ts">
import ThreeColumnContentView from "@/views/Layout/ThreeColumnContentView.vue";
import { Component, Vue } from "vue-property-decorator";
import StreamPanel from "@/components/Stream/StreamPanel/StreamPanel.vue";
import TracesPanel from "@/components/Stream/TracesPanel/TracesPanel.vue";
import SocketStatusSnackbar from "@/components/Stream/SocketStatus/SocketStatusSnackbar.vue";

@Component({
  components: {
    StreamPanel,
    TracesPanel,
    ThreeColumnContentView,
    SocketStatusSnackbar
  }
})
export default class Home extends Vue {}
</script>
