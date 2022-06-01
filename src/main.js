import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

//Axios Configs
import axios from "axios";
import VueAxios from "vue-axios";
const axiosInstance = axios.create({
  baseURL: process.env.VUE_APP_SPREADSHEET_BASE_URL,
});

Vue.use(VueAxios, axiosInstance);

// Toast Notifications
import VueToast from "vue-toast-notification";
import "vue-toast-notification/dist/theme-sugar.css";
Vue.use(VueToast);

Vue.config.productionTip = false;

export default axiosInstance;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
