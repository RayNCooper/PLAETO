<template>
  <div>
    <three-column-content-view>
      <template v-slot:leftColumn>
        <remote-traces-panel></remote-traces-panel>
      </template>

      <template v-slot:centerColumnTop>
        <stream-panel></stream-panel>
      </template>

      <template v-if="inPlaybackMode" v-slot:centerColumnBottom>
        <thresholds-panel></thresholds-panel>
      </template>

      <template v-slot:rightColumn>
        <metadata-panel></metadata-panel>
      </template>
    </three-column-content-view>
    <socket-status-snackbar></socket-status-snackbar>
  </div>
</template>

<script lang="ts">
import ThreeColumnContentView from "@/views/Layout/ThreeColumnContentView.vue";
import { Component, Vue } from "vue-property-decorator";
import StreamPanel from "@/components/Stream/StreamPanel/StreamPanel.vue";
import RemoteTracesPanel from "@/components/Stream/RemoteTracesPanel/RemoteTracesPanel.vue";
import MetadataPanel from "@/components/Stream/MetadataPanel/MetadataPanel.vue";
import ThresholdsPanel from "@/components/Stream/TresholdsPanel/ThresholdsPanel.vue";
import SocketStatusSnackbar from "@/components/Stream/SocketStatus/SocketStatusSnackbar.vue";
import { mapGetters } from "vuex";

@Component({
  components: {
    StreamPanel,
    RemoteTracesPanel,
    MetadataPanel,
    ThreeColumnContentView,
    SocketStatusSnackbar,
    ThresholdsPanel
  },
  computed: mapGetters(["inPlaybackMode"])
})
export default class Home extends Vue {}
</script>
