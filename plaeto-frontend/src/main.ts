import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import VueSocketIO from "vue-socket.io";
import vuetify from "./plugins/vuetify";
import axios from "axios";
import VueAxios from "vue-axios";

Vue.config.productionTip = false;

Vue.use(VueAxios, axios);

Vue.use(
  new VueSocketIO({
    debug: false,
    connection: "http://localhost:5000",
    vuex: {
      store,
      actionPrefix: "SOCKET_",
      mutationPrefix: "SOCKET_"
    }
  })
);

new Vue({
  router,
  store,
  vuetify,

  // eslint-disable-next-line
  render: (h) => h(App)
}).$mount("#app");
