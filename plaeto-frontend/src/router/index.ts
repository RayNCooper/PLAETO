import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Home from "../views/Content/Home.vue";
import Stream from "@/views/Content/Stream.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/stream",
    name: "Stream",
    component: Stream
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
