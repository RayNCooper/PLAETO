<template>
  <div>
    <three-column-content-view>
      <template v-slot:leftColumn> </template>
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
import { mapGetters } from "vuex";
import SocketStatusSnackbar from "@/components/Stream/SocketStatus/SocketStatusSnackbar.vue";

@Component({
  components: {
    StreamPanel,
    ThreeColumnContentView,
    SocketStatusSnackbar
  }
})
export default class Home extends Vue {}
</script>
