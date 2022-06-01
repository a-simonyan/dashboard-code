import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

//Modules
import dashboard from "./modules/dashboard";

export default new Vuex.Store({
  modules: {
    dashboard,
  },
});
