import Vue from "vue";
import App from "./App.vue";

import HeyUI from "heyui";
Vue.use(HeyUI);

import "./../node_modules/heyui/themes/index.css";

Vue.config.productionTip = false;

new Vue({
  render: h => h(App)
}).$mount("#app");
