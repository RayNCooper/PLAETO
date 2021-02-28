<template>
  <three-column-content-view>
    <template v-slot:leftColumn> </template>
    <template v-slot:centerColumnTop>
      <home-panel></home-panel>
    </template>
    <template v-slot:rightColumn> </template>
  </three-column-content-view>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import ThreeColumnContentView from "@/views/Layout/ThreeColumnContentView.vue";
import HomePanel from "@/components/Home/HomePanel/HomePanel.vue";

@Component({
  components: {
    ThreeColumnContentView,
    HomePanel
  }
})
export default class Home extends Vue {}
</script>

<style></style>
